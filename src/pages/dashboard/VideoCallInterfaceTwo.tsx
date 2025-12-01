import React, { useEffect, useRef, useState } from "react";
import {
  Pencil,
  Slash,
  Scissors,
  Square,
  Circle,
  Star as StarIcon,
  Trash2,
  Image as ImageIcon,
  RotateCw,
  CornerDownLeft,
  Move,
} from "lucide-react";
import { Maximize2, Mic, Video, MonitorPlay } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Lightweight types
type Tool =
  | "pencil"
  | "line"
  | "rect"
  | "circle"
  | "star"
  | "eraser"
  | "select"
  | "image"
  | "clear";

type Point = { x: number; y: number };

type BaseElement = {
  id: string;
  type: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string | null;
  points?: Point[]; // for pencil or line
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rotation?: number;
  isEraser?: boolean;
  src?: string; // for image
};

const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const UNDO_LIMIT = 50;

export default function VideoCallInterfacetwo() {
  // refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const navigate = useNavigate()

  // UI state
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState<string>("#e63946");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);


  if(!setColor || !setStrokeWidth){}
  // elements state and selection
  const [elements, setElements] = useState<BaseElement[]>([]);
  const undoStack = useRef<BaseElement[][]>([]);
  const redoStack = useRef<BaseElement[][]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
const [stream, setStream] = useState<MediaStream | null>(null);

const [isCameraOn, setIsCameraOn] = useState(false);
const [permissionDenied, setPermissionDenied] = useState(false);


const startCamera = async () => {
  try {
    setPermissionDenied(false);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    // Attach stream to state
    setStream(mediaStream);

    // Attach stream to video element
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }

    setIsCameraOn(true);
  } catch (err) {
    console.error("Camera permission error:", err);
    setPermissionDenied(true);
    setIsCameraOn(false);
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  setStream(null);
  setIsCameraOn(false);
};

const toggleCamera = () => {
  if (isCameraOn) stopCamera();
  else startCamera();
};

