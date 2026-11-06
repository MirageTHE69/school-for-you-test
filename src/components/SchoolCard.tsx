'use client';

import Image from 'next/image';
import Link from 'next/link';
import { fmt, facilitiesOf, type School } from '@/lib/data';
import { useApp } from './AppProvider';

export type CardData = {
  name: string;
  area: string;
  km: number | string;
  curriculum: string;
  ages: string;
  facilities: string[];
  feeLabel: string;
  tone: string;
  photo?: string | null;
  photoAlt?: string;
  verified?: boolean;
  rating?: number | null;
  reviews?: number;
};

/** Visual card. Interactive bits (heart, compare, view) are optional so the
 *  "List your preschool" live preview can reuse it as a static mock. */
export function SchoolCardView({
  d, href, fav = false, cmp = false, onFav, onCmp, delay = 0,
}: {
  d: CardData; href?: string; fav?: boolean; cmp?: boolean; onFav?: () => void; onCmp?: () => void; delay?: number;
}) {
  const Title = href ? Link : 'span';
  return (
    <div style={{ animation: 'snyIn .6s ease both', animationDelay: `${delay}ms`, height: '100%' }}>
      <div className="school-card">
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <div className="card-photo photo-tone" style={{ backgroundColor: d.tone }}>
            {d.photo ? (
              <Image src={d.photo} alt={d.photoAlt || d.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 400px" style={{ objectFit: 'cover' }} unoptimized={d.photo.startsWith('blob:')} />
            ) : (
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#55604F' }}>Your cover photo</span>
            )}
          </div>
          {href && <Link href={href} aria-label={`View ${d.name}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />}
          <button
            onClick={(e) => { e.stopPropagation(); onFav?.(); }}
            aria-label={fav ? 'Remove from saved' : 'Save to favourites'}
            aria-pressed={fav}
            className="heart-btn"
            style={{ color: fav ? '#C4532F' : '#2C332D', transform: `scale(${fav ? 1.08 : 1})` }}
          >
            {fav ? '♥' : '♡'}
          </button>
          {d.verified && (
            <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,252,247,.92)', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#3F5A3B' }}>
              <span style={{ width: 16, height: 16, borderRadius: 999, background: '#A8BFA3', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>Verified
            </span>
          )}
        </div>
        <div style={{ padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <Title href={href as string} style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-.015em', lineHeight: 1.25, color: '#2C332D', textDecoration: 'none' }}>{d.name}</Title>
              <span style={{ fontSize: 13.5, color: '#6E726A' }}>{d.area} · {d.km} km away</span>
            </div>
            {d.rating ? (
              <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', gap: 4, alignItems: 'center' }}>
                ★ {d.rating} <span style={{ color: '#6E726A', fontWeight: 500 }}>({d.reviews})</span>
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 12.5, fontWeight: 600 }}>
            <span style={{ background: '#F7F3EA', padding: '5px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{d.curriculum}</span>
            <span style={{ background: '#F7F3EA', padding: '5px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{d.ages}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px 14px', flexWrap: 'wrap', fontSize: 13, color: '#6E726A' }}>
            {d.facilities.map((f) => (
              <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: '#A8BFA3' }} />{f}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #F0EBE0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.01em' }}>{d.feeLabel}</span>
              <span style={{ fontSize: 12, color: '#6E726A' }}>tuition per year</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={onCmp} aria-pressed={cmp} className="unbutton" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: '#2C332D', padding: '8px 4px' }}>
                <span style={{ width: 18, height: 18, borderRadius: 6, border: `1.5px solid ${cmp ? '#55704F' : '#C9C1B0'}`, background: cmp ? '#55704F' : '#fff', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s ease' }}>{cmp ? '✓' : ''}</span>
                Compare
              </button>
              {href ? (
                <Link href={href} className="btn btn-dark" style={{ fontSize: 13, padding: '10px 16px' }}>View School</Link>
              ) : (
                <span className="btn btn-dark" style={{ fontSize: 13, padding: '10px 16px' }}>View School</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchoolCard({ s, index = 0 }: { s: School; index?: number }) {
  const { fav, cmp, toggleFav, toggleCmp } = useApp();
  return (
    <SchoolCardView
      d={{ ...s, facilities: facilitiesOf(s), feeLabel: fmt(s.fee), photo: s.cover, photoAlt: `${s.name} — classroom` }}
      href={`/schools/${s.id}`}
      fav={fav.includes(s.id)}
      cmp={cmp.includes(s.id)}
      onFav={() => toggleFav(s.id)}
      onCmp={() => toggleCmp(s.id)}
      delay={index * 70}
    />
  );
}
