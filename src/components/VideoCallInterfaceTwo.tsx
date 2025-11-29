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

/**
 * Pro Whiteboard Component
 *
 * - Tools: pencil, line, rect, circle, star, eraser, image, clear
 * - Undo / Redo
 * - Select / Move / Resize shapes & images
 * - Shapes stored in `elements` array and redrawn on every render
 *
 * Tailwind colors chosen to match your screenshots.
 */

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

const uid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

export default function VideoCallInterfacetwo() {
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // UI state
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState<string>("#e63946"); // red strokes like screenshot
  const [strokeWidth, setStrokeWidth] = useState<number>(3);

  if(!setColor || !setStrokeWidth){}

  // Shapes / Undo/Redo
  const [elements, setElements] = useState<BaseElement[]>([]);
  const undoStack = useRef<BaseElement[][]>([]);
  const redoStack = useRef<BaseElement[][]>([]);

  // Interaction
  const isPointerDown = useRef(false);
  const currentEl = useRef<BaseElement | null>(null);
  const startPoint = useRef<Point | null>(null);
  const selectedId = useRef<string | null>(null);
  const selectionOffset = useRef<Point | null>(null);
  const resizing = useRef<null | { corner: string; elId: string }>(null);

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor((canvas.clientWidth || 900) * dpr);
    canvas.height = Math.floor((canvas.clientHeight || 450) * dpr);
    const context = canvas.getContext("2d")!;
    context.scale(dpr, dpr);
    context.lineCap = "round";
    setCtx(context);
    redraw(context, elements);
    // redraw when window resizes
    const onResize = () => {
      const canvas = canvasRef.current!;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor((canvas.clientWidth || 900) * dpr);
      canvas.height = Math.floor((canvas.clientHeight || 450) * dpr);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      redraw(context, elements);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw on elements change
  useEffect(() => {
    if (!ctx) return;
    redraw(ctx, elements);
  }, [elements, ctx]);

  // Save current elements state to undo stack
  // const pushToUndo = (next: BaseElement[]) => {
  //   undoStack.current.push(elements.map((e) => ({ ...e })));
  //   redoStack.current = []; // clear redo
  //   setElements(next);
  // };

  // Undo
  const handleUndo = () => {
    if (!undoStack.current.length) return;
    const prev = undoStack.current.pop()!;
    redoStack.current.push(elements.map((e) => ({ ...e })));
    setElements(prev.map((e) => ({ ...e })));
  };

  // Redo
  const handleRedo = () => {
    if (!redoStack.current.length) return;
    const next = redoStack.current.pop()!;
    undoStack.current.push(elements.map((e) => ({ ...e })));
    setElements(next.map((e) => ({ ...e })));
  };

  // Helpers: get mouse point relative to canvas
  const getPoint = (evt: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "clientX" in evt ? evt.clientX : (evt as any).x;
    const clientY = "clientY" in evt ? evt.clientY : (evt as any).y;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  // Check if point inside element bounding box
  const isPointInEl = (p: Point, el: BaseElement) => {
    if (el.x == null || el.y == null || el.w == null || el.h == null)
      return false;
    return p.x >= el.x && p.x <= el.x + el.w && p.y >= el.y && p.y <= el.y + el.h;
  };

  // Canvas pointer handlers
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const onPointerDown = (ev: PointerEvent) => {
      const p = getPoint(ev);
      isPointerDown.current = true;
      startPoint.current = p;

      // If select tool, try selecting an element from top to bottom
      if (tool === "select") {
        const topmost = [...elements].slice().reverse().find((el) => isPointInEl(p, el));
        if (topmost) {
          selectedId.current = topmost.id;
          const el = elements.find((x) => x.id === topmost.id)!;
          selectionOffset.current = { x: p.x - (el.x ?? 0), y: p.y - (el.y ?? 0) };
          // mark selection in UI by re-render (we use selectedId ref)
          redraw(ctx!, elements);
          return;
        } else {
          selectedId.current = null;
          redraw(ctx!, elements);
          return;
        }
      }

    

      // Create element depending on tool
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
        setElements((s) => [...s, newEl]);
        return;
      }

      if (tool === "line") {
        const newEl: BaseElement = {
          id,
          type: "line",
          stroke: color,
          strokeWidth,
          points: [p, p],
        };
        currentEl.current = newEl;
        undoStack.current.push(elements.map((e) => ({ ...e })));
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
        setElements((s) => [...s, newEl]);
        return;
      }

      if (tool === "image") {
        // when in image mode, clicking opens file selector via hidden input => handled elsewhere
        return;
      }

      if (tool === "clear") {
        undoStack.current.push(elements.map((e) => ({ ...e })));
        setElements([]);
        return;
      }
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!isPointerDown.current) return;
      const p = getPoint(ev);

      // If selecting & dragging
      if (tool === "select" && selectedId.current) {
        const idx = elements.findIndex((e) => e.id === selectedId.current);
        if (idx === -1) return;
        const el = elements[idx];
        // dragging (not resizing)
        if (!resizing.current) {
          const offset = selectionOffset.current!;
          const nx = p.x - offset.x;
          const ny = p.y - offset.y;
          const next = elements.slice();
          next[idx] = { ...el, x: nx, y: ny }; // move
          setElements(next);
        } else {
          // resizing
          const meta = resizing.current;
          if (!meta || meta.elId !== selectedId.current) return;
          const idx2 = elements.findIndex((e) => e.id === meta.elId);
          if (idx2 === -1) return;
          const el2 = elements[idx2];
          // simple corner resize (bottom-right)
          const nxW = Math.max(10, p.x - (el2.x ?? 0));
          const nxH = Math.max(10, p.y - (el2.y ?? 0));
          const next2 = elements.slice();
          next2[idx2] = { ...el2, w: nxW, h: nxH };
          setElements(next2);
        }
        return;
      }

      // Otherwise we are drawing a new element
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
          // compute w,h
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

    const onPointerUp = (_: PointerEvent) => {
      isPointerDown.current = false;
      currentEl.current = null;
      startPoint.current = null;
      resizing.current = null;
      // when finishing select, keep selected id
      // keep redo stack cleared already when pushing undo
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, elements, ctx]);

  // Redraw everything
  const redraw = (context: CanvasRenderingContext2D, els: BaseElement[]) => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    // clear
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // white background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // draw each element in order
    els.forEach((el) => {
      if (el.type === "pencil") {
        drawPencil(context, el);
      } else if (el.type === "eraser") {
        drawEraser(context, el);
      } else if (el.type === "line") {
        drawLine(context, el);
      } else if (el.type === "rect") {
        drawRect(context, el);
      } else if (el.type === "circle") {
        drawCircle(context, el);
      } else if (el.type === "star") {
        drawStar(context, el);
      } else if (el.type === "image" && el.src) {
        drawImageEl(context, el);
      }
    });

    // draw selection if any
    if (selectedId.current) {
      const sel = els.find((e) => e.id === selectedId.current);
      if (sel && sel.x != null && sel.y != null && sel.w != null && sel.h != null) {
        context.save();
        context.lineWidth = 1;
        context.strokeStyle = "#4ea0d0";
        context.setLineDash([6, 4]);
        context.strokeRect(sel.x - 4, sel.y - 4, sel.w + 8, sel.h + 8);
        context.setLineDash([]);
        // draw resize handle bottom-right
        const rx = sel.x + sel.w;
        const ry = sel.y + sel.h;
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

  // Drawing helpers
  const drawPencil = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.points || el.points.length === 0) return;
    c.save();
    c.lineWidth = el.strokeWidth ?? 3;
    c.strokeStyle = el.stroke ?? "#000";
    c.beginPath();
    const pts = el.points!;
    c.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      c.lineTo(pts[i].x, pts[i].y);
    }
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
    for (let i = 1; i < pts.length; i++) {
      c.lineTo(pts[i].x, pts[i].y);
    }
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
    if (el.fill) {
      c.fillStyle = el.fill;
      c.fillRect(el.x, el.y, el.w, el.h);
    }
    c.strokeStyle = el.stroke ?? "#000";
    c.strokeRect(el.x, el.y, el.w, el.h);
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
    let x = cx;
    let y = cy;
    c.beginPath();
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outer;
      y = cy + Math.sin(rot) * outer;
      c.lineTo(x, y);
      rot += Math.PI / spikes;

      x = cx + Math.cos(rot) * inner;
      y = cy + Math.sin(rot) * inner;
      c.lineTo(x, y);
      rot += Math.PI / spikes;
    }
    c.closePath();
    if (el.fill) c.fill();
    c.strokeStyle = el.stroke ?? "#000";
    c.stroke();
    c.restore();
  };

  const drawImageEl = (c: CanvasRenderingContext2D, el: BaseElement) => {
    if (!el.src || el.x == null || el.y == null || el.w == null || el.h == null)
      return;
    const img = new Image();
    img.src = el.src;
    img.onload = () => {
      c.save();
      c.drawImage(img, el.x!, el.y!, el.w!, el.h!);
      c.restore();
    };
    // if already loaded from cache it may not trigger onload - attempt immediate draw:
    if ((img as any).complete) {
      c.save();
      c.drawImage(img, el.x!, el.y!, el.w!, el.h!);
      c.restore();
    }
  };

  // toolbar actions
  const handleToolSelect = (t: Tool) => {
    setTool(t);
    if (t !== "select") {
      selectedId.current = null;
      redraw(ctx!, elements);
    }
  };

  // image upload handler
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
      
      const el: BaseElement = {
        id,
        type: "image",
        src,
        x: 80,
        y: 60,
        w,
        h: (w * 0.66) | 0,
        rotation: 0,
      };
      undoStack.current.push(elements.map((e) => ({ ...e })));
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

  // remove selected
  // const removeSelected = () => {
  //   if (!selectedId.current) return;
  //   undoStack.current.push(elements.map((e) => ({ ...e })));
  //   setElements((s) => s.filter((el) => el.id !== selectedId.current));
  //   selectedId.current = null;
  // };

  // clear canvas
  const clearBoard = () => {
    undoStack.current.push(elements.map((e) => ({ ...e })));
    setElements([]);
    selectedId.current = null;
  };

  // mouse down on canvas for selection resize handle detection
  // we have pointerdown handling above. For resizing we detect clicks on the resize handle square when select active.
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const onDown = (e: PointerEvent) => {
      if (tool !== "select") return;
      const p = getPoint(e);
      const sel = elements.find((el) => el.id === selectedId.current);
      if (!sel || sel.x == null || sel.y == null || sel.w == null || sel.h == null)
        return;
      const rx = sel.x + sel.w;
      const ry = sel.y + sel.h;
      // handle rect centered at bottom-right (16x16)
      if (p.x >= rx - 8 && p.x <= rx + 8 && p.y >= ry - 8 && p.y <= ry + 8) {
        resizing.current = { corner: "br", elId: selectedId.current! };
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    return () => canvas.removeEventListener("pointerdown", onDown);
  }, [tool, elements]);

  // small utility to set color quickly (not in screenshot but handy)
  // const presetColors = ["#e63946", "#1b5f81", "#000000", "#2d2d2d"];

  // --- Render UI ---
  return (
    <div className="w-full h-screen flex flex-col bg-[#f3f7f9]">
      {/* HEADER */}
      <header className="w-full h-12 bg-[#b9cedc] flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-[#1b5f81] flex items-center justify-center font-bold text-[#1b5f81] text-xs">
            H
          </div>
          <span className="text-[#1b5f81] font-semibold text-lg tracking-wide">
            HireArena
          </span>
        </div>

        <h1 className="text-[#2d2d2d] font-medium text-lg">Interview Session</h1>

        <button className="flex items-center gap-1 text-sm text-gray-700 bg-white px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
          <Maximize2 size={14} />
          Exit Fullscreen
        </button>
      </header>

      {/* BODY */}
      <div className="flex-1 p-6">
        <div className="flex gap-6 h-full">
          {/* LEFT: Whiteboard container */}
          <div className="w-[70%] h-[540px] flex flex-col border-2 border-[#6bb4d6] bg-white rounded-xl shadow-md p-4">

            <h2 className="text-3xl font-semibold text-center mb-4 text-black">
              White Board
            </h2>

            <div className="flex gap-4 h-[400px] flex-1">
              {/* TOOLBAR */}
              <div className="w-14 flex flex-col items-center gap-3">
                <button
                  onClick={() => handleToolSelect("pencil")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "pencil"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Pencil"
                >
                  <Pencil size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("line")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "line"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Line"
                >
                  <Slash size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("rect")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "rect"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Rectangle"
                >
                  <Square size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("circle")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "circle"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Circle"
                >
                  <Circle size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("star")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "star"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Star"
                >
                  <StarIcon size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("eraser")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "eraser"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Eraser"
                >
                  <Scissors size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]`}
                  title="Image"
                >
                  <ImageIcon size={18} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => {
                    clearBoard();
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]"
                  title="Clear"
                >
                  <Trash2 size={16} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleUndo()}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]"
                  title="Undo"
                >
                  <CornerDownLeft size={16} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleRedo()}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border bg-[#f4f7f9] border border-[#d7dce0]"
                  title="Redo"
                >
                  <RotateCw size={16} className="text-[#1b5f81]" />
                </button>

                <button
                  onClick={() => handleToolSelect("select")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    tool === "select"
                      ? "bg-[#cbe6f4] border-[#4ea0d0]"
                      : "bg-[#f4f7f9] border border-[#d7dce0]"
                  }`}
                  title="Select"
                >
                  <Move size={16} className="text-[#1b5f81]" />
                </button>
              </div>

              {/* Canvas area */}
            <div
  ref={wrapperRef}
  className="flex-1 ml-2 border border-[#d9d9d9] rounded-xl p-2 bg-white shadow-inner relative flex"
