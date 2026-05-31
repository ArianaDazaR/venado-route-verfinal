export function VenadoLogo({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  const color = mono ? "currentColor" : "var(--primary)";
  return (
    <svg viewBox="0 0 220 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        {/* V shape */}
        <path d="M8 12 L24 12 L40 56 L56 12 L72 12 L48 70 L32 70 Z" />
        {/* Deer head silhouette inside V */}
        <g transform="translate(20 18) scale(0.5)">
          {/* antlers */}
          <path d="M14 4 L10 0 L4 6 L8 10 L4 14 L10 16 L14 12 M30 4 L34 0 L40 6 L36 10 L40 14 L34 16 L30 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          {/* head */}
          <ellipse cx="22" cy="26" rx="12" ry="14" />
          {/* eyes (negative) */}
          <circle cx="18" cy="24" r="1.6" fill={mono ? "var(--primary)" : "#fff"} />
          <circle cx="26" cy="24" r="1.6" fill={mono ? "var(--primary)" : "#fff"} />
        </g>
      </g>
      <g fill={color}>
        <text x="84" y="36" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="26" letterSpacing="1">VENADO</text>
        <text x="84" y="58" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="14" letterSpacing="6">ROUTE</text>
      </g>
    </svg>
  );
}
