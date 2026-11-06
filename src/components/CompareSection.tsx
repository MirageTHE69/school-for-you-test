'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { compareRows, getSchool, SCHOOLS, type School } from '@/lib/data';
import { useApp } from './AppProvider';

export default function CompareSection() {
  const { cmp, toggleCmp } = useApp();
  const [full, setFull] = useState(false);
  const list = cmp.map(getSchool).filter(Boolean) as School[];
  const n = Math.max(list.length, 1);
  const cols = `minmax(170px,1.05fr) repeat(${n}, minmax(200px,1fr))`;
  const rows = list.length ? compareRows(list, full) : [];

  return (
    <section id="compare" style={{ background: '#F7F3EA', padding: 'clamp(64px,8vw,112px) 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 620 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.05, letterSpacing: '-.035em', fontWeight: 650 }}>
              Every detail, <span className="serif" style={{ color: '#55704F' }}>side by side.</span>
            </h2>
            <p style={{ margin: 0, fontSize: 17, color: '#6E726A', lineHeight: 1.55 }}>Compare the things that matter most before making a decision.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {list.length < 3 && (
              <select value="" onChange={(e) => e.target.value && toggleCmp(e.target.value)} aria-label="Add a school to compare" style={{ border: '1px solid #D9D1C0', background: '#fff', color: '#2C332D', fontSize: 14, fontWeight: 600, padding: '12px 16px', borderRadius: 999, cursor: 'pointer' }}>
                <option value="">+ Add a school</option>
                {SCHOOLS.filter((s) => !cmp.includes(s.id)).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            )}
            <span style={{ fontSize: 13, color: '#6E726A' }}>{list.length} of 3 selected</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 28, border: '1px solid #ECE6D9', overflow: 'hidden' }}>
          <div className="scroll-x">
            <div style={{ minWidth: 170 + n * 200 }}>
              <div style={{ display: 'grid', gridTemplateColumns: cols, borderBottom: '1px solid #ECE6D9' }}>
                <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-end', fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6E726A' }}>Category</div>
                {list.map((c) => (
                  <div key={c.id} style={{ padding: '18px 20px', borderLeft: '1px solid #F0EBE0', display: 'flex', flexDirection: 'column', gap: 12, animation: 'snyIn .45s ease both' }}>
                    <Link href={`/schools/${c.id}`} className="photo-tone" style={{ position: 'relative', display: 'block', height: 76, borderRadius: 14, backgroundColor: c.tone }}>
                      <Image src={c.cover} alt={c.name} fill sizes="260px" style={{ objectFit: 'cover' }} />
                    </Link>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                      <Link href={`/schools/${c.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 2, color: '#2C332D', textDecoration: 'none' }}>
                        <span style={{ fontSize: 15.5, fontWeight: 650, letterSpacing: '-.01em', lineHeight: 1.25 }}>{c.name}</span>
                        <span style={{ fontSize: 12.5, color: '#6E726A' }}>{c.area}</span>
                      </Link>
                      <button onClick={() => toggleCmp(c.id)} aria-label={`Remove ${c.name}`} className="hover-sand" style={{ flex: 'none', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: 999, background: '#F7F3EA', color: '#2C332D', fontSize: 15, lineHeight: 1 }}>×</button>
                    </div>
                  </div>
                ))}
                {!list.length && (
                  <div style={{ padding: '22px 20px', borderLeft: '1px solid #F0EBE0', fontSize: 14, color: '#6E726A', display: 'flex', alignItems: 'center' }}>Add up to 3 schools to compare them here.</div>
                )}
              </div>
              {rows.map((r) => (
                <div key={r.label} style={{ display: 'grid', gridTemplateColumns: cols, borderBottom: '1px solid #F3EFE6' }}>
                  <div style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {r.label}
                    {r.differs && <span title="Values differ" style={{ width: 6, height: 6, borderRadius: 999, background: '#E5A47C' }} />}
                  </div>
                  {r.cells.map((cell, i) => (
                    <div key={i} style={{ padding: '16px 20px', borderLeft: '1px solid #F3EFE6', fontSize: 14, lineHeight: 1.45, background: cell.best ? '#F5F8F3' : 'transparent', fontWeight: cell.money ? 650 : 500, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {cell.text}
                      {cell.best && <span style={{ fontSize: 11, fontWeight: 700, color: '#3F5A3B', background: '#DCE7D8', padding: '3px 8px', borderRadius: 999 }}>Lowest</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#6E726A', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#E5A47C' }} />Marks rows where schools differ
            </span>
            <button onClick={() => setFull((v) => !v)} className="btn btn-dark" style={{ fontSize: 14, padding: '12px 20px' }}>{full ? 'Show key details' : 'View Full Comparison'}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
