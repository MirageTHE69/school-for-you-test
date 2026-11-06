export function LogoMark() {
  return (
    <span style={{ position: 'relative', width: 34, height: 34, flex: 'none', display: 'block' }} aria-hidden>
      <span style={{ position: 'absolute', left: 3, top: 2, width: 28, height: 26, background: '#A8BFA3', clipPath: 'polygon(50% 0, 100% 44%, 100% 100%, 0 100%, 0 44%)', borderRadius: 4 }} />
      <span style={{ position: 'absolute', left: 12, top: 12, width: 10, height: 10, borderRadius: 999, background: '#F4D77C' }} />
      <span style={{ position: 'absolute', left: 0, bottom: 0, width: 34, height: 9, borderRadius: '0 0 17px 17px', background: '#F4C6A8' }} />
    </span>
  );
}

export function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span style={{ fontWeight: 700, letterSpacing: '-.03em', fontSize: size, color: '#2C332D' }}>
      school
      <span className="serif" style={{ fontSize: size + 4, letterSpacing: '-.01em', color: '#55704F', padding: '0 1px' }}>near</span>
      you
    </span>
  );
}
