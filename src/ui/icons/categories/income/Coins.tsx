export function Coins() {
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

      {/* Moedas */}
      <circle cx="17" cy="17" r="6" stroke="#2B8A3E" strokeWidth="1.5" />
      <path
        d="M28.5 19.5A6 6 0 1 1 20.8 27"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15h1v4"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m26.5 23 .7.7-2.8 2.8"
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
