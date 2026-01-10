export function TvMinimalPlay() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo */}
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#F3F4F6" />

      {/* TvMinimalPlay (lucide adaptado) */}
      <g
        stroke="#6B7280" // gray-500
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(10 10)"
      >
        <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
        <path d="M7 21h10" />
        <rect width="20" height="14" x="2" y="3" rx="2" />
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
