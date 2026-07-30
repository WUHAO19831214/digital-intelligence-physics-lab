type IconProps = { size?: number; className?: string };

const defaults = (size: number | undefined, className: string | undefined) => ({
  width: size ?? 20,
  height: size ?? 20,
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ArrowUpRight({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function ArrowRight({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function GithubIcon({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.5A5.8 5.8 0 0 0 19.3 3a5.4 5.4 0 0 0-.1-4S18-.4 15 1.5a13.4 13.4 0 0 0-7 0C5-.4 3.8-1 3.8-1a5.4 5.4 0 0 0-.1 4A5.8 5.8 0 0 0 2.2 7c0 5.9 3.5 7.1 6.8 7.5A4.8 4.8 0 0 0 8 18v4" /><path d="M8 19c-3 .9-3-1.5-4.2-2" /></svg>;
}

export function GiteeIcon({ size, className }: IconProps) {
  return (
    <svg
      width={size ?? 20}
      height={size ?? 20}
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.6 10.1H11.2a1 1 0 0 0-1 1v1.8a1 1 0 0 0 1 1h6.2a1 1 0 0 1 1 1v.4a3.2 3.2 0 0 1-3.2 3.2H8.8a3.2 3.2 0 0 1-3.2-3.2V8.7a3.2 3.2 0 0 1 3.2-3.2h12.8a1 1 0 0 0 1-1V2.8a1 1 0 0 0-1-1H8.8a6.9 6.9 0 0 0-6.9 6.9v6.6a6.9 6.9 0 0 0 6.9 6.9h6.4a6.9 6.9 0 0 0 6.9-6.9v-4.7a.5.5 0 0 0-.5-.5Z" />
    </svg>
  );
}

export function SearchIcon({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

export function MenuIcon({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function InfoIcon({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}

export function CheckIcon({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="m5 12 4 4L19 6" /></svg>;
}

export function ChevronDown({ size, className }: IconProps) {
  return <svg {...defaults(size, className)}><path d="m6 9 6 6 6-6" /></svg>;
}
