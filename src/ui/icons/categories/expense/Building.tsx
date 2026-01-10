export function Building() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo */}
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#F1F3F5" />

      {/* Lucide building adaptado */}
      <g
        stroke="#495057"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(10 10)"
      >
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M12 6h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
        <path d="M8 6h.01" />
        <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        <rect x="4" y="2" width="16" height="20" rx="2" />
      </g>

      {/* Borda */}
      <rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="21"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}
