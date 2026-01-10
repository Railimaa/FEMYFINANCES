export function Landmark() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo */}
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#FFF4E6" />

      {/* Landmark (lucide corrigido) */}
      <g
        stroke="#D9480F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(9 11)"
      >
        <path d="M3 21h18" />
        <path d="M5 21V9" />
        <path d="M9 21V9" />
        <path d="M13 21V9" />
        <path d="M17 21V9" />
        <path d="M2 9l10-5 10 5" />
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
