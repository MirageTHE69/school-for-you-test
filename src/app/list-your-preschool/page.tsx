'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { SchoolCardView } from '@/components/SchoolCard';
import { AREAS, fmt } from '@/lib/data';

const T = '#C4532F';
const LIST0 = { name: '', owner: '', phone: '', email: '', area: '', curriculum: 'Montessori', ageMin: '1.5', ageMax: '5', timings: '9:00 am – 12:30 pm', fee: '', adm: '', annual: '', books: '', about: '', fac: ['CCTV'] as string[] };
type LD = typeof LIST0;
const STEPS = ['School details', 'Programs & fees', 'Facilities & photos', 'Review'];
const FACS = ['Daycare', 'Meals', 'Transport', 'CCTV', 'Outdoor play area', 'Small classes'];
const PHOTO_SLOTS = [['Cover photo', '#C9D8C5'], ['Classroom', '#F6D5BF'], ['Outdoor play', '#F7E4A6'], ['Activity room', '#CFDDEB']];
const AGES = ['1.5', '2', '2.5', '3', '4', '5', '6'];
const num = (v: string) => +String(v).replace(/[^0-9]/g, '') || 0;
const amt = (v: string) => (num(v) ? fmt(num(v)) : '—');
const Req = () => <span style={{ color: T }}>*</span>;

function StepHead({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T }}>Step {n} of 4</span>
      <span style={{ fontSize: 'clamp(22px,2.4vw,28px)', fontWeight: 650, letterSpacing: '-.025em' }}>{title}</span>
      <span style={{ fontSize: 14.5, color: '#6E726A' }}>{sub}</span>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} style={{ border: `1px solid ${on ? '#2C332D' : '#E4DDCE'}`, cursor: 'pointer', background: on ? '#2C332D' : '#fff', color: on ? '#FFFCF7' : '#2C332D', fontSize: 14, fontWeight: 600, padding: '11px 16px', borderRadius: 999, minHeight: 44, transition: 'all .25s' }}>
      {children}
    </button>
  );
}