useEffect(() => {
  return () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
  };
}, [stream]);



  // interaction refs
  const isPointerDown = useRef(false);
  const currentEl = useRef<BaseElement | null>(null);
  const selectionOffset = useRef<Point | null>(null);
  const resizing = useRef<null | { corner: string; elId: string }>(null);

  // selection as state so UI redraws when it changes
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // image cache so we don't create Image repeatedly
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // init canvas & resize handling
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      // set style size from wrapper
      const wrap = wrapperRef.current;
      const styleW = wrap ? wrap.clientWidth : 900;
      const styleH = wrap ? wrap.clientHeight : 450;
      canvas.style.width = `${styleW}px`;
      canvas.style.height = `${styleH}px`;
      canvas.width = Math.floor(styleW * dpr);
      canvas.height = Math.floor(styleH * dpr);
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctxRef.current = ctx;
      redraw(ctx, elements);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redraw on elements change
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    redraw(ctx, elements);
  }, [elements]);

  // helpers
  // const pushToUndo = (next: BaseElement[]) => {
  //   undoStack.current.push(elements.map((e) => ({ ...e })));
  //   if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
  //   redoStack.current = [];
  //   setElements(next);
  // };

  const handleUndo = () => {
    if (!undoStack.current.length) return;
    const prev = undoStack.current.pop()!;
    redoStack.current.push(elements.map((e) => ({ ...e })));
    setElements(prev.map((e) => ({ ...e })));
    setSelectedId(null);
  };

  const handleRedo = () => {
    if (!redoStack.current.length) return;
    const next = redoStack.current.pop()!;
    undoStack.current.push(elements.map((e) => ({ ...e })));
    setElements(next.map((e) => ({ ...e })));
    setSelectedId(null);
  };

  const getPoint = (evt: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "clientX" in evt ? evt.clientX : (evt as any).x;
    const clientY = "clientY" in evt ? evt.clientY : (evt as any).y;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const isPointInEl = (p: Point, el: BaseElement) => {
    if (el.x == null || el.y == null || el.w == null || el.h == null) return false;
    const minX = Math.min(el.x, el.x + el.w);
    const minY = Math.min(el.y, el.y + el.h);
    const maxX = Math.max(el.x, el.x + el.w);
    const maxY = Math.max(el.y, el.y + el.h);
    return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
  };

  // pointer handlers
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const down = (ev: PointerEvent) => {
      const p = getPoint(ev);
      isPointerDown.current = true;

      if (tool === "select") {
        // topmost selection
        const topmost = [...elements].slice().reverse().find((el) => isPointInEl(p, el));
        if (topmost) {
          setSelectedId(topmost.id);
          const el = elements.find((x) => x.id === topmost.id)!;
          selectionOffset.current = { x: p.x - (el.x ?? 0), y: p.y - (el.y ?? 0) };
          redraw(ctxRef.current!, elements);
          return;
        }
        setSelectedId(null);
        redraw(ctxRef.current!, elements);
        return;
      }

      // start new element
      const id = uid();
      if (tool === "pencil" || tool === "eraser") {
        const newEl: BaseElement = {
          id,
          type: tool === "pencil" ? "pencil" : "eraser",
          stroke: tool === "pencil" ? color : undefined,
          strokeWidth,
          points: [p],
          isEraser: tool === "eraser",
        };
        currentEl.current = newEl;
        undoStack.current.push(elements.map((e) => ({ ...e })));
        if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
        setElements((s) => [...s, newEl]);
        return;
      }

      if (tool === "line") {
        const newEl: BaseElement = { id, type: "line", stroke: color, strokeWidth, points: [p, p] };
        currentEl.current = newEl;
        undoStack.current.push(elements.map((e) => ({ ...e })));
        if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
        setElements((s) => [...s, newEl]);
        return;
      }

      if (tool === "rect" || tool === "circle" || tool === "star") {
        const newEl: BaseElement = {
          id,
          type: tool === "rect" ? "rect" : tool === "circle" ? "circle" : "star",
          stroke: color,
          strokeWidth,
          fill: null,
          x: p.x,
          y: p.y,
          w: 0,
          h: 0,
          rotation: 0,
        };
        currentEl.current = newEl;
        undoStack.current.push(elements.map((e) => ({ ...e })));
        if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
        setElements((s) => [...s, newEl]);
        return;
      }

      if (tool === "image") {
        // image clicking handled by input
        return;
      }

      if (tool === "clear") {
        undoStack.current.push(elements.map((e) => ({ ...e })));
        setElements([]);
        setSelectedId(null);
        return;
      }
    };

    const move = (ev: PointerEvent) => {
      if (!isPointerDown.current) return;
      const p = getPoint(ev);

      if (tool === "select" && selectedId) {
        const idx = elements.findIndex((e) => e.id === selectedId);
        if (idx === -1) return;
        const el = elements[idx];
        if (!resizing.current) {
          const offset = selectionOffset.current!;
          const nx = p.x - offset.x;
          const ny = p.y - offset.y;
          const next = elements.slice();
          next[idx] = { ...el, x: nx, y: ny };
          setElements(next);
        } else {
          const meta = resizing.current;
          if (!meta || meta.elId !== selectedId) return;
          const idx2 = elements.findIndex((e) => e.id === meta.elId);
          if (idx2 === -1) return;
          const el2 = elements[idx2];
          const nxW = Math.max(10, p.x - (el2.x ?? 0));
          const nxH = Math.max(10, p.y - (el2.y ?? 0));
          const next2 = elements.slice();
          next2[idx2] = { ...el2, w: nxW, h: nxH };
          setElements(next2);
        }
        return;
      }

      if (currentEl.current) {
        const el = currentEl.current;
        if (el.type === "pencil" || el.type === "eraser") {
          el.points = [...(el.points ?? []), p];
          setElements((s) => {
            const copy = s.slice();
            copy[copy.length - 1] = { ...el };
            return copy;
          });
          return;
        }
        if (el.type === "line") {
          el.points = [el.points![0], p];
          setElements((s) => {
            const copy = s.slice();
            copy[copy.length - 1] = { ...el };
            return copy;
          });
          return;
        }
        if (el.type === "rect" || el.type === "circle" || el.type === "star") {
          const ox = el.x!;
          const oy = el.y!;
          const w = p.x - ox;
          const h = p.y - oy;
          el.w = w;
          el.h = h;
          setElements((s) => {
            const copy = s.slice();
            copy[copy.length - 1] = { ...el };
            return copy;
          });
          return;
        }
      }
    };

    const up = () => {
      isPointerDown.current = false;
      currentEl.current = null;
      resizing.current = null;
    };

    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [tool, elements, selectedId]);

  // draw functions
  const redraw = (context: CanvasRenderingContext2D, els: BaseElement[]) => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    // clear using style size (not backing pixel size)
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.save();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();

    els.forEach((el) => {
      if (el.type === "pencil") drawPencil(context, el);
      else if (el.type === "eraser") drawEraser(context, el);
      else if (el.type === "line") drawLine(context, el);
      else if (el.type === "rect") drawRect(context, el);
      else if (el.type === "circle") drawCircle(context, el);
      else if (el.type === "star") drawStar(context, el);
      else if (el.type === "image" && el.src) drawImageEl(context, el);
    });

    if (selectedId) {
      const sel = els.find((e) => e.id === selectedId);
      if (sel && sel.x != null && sel.y != null && sel.w != null && sel.h != null) {
        context.save();
        context.lineWidth = 1;
        context.strokeStyle = "#4ea0d0";
        context.setLineDash([6, 4]);
        const minX = Math.min(sel.x, sel.x + sel.w);
        const minY = Math.min(sel.y, sel.y + sel.h);
        const w = Math.abs(sel.w);
        const h = Math.abs(sel.h);
        context.strokeRect(minX - 4, minY - 4, w + 8, h + 8);
        context.setLineDash([]);
        const rx = minX + w;
        const ry = minY + h;
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#4ea0d0";
        context.lineWidth = 2;
        context.beginPath();
        context.rect(rx - 8, ry - 8, 16, 16);
        context.fill();
        context.stroke();
        context.restore();
      }
    }
  };

  const drawPencil = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.points || el.points.length === 0) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 3;
    c.strokeStyle = el.stroke ?? "#000";
    c.beginPath();
    const pts = el.points!;
    c.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
    c.stroke();
    c.restore();
  };

  const drawEraser = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.points || el.points.length === 0) return;
    c.save();
    c.globalCompositeOperation = "destination-out";
    c.lineWidth = el.strokeWidth ?? 12;
    c.beginPath();
    const pts = el.points!;
    c.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
    c.stroke();
    c.globalCompositeOperation = "source-over";
    c.restore();
  };

  const drawLine = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.points || el.points.length < 2) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 2;
    c.strokeStyle = el.stroke ?? "#000";
    c.beginPath();
    c.moveTo(el.points![0].x, el.points![0].y);
    c.lineTo(el.points![1].x, el.points![1].y);
    c.stroke();
    c.restore();
  };

  const drawRect = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (el.x == null || el.y == null || el.w == null || el.h == null) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 2;
    const minX = Math.min(el.x, el.x + el.w);
    const minY = Math.min(el.y, el.y + el.h);
    const w = Math.abs(el.w);
    const h = Math.abs(el.h);
    if (el.fill) {
      c.fillStyle = el.fill;
      c.fillRect(minX, minY, w, h);
    }
    c.strokeStyle = el.stroke ?? "#000";
    c.strokeRect(minX, minY, w, h);
    c.restore();
  };

  const drawCircle = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (el.x == null || el.y == null || el.w == null || el.h == null) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 2;
    const cx = el.x + el.w / 2;
    const cy = el.y + el.h / 2;
    const rx = Math.abs(el.w) / 2;
    const ry = Math.abs(el.h) / 2;
    c.beginPath();
    c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    if (el.fill) c.fill();
    c.strokeStyle = el.stroke ?? "#000";
    c.stroke();
    c.restore();
  };

  const drawStar = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (el.x == null || el.y == null || el.w == null || el.h == null) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 2;
    const cx = el.x + el.w / 2;
    const cy = el.y + el.h / 2;
    const outer = Math.max(Math.abs(el.w), Math.abs(el.h)) / 2;
    const inner = outer * 0.5;
    const spikes = 5;
    let rot = Math.PI / 2 * 3;
    c.beginPath();
    for (let i = 0; i < spikes; i++) {
      const x1 = cx + Math.cos(rot) * outer;
      const y1 = cy + Math.sin(rot) * outer;
      c.lineTo(x1, y1);
      rot += Math.PI / spikes;
      const x2 = cx + Math.cos(rot) * inner;
      const y2 = cy + Math.sin(rot) * inner;
      c.lineTo(x2, y2);
      rot += Math.PI / spikes;
    }
    c.closePath();
    if (el.fill) c.fill();
    c.strokeStyle = el.stroke ?? "#000";
    c.stroke();
    c.restore();
  };

  const drawImageEl = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.src || el.x == null || el.y == null || el.w == null || el.h == null) return;
    const cache = imageCache.current;
    const key = el.src;
    const draw = (img: HTMLImageElement) => {
      c.save();
      const minX = Math.min(el.x!, el.x! + el.w!);
      const minY = Math.min(el.y!, el.y! + el.h!);
      const w = Math.abs(el.w!);
      const h = Math.abs(el.h!);
      c.drawImage(img, minX, minY, w, h);
      c.restore();
    };
    if (cache.has(key)) {
      draw(cache.get(key)!);
      return;
    }
    const img = new Image();
    img.src = el.src;
    img.onload = () => {
      imageCache.current.set(key, img);
      // redraw entire canvas once image loaded
      const ctx = ctxRef.current;
      if (ctx) redraw(ctx, elements);
    };
    // early draw if loaded
    if ((img as any).complete) {
      imageCache.current.set(key, img);
      draw(img);
    }
  };

  // toolbar handlers
  const handleToolSelect = (t: Tool) => {
    setTool(t);
    if (t !== "select") setSelectedId(null);
  };

  // image picker
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImagePick = (file?: File) => {
    const f = file;
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const canvas = canvasRef.current!;
      const id = uid();
      const w = Math.min(300, canvas.clientWidth * 0.6);
      const el: BaseElement = { id, type: "image", src, x: 80, y: 60, w, h: Math.floor(w * 0.66), rotation: 0 };
      undoStack.current.push(elements.map((e) => ({ ...e })));
      if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
      setElements((s) => [...s, el]);
    };
    reader.readAsDataURL(f);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    handleImagePick(f);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // const removeSelected = () => {
  //   if (!selectedId) return;
  //   undoStack.current.push(elements.map((e) => ({ ...e })));
  //   setElements((s) => s.filter((el) => el.id !== selectedId));
  //   setSelectedId(null);
  // };

  const clearBoard = () => {
    undoStack.current.push(elements.map((e) => ({ ...e })));
    setElements([]);
    setSelectedId(null);
  };

  // detect click on resize handle
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const onDown = (e: PointerEvent) => {
      if (tool !== "select") return;
      const p = getPoint(e);
      const sel = elements.find((el) => el.id === selectedId);
      if (!sel || sel.x == null || sel.y == null || sel.w == null || sel.h == null) return;
      const minX = Math.min(sel.x, sel.x + sel.w);
      const minY = Math.min(sel.y, sel.y + sel.h);
      const w = Math.abs(sel.w);
      const h = Math.abs(sel.h);
      const rx = minX + w;
      const ry = minY + h;
      if (p.x >= rx - 8 && p.x <= rx + 8 && p.y >= ry - 8 && p.y <= ry + 8) {
        resizing.current = { corner: "br", elId: selectedId! };
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    return () => canvas.removeEventListener("pointerdown", onDown);
  }, [tool, elements, selectedId]);

  // const presetColors = ["#e63946", "#1b5f81", "#000000", "#2d2d2d"];

  return (
    <div className="w-full h-screen flex flex-col bg-[#f3f7f9]">
      {/* header */}
      <header className="w-full h-12 bg-[#b9cedc] flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-[#1b5f81] flex items-center justify-center font-bold text-[#1b5f81] text-xs">H</div>
          <span className="text-[#1b5f81] font-semibold text-lg tracking-wide">HireArena</span>
        </div>
        <h1 className="text-[#2d2d2d] font-medium text-lg">Interview Session</h1>
        <button className="flex items-center gap-1 text-sm text-gray-700 bg-white px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
          <Maximize2 size={14} /> Exit Fullscreen
        </button>
      </header>

      <div className="flex-1 p-6">
        <div className="flex gap-6 h-full">
          <div className="w-[70%] h-[540px] flex flex-col border-2 border-[#6bb4d6] bg-white rounded-xl shadow-md p-4">
            <h2 className="text-3xl font-semibold text-center mb-4 text-black">White Board</h2>
            <div className="flex gap-4 h-[400px] flex-1">
              {/* toolbar */}
              <div className="w-14 flex flex-col items-center gap-3">
                <button onClick={() => handleToolSelect("pencil")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "pencil" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Pencil"><Pencil size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("line")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "line" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Line"><Slash size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("rect")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "rect" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Rectangle"><Square size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("circle")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "circle" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Circle"><Circle size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("star")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "star" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Star"><StarIcon size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("eraser")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "eraser" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Eraser"><Scissors size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => fileInputRef.current?.click()} className={`w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]`} title="Image"><ImageIcon size={18} className="text-[#1b5f81]"/></button>
                <button onClick={() => clearBoard()} className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]" title="Clear"><Trash2 size={16} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleUndo()} className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]" title="Undo"><CornerDownLeft size={16} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleRedo()} className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]" title="Redo"><RotateCw size={16} className="text-[#1b5f81]"/></button>
                <button onClick={() => handleToolSelect("select")} className={`w-10 h-10 flex items-center justify-center rounded-lg border ${tool === "select" ? "bg-[#cbe6f4] border-[#4ea0d0]" : "bg-[#f4f7f9] border border-[#d7dce0]"}`} title="Select"><Move size={16} className="text-[#1b5f81]"/></button>
              </div>

              <div ref={wrapperRef} className="flex-1 ml-2 border border-[#d9d9d9] rounded-xl p-2 bg-white shadow-inner relative flex">
                <canvas ref={canvasRef} className={`flex-1 w-full bg-white rounded-md cursor-${tool === "select" ? "move" : "crosshair"}`} />
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                <div className="absolute right-2 top-16 h-[340px] w-4 bg-transparent flex items-center justify-center"><div className="w-2 h-12 bg-gray-200 rounded"/></div>
              </div>
            </div>
          </div>

          <div className="w-[30%] flex flex-col gap-5">
            <div className="bg-white border h-[18vw] border-[#dbe3ea] rounded-xl shadow-md p-4 flex gap-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-20 h-20 rounded-full object-cover" alt="hr" />
              <div>
                <h3 className="font-bold text-lg">HR Name: Sarah Jenkins</h3>
                <p className="text-sm text-gray-600">HR/Behavioural Interviewer</p>
                <p className="text-xs text-gray-700 mt-1">[Descriptions | Personal] of the HR! HR manager is to later with persons spanning technical interviewer and professional solution.</p>
              </div>
            </div>

            <div className="bg-white border border-[#dbe3ea] rounded-xl shadow-md p-4 text-center">
              <h3 className="font-semibold text-xl mb-3">Camera View</h3>
              <div className="w-full h-40 bg-[#f6f7f8] flex items-center justify-center rounded-md border border-[#d9d9d9] overflow-hidden">
  {isCameraOn && !permissionDenied ? (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      autoPlay
      muted
      playsInline
    />
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500">
      <svg width="50" height="40" viewBox="0 0 24 24" fill="#c0c3c6">
        <path d="M17 10.5V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5l5 5v-13l-5 5z"/>
      </svg>
      <p className="text-gray-500 mt-2">
        {permissionDenied ? "Permission Denied" : "Camera Off"}
      </p>
    </div>
  )}
</div>

            </div>
          </div>
        </div>
      </div>

      <footer className="w-full h-14 bg-[#f7f9fc] border-t border-gray-300 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#d9534f]"/><span className="text-sm font-semibold text-gray-700">REC</span></div>
          <span className="text-sm text-gray-500">Recording in progress</span>
          <button className="w-9 h-9 bg-[#e6eaed] rounded-full flex items-center justify-center hover:bg-gray-300 transition"><Mic size={18} className="text-gray-700"/></button>
          <button
  onClick={toggleCamera}
  className={`w-9 h-9 rounded-full flex items-center justify-center transition
    ${isCameraOn ? "bg-red-200" : "bg-[#e6eaed] hover:bg-gray-300"}`}
>
  <Video size={18} className={`${isCameraOn ? "text-red-600" : "text-gray-700"}`} />
</button>

        </div>

        <div className="flex items-center bg-[#c3d7e4] px-10 py-2 rounded-t-xl shadow-inner border border-[#a6c2d4]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#4ea0d0] mr-3"><MonitorPlay size={18} className="text-[#e63946]"/></div>
          <span className="text-lg font-semibold text-gray-800">Subtitled</span>
        </div>

        <button
        onClick={()=>{
          navigate("../dashboard")
        }}
        className="flex items-center gap-2 bg-[#e6eaed] text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">END CALL</button>
      </footer>
    </div>
  );
}
