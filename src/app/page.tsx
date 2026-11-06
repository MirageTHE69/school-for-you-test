'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/AppProvider';
import SchoolCard from '@/components/SchoolCard';
import CompareSection from '@/components/CompareSection';
import { AGE, AREAS, BUDGETS, DEFAULT_F, FAQS, GALLERY, PREFS, SCHOOLS, TYPES, sortSchools } from '@/lib/data';

const H2 = { margin: 0, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.05, letterSpacing: '-.035em', fontWeight: 650 } as const;

function Hero() {
  const { f, setF } = useApp();
  const router = useRouter();
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallax(window.innerWidth < 820 ? 0 : Math.min(window.scrollY * 0.06, 30));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const float = { position: 'absolute', background: '#fff', boxShadow: '0 18px 40px -18px rgba(44,51,45,.3)', display: 'flex', zIndex: 2 } as const;

  return (
    <section className="wrap" style={{ paddingTop: 'clamp(28px,5vw,64px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, background: '#EEF3EC', color: '#3F5A3B', fontSize: 13, fontWeight: 600, padding: '7px 14px 7px 8px', borderRadius: 999 }}>
            <span style={{ width: 20, height: 20, borderRadius: 999, background: '#A8BFA3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#F4D77C' }} />
            </span>
            Big beginnings start here.
          </span>
          <h1 style={{ margin: 0, fontSize: 'clamp(44px,6.2vw,82px)', lineHeight: 1.02, letterSpacing: '-.04em', fontWeight: 650, textWrap: 'balance' }}>
            Find a little place where <span className="serif" style={{ color: '#C4532F' }}>big dreams</span> begin.
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, color: '#6E726A', maxWidth: 520, textWrap: 'pretty' }}>
            Discover trusted preschools around you. Explore classrooms, compare fees, understand facilities, and find the perfect first school for your little one.
          </p>
        </div>
        <div style={{ position: 'relative', padding: '20px 0 28px' }}>
          <div className="photo-tone" style={{ position: 'relative', aspectRatio: '5/5.2', borderRadius: '200px 200px 36px 36px', backgroundColor: '#E7EEE3', transform: `translateY(${parallax}px)`, transition: 'transform .1s linear' }}>
            <Image src="/images/hero-classroom.jpg" alt="A teacher reading a story to young children in a bright, colourful preschool classroom" fill priority sizes="(max-width: 960px) 100vw, 600px" style={{ objectFit: 'cover', objectPosition: '60% 50%' }} />
          </div>
          <div style={{ ...float, left: -12, top: '22%', borderRadius: 18, padding: '12px 16px', alignItems: 'center', gap: 10, animation: 'snyFloat 6s ease-in-out infinite' }}>
            <span style={{ width: 32, height: 32, borderRadius: 10, background: '#B9D0E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} /></span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>12 preschools near you</span>
          </div>
          <div style={{ ...float, right: -8, top: '52%', borderRadius: 18, padding: '12px 16px', flexDirection: 'column', gap: 2, animation: 'snyFloat 7s ease-in-out .8s infinite' }}>
            <span style={{ fontSize: 12, color: '#6E726A' }}>Fees starting from</span>
            <span style={{ fontSize: 16, fontWeight: 700 }}>₹35,000/year</span>
          </div>
          <div style={{ ...float, left: '12%', bottom: 6, borderRadius: 999, padding: '10px 16px 10px 10px', alignItems: 'center', gap: 10, animation: 'snyFloat 6.5s ease-in-out 1.6s infinite' }}>
            <span style={{ width: 26, height: 26, borderRadius: 999, background: '#A8BFA3', color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Verified school profiles</span>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); router.push('/explore'); }}
        style={{ marginTop: 'clamp(28px,4vw,48px)', background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, boxShadow: '0 30px 60px -36px rgba(44,51,45,.35)', padding: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 4, alignItems: 'stretch' }}
      >
        {[
          { label: 'City or area', key: 'area' as const, opts: ['All areas', ...AREAS], dot: { borderRadius: 999, background: '#A8BFA3' } },
          { label: "Child's age", key: 'age' as const, opts: Object.keys(AGE), dot: { borderRadius: 2, background: '#F4C6A8' } },
          { label: 'Preschool type', key: 'type' as const, opts: TYPES, dot: { transform: 'rotate(45deg)', background: '#B9D0E5' } },
          { label: 'Budget range', key: 'budget' as const, opts: BUDGETS, dot: { borderRadius: 999, background: '#F4D77C' } },
        ].map((fl) => (
          <label key={fl.key} className="search-field">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.02em', display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 8, height: 8, ...fl.dot }} />{fl.label}
            </span>
            <select value={f[fl.key]} onChange={(e) => setF(fl.key, e.target.value)}>
              {fl.opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        ))}
        <button type="submit" className="btn btn-terra" style={{ fontSize: 15, padding: '18px 26px', borderRadius: 20, minHeight: 56 }}>Explore Preschools</button>
      </form>
    </section>
  );
}

function ValueProps() {
  const items = [
    { bg: '#EEF3EC', dot: { width: 10, height: 10, borderRadius: 999, background: '#A8BFA3' }, text: 'Explore schools in your neighbourhood.' },
    { bg: '#FCEEE4', dot: { width: 10, height: 10, borderRadius: 2, background: '#F4C6A8' }, text: 'Compare complete fee structures.' },
    { bg: '#EAF1F8', dot: { width: 9, height: 9, transform: 'rotate(45deg)', background: '#B9D0E5' }, text: 'Discover facilities and learning programs.' },
    { bg: '#FBF4DC', dot: { width: 10, height: 10, borderRadius: 999, border: '2.5px solid #E2BE4E' }, text: 'Connect directly with schools.' },
  ];
  return (
    <section className="wrap" style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 28, borderTop: '1px solid #ECE6D9', paddingTop: 36 }}>
        {items.map((it) => (
          <div key={it.text} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 12, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={it.dot} /></span>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, fontWeight: 500 }}>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const [homeSort, setHomeSort] = useState('Recommended');
  const featured = sortSchools(SCHOOLS, homeSort).slice(0, 6);
  return (
    <section className="wrap" style={{ paddingBottom: 'clamp(64px,8vw,112px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 620 }}>
          <h2 style={H2}>Little schools. <span className="serif" style={{ color: '#55704F' }}>Big possibilities.</span></h2>
          <p style={{ margin: 0, fontSize: 17, color: '#6E726A', lineHeight: 1.55 }}>Explore thoughtfully selected preschools that match your child&apos;s needs.</p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Recommended', 'Fees: Low to High', 'Distance'].map((o) => {
            const on = homeSort === o;
            return (
              <button key={o} onClick={() => setHomeSort(o)} aria-pressed={on} style={{ border: `1px solid ${on ? '#2C332D' : '#E4DDCE'}`, cursor: 'pointer', background: on ? '#2C332D' : '#fff', color: on ? '#FFFCF7' : '#2C332D', fontSize: 13.5, fontWeight: 600, padding: '9px 14px', borderRadius: 999, transition: 'all .25s ease' }}>{o}</button>
            );
          })}
        </div>
      </div>
      <div className="card-grid">
        {featured.map((s, i) => <SchoolCard key={s.id + homeSort} s={s} index={i} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
        <Link href="/explore" className="btn btn-outline" style={{ fontSize: 15, padding: '14px 26px' }}>See all {SCHOOLS.length} preschools in Pune</Link>
      </div>
    </section>
  );
}

function BigDecision() {
  return (
    <section className="wrap" style={{ paddingTop: 'clamp(72px,9vw,128px)', paddingBottom: 'clamp(72px,9vw,128px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,6vw,88px)', alignItems: 'center' }}>
        <div className="photo-tone" style={{ position: 'relative', aspectRatio: '4/3.4', borderRadius: '36px 36px 36px 160px', backgroundColor: '#FCEEE4' }}>
          <Image src="/images/parent-child.jpg" alt="A mother walking her daughter, backpack on, to school on a sunny morning" fill sizes="(max-width: 900px) 100vw, 600px" style={{ objectFit: 'cover', objectPosition: '50% 62%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <h2 style={{ ...H2, fontSize: 'clamp(34px,4.4vw,58px)', lineHeight: 1.04, textWrap: 'balance' }}>
            Because their first school is a <span className="serif" style={{ color: '#C4532F' }}>big little decision.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 'clamp(17px,1.5vw,20px)', lineHeight: 1.6, color: '#6E726A', maxWidth: 520, textWrap: 'pretty' }}>
            We know choosing a preschool is more than finding a classroom. It is finding a place where your child feels safe, curious, confident, and loved.
          </p>
        </div>
      </div>
    </section>
  );
}

function Preferences() {
  const { setFilters, setSort } = useApp();
  const router = useRouter();
  const [prefs, setPrefs] = useState<string[]>(['Montessori learning', 'Daycare support']);
  const findMatch = () => {
    const type = prefs.includes('Montessori learning') && !prefs.includes('Play-based learning') ? 'Montessori'
      : prefs.includes('Play-based learning') && !prefs.includes('Montessori learning') ? 'Play-based' : 'All types';
    setFilters({ ...DEFAULT_F, type, daycare: prefs.includes('Daycare support') || prefs.includes('Flexible timings'), meals: prefs.includes('Healthy meals'), small: prefs.includes('Smaller classrooms') });
    setSort('Recommended');
    router.push('/explore');
  };
  return (
    <section className="wrap" style={{ paddingBottom: 'clamp(72px,9vw,128px)' }}>
      <div style={{ background: '#EEF3EC', borderRadius: 36, padding: 'clamp(32px,5vw,64px)', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600 }}>
            <h2 style={{ ...H2, fontSize: 'clamp(30px,3.6vw,46px)', lineHeight: 1.06 }}>Your child&apos;s needs. <span className="serif" style={{ color: '#3F5A3B' }}>Your family&apos;s priorities.</span></h2>
            <p style={{ margin: 0, fontSize: 16, color: '#55604F', lineHeight: 1.55 }}>Pick what matters to you. We&apos;ll filter schools to match.</p>
          </div>
          <button onClick={findMatch} className="btn btn-terra" style={{ fontSize: 15, padding: '15px 24px' }}>Find My Match{prefs.length ? ` (${prefs.length})` : ''}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap: 12 }}>
          {PREFS.map((l) => {
            const on = prefs.includes(l);
            return (
              <button
                key={l}
                onClick={() => setPrefs((p) => (on ? p.filter((x) => x !== l) : [...p, l]))}
                aria-pressed={on}
                className="hover-border"
                style={{ cursor: 'pointer', textAlign: 'left', border: `1.5px solid ${on ? '#2C332D' : 'transparent'}`, background: on ? '#fff' : 'rgba(255,255,255,.45)', color: '#2C332D', borderRadius: 22, padding: 20, minHeight: 116, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, transition: 'all .3s cubic-bezier(.2,.7,.2,1)', transform: `translateY(${on ? -2 : 0}px)` }}
              >
                <span style={{ width: 28, height: 28, borderRadius: 999, border: `1.5px solid ${on ? '#55704F' : '#9FB39A'}`, background: on ? '#55704F' : 'transparent', color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}>{on ? '✓' : ''}</span>
                <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.01em' }}>{l}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [['01', '#A8BFA3', 'Discover preschools around you.'], ['02', '#C4532F', 'Compare fees, facilities, and programs.'], ['03', '#8FB0CF', 'Connect with schools and plan a visit.']];
  return (
    <section id="how" className="wrap" style={{ paddingBottom: 'clamp(72px,9vw,128px)' }}>
      <h2 style={{ ...H2, margin: '0 0 40px', maxWidth: 720 }}>Less searching. <span className="serif" style={{ color: '#55704F' }}>More confident choosing.</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20 }}>
        {steps.map(([n, c, t]) => (
          <div key={n} style={{ borderTop: '2px solid #2C332D', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1, color: c }}>{n}</span>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-.015em', lineHeight: 1.35 }}>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="wrap" style={{ paddingBottom: 'clamp(72px,9vw,128px)' }}>
      <h2 style={{ ...H2, margin: '0 0 36px' }}>See beyond <span className="serif" style={{ color: '#55704F' }}>the classroom.</span></h2>
      <div className="gallery-grid">
        {GALLERY.map((g) => (
          <div key={g.label} className={`photo-tone${g.span === 2 ? ' span-2' : ''}`} style={{ position: 'relative', borderRadius: 24, backgroundColor: g.tone }}>
            <Image src={g.src} alt={g.alt} fill sizes="(max-width: 700px) 100vw, 420px" style={{ objectFit: 'cover', transition: 'transform .9s cubic-bezier(.2,.7,.2,1)' }} />
            <span style={{ position: 'absolute', left: 14, bottom: 14, background: 'rgba(255,252,247,.94)', padding: '7px 13px', borderRadius: 999, fontSize: 13, fontWeight: 600, pointerEvents: 'none' }}>{g.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ maxWidth: 980, margin: '0 auto', padding: '0 clamp(16px,4vw,40px) clamp(72px,9vw,128px)' }}>
      <h2 style={{ ...H2, margin: '0 0 32px' }}>Questions <span className="serif" style={{ color: '#55704F' }}>every parent asks.</span></h2>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E4DDCE' }}>
        {FAQS.map(([q, a], i) => {
          const on = open === i;
          return (
            <div key={q} style={{ borderBottom: '1px solid #E4DDCE' }}>
              <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="unbutton" style={{ width: '100%', padding: '22px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, fontSize: 'clamp(16px,1.5vw,19px)', fontWeight: 600, letterSpacing: '-.01em' }}>
                {q}
                <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: on ? '#F4D77C' : '#F1ECE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 400, transform: `rotate(${on ? 45 : 0}deg)`, transition: 'transform .3s ease, background .3s' }}>+</span>
              </button>
              {on && <p style={{ margin: 0, padding: '0 56px 24px 4px', fontSize: 16, lineHeight: 1.65, color: '#6E726A', animation: 'snyIn .35s ease both', textWrap: 'pretty' }}>{a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function OwnerCta() {
  return (
    <section className="wrap" style={{ paddingBottom: 'clamp(72px,9vw,112px)' }}>
      <div style={{ background: '#C4532F', color: '#fff', borderRadius: 36, padding: 'clamp(36px,5vw,64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 620 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#FBE3D6', letterSpacing: '.04em', textTransform: 'uppercase' }}>For preschool owners</span>
          <h3 style={{ margin: 0, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.08, letterSpacing: '-.03em', fontWeight: 650 }}>Help more parents discover your preschool.</h3>
        </div>
        <Link href="/list-your-preschool" className="btn btn-butter" style={{ fontSize: 15, padding: '16px 26px' }}>List Your Preschool</Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="fade-in">
      <Hero />
      <ValueProps />
      <Featured />
      <CompareSection />
      <BigDecision />
      <Preferences />
      <HowItWorks />
      <Gallery />
      <Faq />
      <OwnerCta />
    </div>
  );
}
