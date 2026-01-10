export function RotateCcw() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo */}
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#EBFBEE" />

      {/* Seta circular (reembolso) */}
      <path
        d="M22 13C16.5 13 12 17.5 12 23C12 28.5 16.5 33 22 33C27.5 33 32 28.5 32 23"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18L12 23L17 23"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

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