>


                <canvas
  ref={canvasRef}
  className="flex-1 w-full  bg-white rounded-md cursor-crosshair"
/>

                {/* invisible file input for image */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
                {/* Right-side scrollbar mimic (visual only) */}
                <div className="absolute right-2 top-16 h-[340px] w-4 bg-transparent flex items-center justify-center">
                  <div className="w-2 h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[30%] flex flex-col gap-5">
            {/* HR CARD */}
            <div className="bg-white border h-[18vw] border-[#dbe3ea] rounded-xl shadow-md p-4 flex gap-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-20 h-20 rounded-full object-cover"
                alt="hr"
              />
              <div>
                <h3 className="font-bold text-lg">HR Name: Sarah Jenkins</h3>
                <p className="text-sm text-gray-600">HR/Behavioural Interviewer</p>
                <p className="text-xs text-gray-700 mt-1">
                  [Descriptions | Personal] of the HR! HR manager is to later
                  with persons spanning technical interviewer and professional
                  solution. React on HR manager for goals of team winner and
                  interview arrangement.
                </p>
              </div>
            </div>

            {/* CAMERA VIEW */}
            <div className="bg-white border border-[#dbe3ea] rounded-xl shadow-md p-4 text-center">
              <h3 className="font-semibold text-xl mb-3">Camera View</h3>

              <div className="w-full h-40 bg-[#f6f7f8] flex flex-col items-center justify-center rounded-md border border-[#d9d9d9]">
                <svg width="50" height="40" viewBox="0 0 24 24" fill="#c0c3c6">
                  <path d="M17 10.5V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5l5 5v-13l-5 5z" />
                </svg>
                <p className="text-gray-500 mt-2">Camera Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full h-14 bg-[#f7f9fc] border-t border-gray-300 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#d9534f]" />
            <span className="text-sm font-semibold text-gray-700">REC</span>
          </div>
          <span className="text-sm text-gray-500">Recording in progress</span>

          <button className="w-9 h-9 bg-[#e6eaed] rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <Mic size={18} className="text-gray-700" />
          </button>
          <button className="w-9 h-9 bg-[#e6eaed] rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <Video size={18} className="text-gray-700" />
          </button>
        </div>

        <div className="flex items-center bg-[#c3d7e4] px-10 py-2 rounded-t-xl shadow-inner border border-[#a6c2d4]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#4ea0d0] mr-3">
            <MonitorPlay size={18} className="text-[#e63946]" />
          </div>
          <span className="text-lg font-semibold text-gray-800">Subtitled</span>
        </div>

        <button className="flex items-center gap-2 bg-[#e6eaed] text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">
          END CALL
        </button>
      </footer>
    </div>
  );

}


