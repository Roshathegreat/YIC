interface WhaleProps {
  size?: number;
  className?: string;
}

export default function Whale({ size = 220, className = "" }: WhaleProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={(size * 200) / 320}
      className={className}
      role="img"
      aria-label="Wooby the humpback whale"
    >
      <defs>
        <linearGradient id="wooby-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c5b8e" />
          <stop offset="100%" stopColor="#0a3d62" />
        </linearGradient>
        <linearGradient id="wooby-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeefb" />
          <stop offset="100%" stopColor="#a8e6f0" />
        </linearGradient>
      </defs>

      <path
        d="M 30 110
           C 50 60, 130 50, 200 70
           C 250 80, 290 90, 305 80
           C 290 110, 270 120, 240 125
           C 280 145, 285 165, 270 175
           C 250 165, 230 150, 215 140
           C 180 150, 110 150, 70 135
           C 45 130, 25 125, 30 110 Z"
        fill="url(#wooby-body)"
      />

      <path
        d="M 70 130
           C 110 145, 180 145, 215 138
           C 200 155, 130 165, 80 150 Z"
        fill="url(#wooby-belly)"
        opacity="0.85"
      />

      <ellipse cx="60" cy="105" rx="3.2" ry="3.6" fill="#0a3d62" />
      <ellipse cx="58" cy="103.5" rx="1.1" ry="1.3" fill="#ffffff" />

      <path
        d="M 38 118 Q 30 121 33 127 Q 40 124 48 124 Z"
        fill="#0a3d62"
      />

      <path
        d="M 130 95 Q 145 108 165 100 Q 150 112 132 108 Z"
        fill="#0a3d62"
        opacity="0.55"
      />

      <circle cx="42" cy="62" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="50" cy="50" r="2" fill="#ffffff" opacity="0.7" />
      <circle cx="36" cy="48" r="1.5" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}
