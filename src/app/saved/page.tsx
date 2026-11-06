'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/AppProvider';
import SchoolCard from '@/components/SchoolCard';
import { getSchool, type School } from '@/lib/data';

export default function SavedPage() {
  const { fav, setCmp } = useApp();
  const router = useRouter();
  const list = fav.map(getSchool).filter(Boolean) as School[];

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(28px,4vw,48px)', paddingBottom: 96, animation: 'snyIn .5s ease both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#6E726A' }}><Link href="/" style={{ color: '#6E726A' }}>Home</Link> / Saved</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 650 }}>Your <span className="serif" style={{ color: '#C4532F' }}>shortlist</span></h1>
          <span style={{ fontSize: 15, color: '#6E726A' }}>{list.length} {list.length === 1 ? 'school saved' : 'schools saved'}</span>
        </div>
        {list.length > 1 && (
          <button onClick={() => { setCmp(fav.slice(0, 3)); router.push('/#compare'); }} className="btn btn-terra" style={{ fontSize: 14, padding: '13px 20px' }}>Compare saved schools</button>
        )}
      </div>
      {list.length > 0 ? (
        <div className="card-grid">
          {list.map((s, i) => <SchoolCard key={s.id} s={s} index={i} />)}
        </div>
      ) : (
        <div style={{ border: '1.5px dashed #E7B7A6', background: '#FDF3EE', borderRadius: 28, padding: '64px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <span style={{ fontSize: 32, color: '#C4532F' }}>♡</span>
          <span className="serif" style={{ fontSize: 32 }}>Nothing saved yet.</span>
          <p style={{ margin: 0, color: '#6E726A', fontSize: 15 }}>Tap the heart on any school to keep it here.</p>
          <Link href="/explore" className="btn btn-dark" style={{ fontSize: 14, padding: '12px 20px' }}>Explore preschools</Link>
        </div>
      )}
    </div>
  );
}
