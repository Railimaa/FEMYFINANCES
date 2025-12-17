export function Spinner({ size }: { size?: number }) {
  return (
    <div
      className="border-[3px] border-l-[3px] border-l-foreground rounded-full animate-spin size-5"
      style={{ width: size, height: size }}
    />
  );
}
