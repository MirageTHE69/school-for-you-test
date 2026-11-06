'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import SchoolCard from '@/components/SchoolCard';
import { AGE, AREAS, BUDGETS, DEFAULT_F, SCHOOLS, SORTS, TIMINGS, TOGGLES, TYPES, filterSchools, fmt, sortSchools, type Filters } from '@/lib/data';

const T = '#C4532F';

export default function ExplorePage() {
  const { f, setF, setFilters, sort, setSort } = useApp();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [mapSel, setMapSel] = useState<string | null>(null);

  const results = sortSchools(filterSchools(SCHOOLS, f), sort);
  const active: { label: string; remove: () => void }[] = [];
  (['area', 'age', 'type', 'budget', 'timing'] as const).forEach((k) => {
    if (f[k] !== DEFAULT_F[k]) active.push({ label: f[k], remove: () => setF(k, DEFAULT_F[k]) });
  });
  TOGGLES.forEach(([k, l]) => { if (f[k]) active.push({ label: l, remove: () => setF(k, false) }); });
  const sel = results.find((s) => s.id === mapSel) || results[0] || null;
  const clear = () => setFilters({ ...DEFAULT_F });

  const selects: { label: string; key: keyof Filters; opts: string[] }[] = [
    { label: 'Location', key: 'area', opts: ['All areas', ...AREAS] },
    { label: 'Age group', key: 'age', opts: Object.keys(AGE) },
    { label: 'Fees', key: 'budget', opts: BUDGETS },
    { label: 'Curriculum', key: 'type', opts: TYPES },
    { label: 'School timings', key: 'timing', opts: TIMINGS },
  ];

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(28px,4vw,48px)', paddingBottom: 96, animation: 'snyIn .5s ease both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#6E726A' }}><Link href="/" style={{ color: '#6E726A' }}>Home</Link> / Explore</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 650 }}>
            Preschools in <span className="serif" style={{ color: '#55704F' }}>{f.area === 'All areas' ? 'Pune' : f.area}</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setFiltersOpen((o) => !o)} className="mobile-only btn btn-outline" aria-expanded={filtersOpen} style={{ fontSize: 14, padding: '12px 18px', minHeight: 44 }}>
            Filters{active.length ? ` (${active.length})` : ''}
          </button>
          <div style={{ display: 'flex', gap: 4, background: '#F1ECE1', borderRadius: 999, padding: 4 }}>
            {(['grid', 'map'] as const).map((k) => (
              <button key={k} onClick={() => setView(k)} aria-pressed={view === k} style={{ border: 'none', cursor: 'pointer', background: view === k ? '#fff' : 'transparent', color: '#2C332D', fontSize: 14, fontWeight: 600, padding: '9px 16px', borderRadius: 999, boxShadow: view === k ? '0 2px 8px rgba(44,51,45,.12)' : 'none', transition: 'all .25s' }}>
                {k === 'grid' ? 'Grid' : 'Map'}
              </button>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#6E726A' }}>
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ border: '1px solid #D9D1C0', background: '#fff', color: '#2C332D', fontSize: 14, fontWeight: 600, padding: '11px 14px', borderRadius: 999, cursor: 'pointer', minHeight: 44 }}>
              {SORTS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className={`filters-panel${filtersOpen ? ' open' : ''}`} style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 24, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20, animation: 'snyIn .35s ease both' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: 10 }}>
          {selects.map((s) => (
            <label key={s.key} className="filter-box">
              <span>{s.label}</span>
              <select value={f[s.key] as string} onChange={(e) => setF(s.key, e.target.value as never)}>
                {s.opts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6E726A', marginRight: 4 }}>Facilities</span>
          {TOGGLES.map(([k, l]) => {
            const on = f[k];
            return (
              <button key={k} onClick={() => setF(k, !on)} aria-pressed={on} style={{ border: `1px solid ${on ? '#2C332D' : '#E4DDCE'}`, cursor: 'pointer', background: on ? '#2C332D' : '#fff', color: on ? '#FFFCF7' : '#2C332D', fontSize: 13.5, fontWeight: 600, padding: '10px 15px', borderRadius: 999, minHeight: 40, whiteSpace: 'nowrap', transition: 'all .25s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
                {on ? '✓ ' : ''}{l}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22, minHeight: 34 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{results.length} {results.length === 1 ? 'preschool' : 'preschools'}</span>
          {active.map((c) => (
            <button key={c.label} onClick={c.remove} style={{ border: 'none', cursor: 'pointer', background: '#EEF3EC', color: '#3F5A3B', fontSize: 12.5, fontWeight: 600, padding: '7px 10px 7px 12px', borderRadius: 999, display: 'flex', gap: 6, alignItems: 'center', animation: 'snyIn .25s ease both' }}>
              {c.label}<span style={{ fontSize: 14, lineHeight: 1 }}>×</span>
            </button>
          ))}
        </div>
        {active.length > 0 && (
          <button onClick={clear} style={{ border: 'none', cursor: 'pointer', background: 'transparent', color: '#2C332D', fontSize: 13.5, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Clear all</button>
        )}
      </div>

      {view === 'grid' && results.length > 0 && (
        <div className="card-grid">
          {results.map((s, i) => <SchoolCard key={s.id} s={s} index={i} />)}
        </div>
      )}

      {view === 'map' && results.length > 0 && sel && (
        <div className="map-cols" style={{ animation: 'snyIn .4s ease both' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 620, overflow: 'auto', padding: '2px 4px 2px 2px' }}>
            {results.map((s) => {
              const on = sel.id === s.id;
              return (
                <button key={s.id} onClick={() => setMapSel(s.id)} className="hover-border" style={{ cursor: 'pointer', textAlign: 'left', border: `1.5px solid ${on ? T : '#ECE6D9'}`, background: on ? '#FDF3EE' : '#fff', borderRadius: 20, padding: 12, display: 'flex', gap: 12, alignItems: 'center', transition: 'all .25s', color: '#2C332D' }}>
                  <span className="photo-tone" style={{ flex: 'none', width: 64, height: 64, borderRadius: 14, backgroundColor: s.tone }}>
                    <Image src={s.cover} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 15, fontWeight: 650, letterSpacing: '-.01em' }}>{s.name}</span>
                    <span style={{ fontSize: 12.5, color: '#6E726A' }}>{s.area} · {s.km} km · {s.curriculum}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{fmt(s.fee)}<span style={{ fontWeight: 500, color: '#6E726A', fontSize: 12 }}> /year</span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="map-canvas" style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', backgroundColor: '#E3ECF4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.6) 0 1px, transparent 1px 44px),repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0 1px, transparent 1px 44px)' }}>
            <div style={{ position: 'absolute', left: '-10%', top: '46%', width: '120%', height: 14, background: '#F4EFE4', transform: 'rotate(-8deg)' }} />
            <div style={{ position: 'absolute', left: '44%', top: '-10%', width: 12, height: '120%', background: '#F4EFE4', transform: 'rotate(14deg)' }} />
            <div style={{ position: 'absolute', left: '62%', top: '58%', width: '22%', height: '20%', borderRadius: '40%', background: '#D5E3CF' }} />
            {results.map((s) => {
              const on = sel.id === s.id;
              return (
                <button key={s.id} onClick={() => setMapSel(s.id)} aria-label={s.name} style={{ position: 'absolute', left: `${s.coords[0]}%`, top: `${s.coords[1]}%`, transform: `translate(-50%,-50%) scale(${on ? 1.15 : 1})`, zIndex: on ? 5 : 1, border: '2px solid #fff', cursor: 'pointer', background: on ? T : '#2C332D', color: '#fff', fontSize: 12.5, fontWeight: 700, padding: '7px 11px', borderRadius: 999, whiteSpace: 'nowrap', boxShadow: '0 8px 20px -8px rgba(44,51,45,.45)', transition: 'transform .3s cubic-bezier(.3,1.5,.5,1), background .25s' }}>
                  ₹{Math.round(s.fee / 1000)}k
                </button>
              );
            })}
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, zIndex: 6, background: '#fff', borderRadius: 22, padding: 14, display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 20px 40px -20px rgba(44,51,45,.45)', flexWrap: 'wrap' }}>
              <span className="photo-tone" style={{ flex: 'none', width: 72, height: 72, borderRadius: 16, backgroundColor: sel.tone }}>
                <Image src={sel.cover} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} />
              </span>
              <span style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 16, fontWeight: 650 }}>{sel.name}</span>
                <span style={{ fontSize: 13, color: '#6E726A' }}>{sel.area} · {sel.ages} · {sel.availability}</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{fmt(sel.fee)} /year</span>
              </span>
              <Link href={`/schools/${sel.id}`} className="btn btn-dark" style={{ fontSize: 13.5, padding: '11px 18px' }}>View School</Link>
            </div>
            <span style={{ position: 'absolute', left: 16, top: 16, fontSize: 12, fontWeight: 600, color: '#55606B', background: 'rgba(255,255,255,.85)', padding: '5px 10px', borderRadius: 999 }}>Pune</span>
          </div>
        </div>
      )}

      {results.length === 0 && (
        <div style={{ border: '1.5px dashed #D9D1C0', borderRadius: 28, padding: '64px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <span className="serif" style={{ fontSize: 32 }}>No schools match all of these.</span>
          <p style={{ margin: 0, color: '#6E726A', fontSize: 15 }}>Try removing a filter or widening your budget.</p>
          <button onClick={clear} className="btn btn-dark" style={{ fontSize: 14, padding: '12px 20px' }}>Clear filters</button>
        </div>
      )}
    </div>
  );
}