export default function ListPage() {
  const { flash, setAccount } = useApp();
  const router = useRouter();
  const [ld, setLd] = useState<LD>({ ...LIST0 });
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null]);

  // Release uploaded photo URLs when the page unmounts (replacements are released in pickPhoto).
  const photosRef = useRef(photos);
  useEffect(() => { photosRef.current = photos; }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => p && URL.revokeObjectURL(p)), []);

  const set = (k: keyof LD) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setLd((s) => ({ ...s, [k]: v }));
  };
  const canNext = step === 0 ? !!(ld.name.trim() && ld.owner.trim() && ld.phone.trim()) : step === 1 ? num(ld.fee) > 0 : step === 3 ? agree : true;
  const next = () => {
    if (!canNext) return flash(step === 3 ? 'Please confirm the details are accurate.' : 'Please fill in the required fields.');
    if (step === 3) setDone(true);
    else setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const reset = () => {
    photos.forEach((p) => p && URL.revokeObjectURL(p));
    setLd({ ...LIST0 }); setStep(0); setDone(false); setAgree(false); setPhotos([null, null, null, null]);
    window.scrollTo({ top: 0 });
  };
  const pickPhoto = (i: number, file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPhotos((p) => p.map((x, j) => {
      if (j !== i) return x;
      if (x) URL.revokeObjectURL(x);
      return url;
    }));
  };

  const reviewRows: [string, string][] = [
    ['Preschool', ld.name || '—'], ['Contact', [ld.owner, ld.phone].filter(Boolean).join(' · ') || '—'], ['Email', ld.email || '—'], ['Area', ld.area || '—'],
    ['Curriculum', ld.curriculum], ['Ages', `${ld.ageMin} – ${ld.ageMax} yrs`], ['Timings', ld.timings || '—'], ['Tuition fee', amt(ld.fee)],
    ['Admission fee', amt(ld.adm)], ['Annual charges', amt(ld.annual)], ['Books and uniform', amt(ld.books)], ['Facilities', ld.fac.join(', ') || '—'],
    ['Photos', `${photos.filter(Boolean).length} of 4 added`],
  ];

  const money = (k: 'fee' | 'adm' | 'annual' | 'books', label: string, req = false) => (
    <label className="field">
      <span>{label} {req && <Req />}</span>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6E726A', fontSize: 15 }}>₹</span>
        <input value={ld[k]} onChange={set(k)} inputMode="numeric" placeholder="0" className="input" style={{ paddingLeft: 30 }} />
      </div>
    </label>
  );

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(28px,4vw,48px)', paddingBottom: 96, animation: 'snyIn .5s ease both', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 720 }}>
        <Link href="/for-schools" style={{ alignSelf: 'flex-start', color: '#6E726A', fontSize: 14, fontWeight: 500, padding: '4px 0', textDecoration: 'none' }}>← For Schools</Link>
        <h1 style={{ margin: 0, fontSize: 'clamp(34px,4.6vw,58px)', lineHeight: 1.03, letterSpacing: '-.04em', fontWeight: 650 }}>List your <span className="serif" style={{ color: T }}>preschool</span></h1>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: '#6E726A' }}>Four short steps. Your profile goes live after a review by our team.</p>
      </div>

      {!done && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STEPS.map((l, i) => {
            const isDone = i < step, cur = i === step;
            return (
              <button key={l} onClick={() => i < step && setStep(i)} style={{ border: `1px solid ${cur ? T : '#ECE6D9'}`, cursor: i < step ? 'pointer' : 'default', background: cur ? '#FDF3EE' : '#fff', color: '#2C332D', padding: '7px 16px 7px 7px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, transition: 'all .3s' }}>
                <span style={{ width: 28, height: 28, borderRadius: 999, background: isDone ? '#55704F' : cur ? T : '#fff', color: isDone || cur ? '#fff' : '#6E726A', border: `1.5px solid ${isDone ? '#55704F' : cur ? T : '#D9D1C0'}`, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}>{isDone ? '✓' : i + 1}</span>
                <span style={{ color: cur || isDone ? '#2C332D' : '#6E726A', whiteSpace: 'nowrap' }}>{l}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="two-col list">
        <div style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, padding: 'clamp(22px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
          {!done && step === 0 && (
            <div key="s0" style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'snyIn .35s ease both' }}>
              <StepHead n={1} title="School details" sub="Basic information parents and our team use to reach you." />
              <label className="field"><span>Preschool name <Req /></span><input value={ld.name} onChange={set('name')} placeholder="e.g. Little Acorn Montessori" className="input" /></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 14 }}>
                <label className="field"><span>Your name <Req /></span><input value={ld.owner} onChange={set('owner')} className="input" autoComplete="name" /></label>
                <label className="field"><span>Phone <Req /></span><input value={ld.phone} onChange={set('phone')} placeholder="+91" type="tel" className="input" autoComplete="tel" /></label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 14 }}>
                <label className="field">Email<input value={ld.email} onChange={set('email')} type="email" className="input" autoComplete="email" /></label>
                <label className="field">Area
                  <select value={ld.area} onChange={set('area')} className="input">
                    <option value="">Select area</option>
                    {AREAS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              </div>
            </div>
          )}

          {!done && step === 1 && (
            <div key="s1" style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'snyIn .35s ease both' }}>
              <StepHead n={2} title="Programs & fees" sub="Parents compare these side by side, so be complete." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Curriculum</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Montessori', 'Play-based', 'Reggio Emilia', 'Waldorf', 'Blended'].map((c) => (
                    <Chip key={c} on={ld.curriculum === c} onClick={() => setLd((s) => ({ ...s, curriculum: c }))}>{c}</Chip>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 14 }}>
                <label className="field">Ages from<select value={ld.ageMin} onChange={set('ageMin')} className="input">{AGES.map((o) => <option key={o} value={o}>{o} yrs</option>)}</select></label>
                <label className="field">Ages up to<select value={ld.ageMax} onChange={set('ageMax')} className="input">{AGES.map((o) => <option key={o} value={o}>{o} yrs</option>)}</select></label>
                <label className="field">Class timings<input value={ld.timings} onChange={set('timings')} className="input" /></label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 14 }}>
                {money('fee', 'Annual tuition fee', true)}
                {money('adm', 'Admission fee')}
                {money('annual', 'Annual charges')}
                {money('books', 'Books and uniform')}
              </div>
              <div style={{ background: '#2C332D', color: '#FFFCF7', borderRadius: 18, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Estimated first-year total</span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>{fmt(num(ld.fee) + num(ld.adm) + num(ld.annual) + num(ld.books))}</span>
              </div>
            </div>
          )}

          {!done && step === 2 && (
            <div key="s2" style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'snyIn .35s ease both' }}>
              <StepHead n={3} title="Facilities & photos" sub="Show parents what a day at your school looks like." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Facilities</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {FACS.map((c) => {
                    const on = ld.fac.includes(c);
                    return <Chip key={c} on={on} onClick={() => setLd((s) => ({ ...s, fac: on ? s.fac.filter((x) => x !== c) : [...s.fac, c] }))}>{on ? '✓ ' : ''}{c}</Chip>;
                  })}
                </div>
              </div>
              <label className="field">About your school<textarea rows={4} value={ld.about} onChange={set('about')} placeholder="Your approach, your teachers, what makes your school special." className="input" style={{ resize: 'vertical' }} /></label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Photos <span style={{ fontWeight: 500, color: '#6E726A' }}>· click a box or drop an image onto it</span></span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))', gap: 10 }}>
                  {PHOTO_SLOTS.map(([label, tone], i) => (
                    <label
                      key={label}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); pickPhoto(i, e.dataTransfer.files[0]); }}
                      className="photo-tone"
                      style={{ aspectRatio: '4/3', borderRadius: 16, backgroundColor: tone, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: photos[i] ? `url(${photos[i]})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <input type="file" accept="image/*" onChange={(e) => pickPhoto(i, e.target.files?.[0])} style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} />
                      <span style={{ background: 'rgba(255,252,247,.92)', padding: '6px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {photos[i] ? '✓ ' : '+ '}{label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!done && step === 3 && (
            <div key="s3" style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'snyIn .35s ease both' }}>
              <StepHead n={4} title="Review" sub="Check everything before sending it to our team." />
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #F0EBE0' }}>
                {reviewRows.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderBottom: '1px solid #F0EBE0', fontSize: 14.5 }}>
                    <span style={{ color: '#6E726A' }}>{k}</span><span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setAgree((a) => !a)} aria-pressed={agree} className="unbutton" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14.5, lineHeight: 1.5 }}>
                <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${agree ? '#55704F' : '#C9C1B0'}`, background: agree ? '#55704F' : '#fff', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}>{agree ? '✓' : ''}</span>
                I confirm these details are accurate and I&apos;m authorised to list this preschool.
              </button>
            </div>
          )}

          {!done && (
            <div style={{ display: 'flex', gap: 10, borderTop: '1px solid #F0EBE0', paddingTop: 20, alignItems: 'center' }}>
              {step > 0 && <button onClick={() => setStep(step - 1)} className="btn btn-outline" style={{ fontSize: 15, padding: '14px 22px' }}>Back</button>}
              <button onClick={next} className="btn" style={{ marginLeft: 'auto', background: canNext ? T : '#D9CFC4', color: '#fff', fontSize: 15, padding: '15px 26px', transition: 'transform .2s, background .25s' }}>
                {step === 3 ? 'Submit for review' : 'Continue'}
              </button>
            </div>
          )}

          {done && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', animation: 'snyIn .4s ease both' }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: T, color: '#fff', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 650, letterSpacing: '-.025em' }}>Submitted for review</span>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#6E726A' }}>
                  Thanks, {ld.owner.trim().split(' ')[0] || 'there'}. We&apos;ll review {ld.name || 'your preschool'} and contact you on {ld.phone || ld.email || 'your number'} when it&apos;s live.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', borderTop: '1px solid #F0EBE0' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F0EBE0', fontSize: 15 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: '#55704F', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span><span style={{ fontWeight: 600 }}>Profile submitted</span>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F0EBE0', fontSize: 15 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, border: `2px solid ${T}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 8, height: 8, borderRadius: 999, background: T }} /></span>
                  <span style={{ fontWeight: 600 }}>Platform review</span><span style={{ marginLeft: 'auto', fontSize: 13, color: '#6E726A' }}>In progress</span>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F0EBE0', fontSize: 15, color: '#6E726A' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, border: '1.5px solid #D9D1C0' }} /><span>Profile live for parents</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => { setAccount('School'); router.push('/dashboard'); }} className="btn btn-terra" style={{ fontSize: 15, padding: '14px 22px' }}>Go to your dashboard</button>
                <button onClick={reset} className="btn btn-outline" style={{ fontSize: 15, padding: '14px 22px' }}>List another school</button>
              </div>
            </div>
          )}
        </div>

        <aside className="sticky-aside">
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6E726A' }}>Live preview</span>
          <SchoolCardView
            d={{
              name: ld.name || 'Your preschool name', area: ld.area || 'Your area', km: '—', curriculum: ld.curriculum, ages: `${ld.ageMin} – ${ld.ageMax} yrs`,
              facilities: ld.fac.slice(0, 4), feeLabel: num(ld.fee) ? fmt(num(ld.fee)) : '₹ —', tone: '#C9D8C5', photo: photos[0],
            }}
          />
          <span style={{ fontSize: 13, color: '#6E726A', lineHeight: 1.5 }}>How your school appears in parent search results.</span>
        </aside>
      </div>
    </div>
  );
}
