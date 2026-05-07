interface BubblesProps {
  count?: number;
}

export default function Bubbles({ count = 14 }: BubblesProps) {
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = 8 + ((i * 7) % 28);
    const left = (i * 73) % 100;
    const duration = 9 + ((i * 3) % 12);
    const delay = (i * 1.7) % duration;
    return { size, left, duration, delay, key: i };
  });
  return (
    <div className="bubbles" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.key}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `-${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
