declare namespace JSX {
  interface IntrinsicElements {
    "elevenlabs-convai": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      "agent-id"?: string;
    };
  }
}

declare global {
  interface Window {
    ElevenLabsWidget?: any;
  }
}
