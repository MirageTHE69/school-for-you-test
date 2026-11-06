'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { CHECKS, SCHOOLS } from '@/lib/data';

export default function DashboardPage() {
  const { enquiries, updateEnquiry, setAccount, flash } = useApp();
  const router = useRouter();
  const [tab, setTab] = useState<'All' | 'New' | 'Contacted'>('All');
  const [checks, setChecks] = useState([true, true, false, true, false]);

  const mine = enquiries.filter((q) => q.school === 's1');
  const newN = mine.filter((q) => q.status === 'New').length;
  const visitN = mine.filter((q) => q.type === 'Visit').length;
  const shown = mine.filter((q) => tab === 'All' || q.status === tab);
  const pct = Math.round((checks.filter(Boolean).length / CHECKS.length) * 100);

  const stats = [
    { label: 'Profile views · last 7 days', value: '412', note: 'Sample figure', tone: '#EEF3EC', ink: '#2C332D' },
    { label: 'New enquiries', value: String(newN), note: 'Waiting for a reply', tone: '#FBE3D6', ink: '#C4532F' },
    { label: 'Visit requests', value: String(visitN), note: 'All time', tone: '#FBF4DC', ink: '#2C332D' },
  ];

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(28px,4vw,48px)', paddingBottom: 96, animation: 'snyIn .5s ease both', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, background: '#EEF3EC', color: '#3F5A3B', fontSize: 12.5, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#55704F' }} />Profile live
          </span>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.05, letterSpacing: '-.035em', fontWeight: 650 }}>{SCHOOLS[0].name}</h1>
          <span style={{ fontSize: 15, color: '#6E726A' }}>School dashboard · Koregaon Park, Pune</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/schools/s1" className="btn btn-outline" style={{ fontSize: 14, padding: '12px 18px', minHeight: 44 }}>View public profile</Link>
          <button onClick={() => { setAccount(null); router.push('/'); flash('Logged out'); }} className="btn btn-ghost" style={{ fontSize: 14, padding: '12px 14px', minHeight: 44 }}>Log out</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16 }}>
        {stats.map((d) => (
          <div key={d.label} style={{ background: d.tone, borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#4B5149' }}>{d.label}</span>
            <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1.05, color: d.ink }}>{d.value}</span>
            <span style={{ fontSize: 13, color: '#4B5149' }}>{d.note}</span>
          </div>
        ))}
      </div>

      <div className="two-col dash">
        <div style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, overflow: 'hidden', minWidth: 0 }}>
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid #F0EBE0' }}>
            <span style={{ fontSize: 19, fontWeight: 650, letterSpacing: '-.015em' }}>Parent enquiries</span>
            <div style={{ display: 'flex', gap: 4, background: '#F7F3EA', borderRadius: 999, padding: 4 }}>
              {(['All', 'New', 'Contacted'] as const).map((t) => {
                const on = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)} aria-pressed={on} style={{ border: 'none', cursor: 'pointer', background: on ? '#2C332D' : 'transparent', color: on ? '#FFFCF7' : '#2C332D', fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 999, display: 'flex', gap: 6, alignItems: 'center', transition: 'all .25s' }}>
                    {t}<span style={{ opacity: 0.7 }}>{t === 'All' ? mine.length : mine.filter((q) => q.status === t).length}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {shown.map((q) => {
            const isNew = q.status === 'New';
            return (
              <div key={q.id} style={{ padding: '18px 24px', borderBottom: '1px solid #F3EFE6', display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap', animation: 'snyIn .35s ease both' }}>
                <span style={{ flex: 'none', width: 42, height: 42, borderRadius: 999, background: q.type === 'Visit' ? '#FBF4DC' : '#EEF3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>{q.parent.trim().charAt(0).toUpperCase()}</span>
                <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15.5, fontWeight: 650 }}>{q.parent}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: isNew ? '#FBE3D6' : '#EEF3EC', color: isNew ? '#9A3A1E' : '#3F5A3B' }}>{q.status}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#6E726A' }}>{[q.child, q.type, q.when].filter(Boolean).join(' · ')}</span>
                  <p style={{ margin: '4px 0 0', fontSize: 14.5, lineHeight: 1.5 }}>{q.msg}</p>
                </div>
                <button onClick={() => updateEnquiry(q.id, isNew ? 'Contacted' : 'New')} className="btn btn-outline" style={{ flex: 'none', fontSize: 13, padding: '9px 14px' }}>{isNew ? 'Mark contacted' : 'Mark as new'}</button>
              </div>
            );
          })}
          {shown.length === 0 && <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: 15, color: '#6E726A' }}>Nothing here yet.</div>}
        </div>

        <div style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 19, fontWeight: 650, letterSpacing: '-.015em' }}>Profile completeness</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#C4532F' }}>{pct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: '#F1ECE1', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#C4532F', borderRadius: 999, transition: 'width .5s cubic-bezier(.2,.7,.2,1)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CHECKS.map((c, i) => {
              const d = checks[i];
              return (
                <button key={c} onClick={() => setChecks((s) => s.map((v, j) => (j === i ? !v : v)))} aria-pressed={d} className="unbutton" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F0EBE0', fontSize: 15 }}>
                  <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${d ? '#55704F' : '#C9C1B0'}`, background: d ? '#55704F' : '#fff', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}>{d ? '✓' : ''}</span>
                  <span style={{ color: d ? '#6E726A' : '#2C332D', textDecoration: d ? 'line-through' : 'none' }}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
