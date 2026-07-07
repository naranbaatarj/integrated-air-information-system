type HouseIsometricProps = {
  transform: string;
  smokeClass: string;
  scale?: number;
};

function Window({ x, y, w, h, flicker }: { x: number; y: number; w: number; h: number; flicker?: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={0.3} className={`building-window-glow ${flicker ?? ""}`} />
      <rect x={x} y={y} width={w} height={h} rx={0.3} className="building-window" />
    </>
  );
}

export function HouseIsometric({ transform, smokeClass, scale = 1 }: HouseIsometricProps) {
  return (
    <g className="home" transform={`${transform} scale(${scale})`}>
      <ellipse cx="18" cy="60" rx="21" ry="4.5" className="home-shadow" />

      <path d="M0 30 L18 20 L36 30 L18 40 Z" className="home-wall-top" />
      <path d="M0 30 L0 48 L18 58 L18 40 Z" className="home-wall-left" />
      <path d="M18 40 L18 58 L36 48 L36 30 Z" className="home-wall-right" />

      <path d="M0 30 L18 20 L18 8 L0 18 Z" className="home-roof-left" />
      <path d="M36 30 L18 20 L18 8 L36 18 Z" className="home-roof-right" />

      <rect x="4" y="22" width="5" height="10" rx="0.5" className="home-chimney" />

      <rect x="24" y="36" width="5" height="7" rx="0.5" className="building-window-glow window-flicker-11" />
      <rect x="24" y="36" width="5" height="7" rx="0.5" className="building-window building-window-door" />

      <Window x={4} y={36} w={4} h={5} flicker="window-flicker-1" />
      <Window x={10} y={44} w={4} h={4} flicker="window-flicker-2" />
      <Window x={26} y={36} w={4} h={5} flicker="window-flicker-3" />
      <Window x={26} y={44} w={4} h={4} />

      <g className={`smoke-stack ${smokeClass}`}>
        <ellipse cx="6" cy="18" rx="7" ry="4" fill="url(#smoke-warm)" />
        <ellipse cx="5" cy="10" rx="10" ry="5" fill="url(#smoke-warm)" opacity="0.7" />
        <ellipse cx="7" cy="2" rx="12" ry="6" fill="url(#smoke-warm)" opacity="0.4" />
      </g>
    </g>
  );
}
