export function Podcast() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo */}
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#F3F0FF" />

      {/* Podcast (lucide adaptado) */}
      <g
        stroke="#7048E8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(10 10)"
      >
        <path
          d="M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z"
          fill="#7048E8"
        />
        <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
        <path d="M8 14a5 5 0 1 1 8 0" />
        <circle cx="12" cy="11" r="1" fill="#7048E8" />
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
