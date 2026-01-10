export function CreditCard() {
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

      {/* Lucide credit-card adaptado */}
      <g
        stroke="#D9480F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(10 13)"
      >
        <rect width="24" height="16" rx="2" />
        <line x1="0" y1="5" x2="24" y2="5" />
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
