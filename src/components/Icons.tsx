/** Íconos lineales propios (trazo 1.6). */
type P = { className?: string };

export function WhatsAppIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3z" />
    </svg>
  );
}

export function Chevron({ className = "h-3 w-3", dir = "right" }: P & { dir?: "right" | "left" }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={dir === "right" ? "M4.5 2.5 8 6l-3.5 3.5" : "M7.5 2.5 4 6l3.5 3.5"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const paths: Record<string, React.ReactNode> = {
  maquinados: (
    <>
      <circle cx="16" cy="16" r="9" />
      <circle cx="16" cy="16" r="3" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4" />
    </>
  ),
  estructuras: (
    <>
      <path d="M4 10h24M6 10v18M26 10v18M6 20h20" />
      <path d="M10 10 16 4l6 6" />
    </>
  ),
  ensambles: (
    <>
      <rect x="4" y="12" width="12" height="12" />
      <rect x="16" y="6" width="12" height="12" />
      <path d="M10 12V8h6" />
    </>
  ),
  quality: <path d="M16 3 6 7v8c0 6.5 4.3 11.6 10 14 5.7-2.4 10-7.5 10-14V7z M11.5 16l3 3 6-6.5" />,
  speed: <path d="M17 3 7 17h8l-2 12 10-15h-8l2-11z" />,
  support: (
    <>
      <path d="M5 7h22v14H14l-6 5v-5H5z" />
      <path d="M10 12h12M10 16h8" />
    </>
  ),
};

export function LineIcon({ name, className = "h-8 w-8" }: P & { name: keyof typeof paths | string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}
