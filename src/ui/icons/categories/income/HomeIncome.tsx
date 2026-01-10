export function HomeIncome() {
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

      {/* Casa */}
      <path
        d="M22 10L11 19V30H18V22H26V30H33V19L22 10Z"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Porta */}
      <path
        d="M20 30V24H24V30"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sinal de + (renda) */}
      <path
        d="M28 20H34"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M31 17V23"
        stroke="#2B8A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
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
