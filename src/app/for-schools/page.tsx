'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { AREAS, OWNER } from '@/lib/data';

const H2 = { margin: 0, fontSize: 'clamp(30px,3.8vw,48px)', lineHeight: 1.06, letterSpacing: '-.035em', fontWeight: 650 } as const;

export default function ForSchoolsPage() {
  const { openModal, setAccount } = useApp();
  const router = useRouter();
  const [sent, setSent] = useState(false);

  return (
    <div style={{ animation: 'snyIn .5s ease both' }}>
      <section className="wrap" style={{ paddingTop: 'clamp(40px,6vw,88px)', paddingBottom: 'clamp(40px,6vw,88px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span style={{ alignSelf: 'flex-start', background: '#FBF4DC', color: '#6B5413', fontSize: 13, fontWeight: 700, padding: '7px 14px', borderRadius: 999 }}>For preschool owners</span>
            <h1 style={{ margin: 0, fontSize: 'clamp(40px,5.6vw,74px)', lineHeight: 1.02, letterSpacing: '-.04em', fontWeight: 650, textWrap: 'balance' }}>
              Help more parents <span className="serif" style={{ color: '#55704F' }}>discover</span> your preschool.
            </h1>
            <p style={{ margin: 0, fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, color: '#6E726A', maxWidth: 520 }}>Showcase your school, share your programs, and connect with families looking for the right beginning.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/list-your-preschool" className="btn btn-dark" style={{ fontSize: 15, padding: '16px 26px' }}>List Your Preschool</Link>
              <button onClick={() => openModal('login')} className="btn btn-outline" style={{ fontSize: 15, padding: '15px 24px' }}>School login</button>
            </div>
          </div>
          <div className="photo-tone" style={{ position: 'relative', aspectRatio: '5/4.4', borderRadius: '36px 160px 36px 36px', backgroundColor: '#FBF4DC' }}>
            <Image src="/images/owner-hero.jpg" alt="A smiling preschool teacher in her classroom, showing a child's drawing" fill priority sizes="(max-width: 960px) 100vw, 600px" style={{ objectFit: 'cover', objectPosition: '40% 50%' }} />
          </div>
        </div>
      </section>

      <section style={{ background: '#F7F3EA', padding: 'clamp(64px,8vw,104px) 0' }}>
        <div className="wrap">
          <h2 style={{ ...H2, margin: '0 0 36px', maxWidth: 640 }}>Everything you need to <span className="serif" style={{ color: '#55704F' }}>welcome new families.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16 }}>
            {OWNER.map(([title, text, tone]) => (
              <div key={title} className="lift" style={{ background: '#fff', borderRadius: 24, padding: 26, display: 'flex', flexDirection: 'column', gap: 18, border: '1px solid #ECE6D9', transition: 'transform .3s, box-shadow .3s' }}>
                <span style={{ width: 40, height: 40, borderRadius: 14, background: tone, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} /></span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-.015em' }}>{title}</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#6E726A' }}>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="wrap" style={{ paddingTop: 'clamp(64px,8vw,104px)', paddingBottom: 'clamp(64px,8vw,104px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2 style={H2}>Live in <span className="serif" style={{ color: '#55704F' }}>three steps.</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[['1', '#A8BFA3', 'Register your preschool.'], ['2', '#C4532F', 'Add school details and fees.'], ['3', '#8FB0CF', 'Publish your profile after platform review.']].map(([n, c, t], i) => (
                <div key={n} style={{ display: 'flex', gap: 18, padding: '20px 0', borderTop: '1px solid #E4DDCE', borderBottom: i === 2 ? '1px solid #E4DDCE' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 40, lineHeight: 1, color: c, width: 48 }}>{n}</span>
                  <span style={{ fontSize: 18, fontWeight: 600, paddingTop: 6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, padding: 'clamp(24px,3vw,36px)', boxShadow: '0 30px 60px -40px rgba(44,51,45,.35)' }}>
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontSize: 20, fontWeight: 650, letterSpacing: '-.015em', marginBottom: 4 }}>Register your preschool</span>
                <label className="field">Preschool name<input required placeholder="e.g. Little Acorn Montessori" className="input" /></label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 12 }}>
                  <label className="field">Your name<input required className="input" autoComplete="name" /></label>
                  <label className="field">Phone<input required type="tel" placeholder="+91" className="input" autoComplete="tel" /></label>
                </div>
                <label className="field">Email<input required type="email" className="input" autoComplete="email" /></label>
                <label className="field">Area
                  <select required className="input" defaultValue="">
                    <option value="">Select area</option>
                    {AREAS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <button type="submit" className="btn btn-dark" style={{ fontSize: 15, padding: 16, marginTop: 6 }}>List Your Preschool</button>
                <span style={{ fontSize: 12.5, color: '#6E726A', textAlign: 'center' }}>Profiles go live after a review by our team.</span>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', padding: '20px 0', animation: 'snyIn .4s ease both' }}>
                <span style={{ width: 48, height: 48, borderRadius: 999, background: '#A8BFA3', color: '#fff', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                <span style={{ fontSize: 24, fontWeight: 650, letterSpacing: '-.02em' }}>Registration received.</span>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6E726A' }}>Next, add your school details and fee structure. We&apos;ll review your profile before it goes live.</p>
                <button onClick={() => { setAccount('School'); router.push('/dashboard'); }} className="btn btn-terra" style={{ fontSize: 14, padding: '12px 20px' }}>Go to your dashboard</button>
                <button onClick={() => setSent(false)} className="btn btn-outline" style={{ fontSize: 14, padding: '12px 20px' }}>Register another school</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
