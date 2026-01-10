export function Phone() {
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

      {/* Lucide phone adaptado */}
      <g
        stroke="#495057"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(10 10)"
      >
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
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
