'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { fmt, getSchool, PHIL } from '@/lib/data';
import { useApp } from './AppProvider';

const H2 = { margin: 0, fontSize: 24, letterSpacing: '-.025em', fontWeight: 650 } as const;
const label = { fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6E726A' } as const;

export default function SchoolProfile({ id }: { id: string }) {
  const sc = getSchool(id)!;
  const { fav, cmp, toggleFav, toggleCmp, openModal } = useApp();
  const [pfaq, setPfaq] = useState(-1);
  const isFav = fav.includes(sc.id);
  const isCmp = cmp.includes(sc.id);

  const groups = ([['Playgroup', '1.5 – 2.5 yrs', 1.5], ['Nursery', '2.5 – 3.5 yrs', 2.5], ['LKG', '3.5 – 4.5 yrs', 3.5], ['UKG', '4.5 – 6 yrs', 4.5]] as const)
    .filter((g) => g[2] >= sc.ageMin - 0.01 && g[2] < sc.ageMax);
  const faqs = [
    ['When do admissions open?', `Admissions for the June batch typically open between November and February. ${sc.name} currently shows: ${sc.availability}.`],
    ['Is there a settling-in period?', 'Yes. New children usually attend shorter days for the first one to two weeks, with a parent nearby on the first days.'],
    ['Can fees be paid in instalments?', 'Tuition can usually be paid in two or four instalments. One-time fees are paid at admission.'],
    ['What should my child bring?', 'A water bottle, a change of clothes and a small bag. ' + (sc.meals ? 'Meals and snacks are provided.' : 'Please send a healthy snack box.')],
  ];
  const firstYear = sc.fee + sc.annual + sc.books + 2000 + sc.adm + 10000;
  const availBg = sc.availability === 'Open' ? '#EEF3EC' : sc.availability === 'Few seats' ? '#FBF4DC' : '#FCEEE4';
  const feeRecurring = [
    ['Tuition fee', fmt(sc.fee)], ['Annual charges', fmt(sc.annual)], ['Books and uniform', fmt(sc.books)],
    ['Meals', sc.meals ? 'Included in tuition' : 'Not provided'], ['Transport (optional)', sc.transport ? 'From ₹2,500/month' : 'Not offered'],
    ['Daycare (optional)', sc.daycare ? 'From ₹4,000/month' : 'Not offered'],
  ];
  const feeOnce = [['Registration fee', fmt(2000)], ['Admission fee', fmt(sc.adm)], ['Caution deposit (refundable)', fmt(10000)]];
  const info = [
    ['Class timings', sc.timings, '#A8BFA3'], ['Daycare and extended care', sc.daycare ? sc.dcHours : 'Not offered', '#F4C6A8'],
    ['Meals and nutrition', sc.meals ? 'Freshly cooked snack and lunch' : 'Bring a snack box from home', '#F4D77C'],
    ['Transport', sc.transport ? 'Vans with attendant, within 6 km' : 'Not offered', '#B9D0E5'],
    ['Teacher-student ratio', sc.ratio, '#D7C8E8'], ['Admission availability', sc.availability, '#A8BFA3'],
  ];
  const safety: [string, boolean][] = [['CCTV in classrooms', sc.cctv], [`Outdoor play: ${sc.outdoor}`, true], ['Background-verified staff', sc.verified], ['First-aid trained teachers', true], ['Secure pick-up with ID cards', true]];
  const activities = sc.indoor.split(/, | and /).concat(['Outdoor play', 'Circle time', 'Festivals and celebrations']);
  const reviews = [
    { stars: '★★★★★', text: 'Our daughter settled in within two weeks. The teachers share small updates every day, which helped us a lot.', by: 'Parent of a Nursery child' },
    { stars: '★★★★☆', text: 'Warm staff and a clean, calm space. Pick-up can get busy, but the school manages it well.', by: 'Parent of a Playgroup child' },
  ];
  const thumbTones = ['#F6D5BF', '#F7E4A6', '#E2D7EE', '#CFDDEB'];
  const mapQ = encodeURIComponent(`${sc.area}, Pune, Maharashtra`);

  return (
    <>
      <div className="wrap" style={{ paddingTop: 'clamp(20px,3vw,36px)', paddingBottom: 120, animation: 'snyIn .5s ease both' }}>
        <Link href="/explore" style={{ display: 'inline-block', color: '#6E726A', fontSize: 14, fontWeight: 500, padding: '8px 0', marginBottom: 12, textDecoration: 'none' }}>← Back to all preschools</Link>

        <div className="profile-gallery">
          <div className="main photo-tone" style={{ backgroundColor: sc.tone }}>
            <Image src={sc.cover} alt={`${sc.name} — main classroom`} fill priority sizes="(max-width: 820px) 100vw, 640px" style={{ objectFit: 'cover' }} />
          </div>
          {sc.photos.map((p, i) => (
            <div key={p.src} className="photo-tone" style={{ backgroundColor: thumbTones[i] }}>
              <Image src={p.src} alt={`${sc.name} — ${p.label.toLowerCase()}`} fill sizes="(max-width: 820px) 50vw, 320px" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <div className="two-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sc.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EEF3EC', color: '#3F5A3B', padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700 }}>
                    <span style={{ width: 15, height: 15, borderRadius: 999, background: '#A8BFA3', color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>Verified profile
                  </span>
                )}
                <span style={{ background: '#F7F3EA', padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600 }}>{sc.curriculum}</span>
                <span style={{ background: availBg, padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600 }}>{sc.availability}</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.04em', fontWeight: 650, textWrap: 'balance' }}>{sc.name}</h1>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, color: '#6E726A' }}>{sc.area}, Pune · {sc.km} km away{sc.rating ? ` · ★ ${sc.rating} (${sc.reviews} reviews)` : ''}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleFav(sc.id)} aria-pressed={isFav} className="btn btn-outline" style={{ fontSize: 14, padding: '10px 16px', minHeight: 44 }}>
                    <span style={{ color: isFav ? '#C4532F' : '#2C332D', fontSize: 16, transform: `scale(${isFav ? 1.08 : 1})`, transition: 'transform .3s cubic-bezier(.3,1.6,.5,1)' }}>{isFav ? '♥' : '♡'}</span>{isFav ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => toggleCmp(sc.id)} aria-pressed={isCmp} className="btn btn-outline" style={{ fontSize: 14, padding: '10px 16px', minHeight: 44, background: isCmp ? '#EEF3EC' : '#fff', transition: 'background .25s' }}>
                    <span style={{ width: 16, height: 16, borderRadius: 5, border: `1.5px solid ${isCmp ? '#55704F' : '#C9C1B0'}`, background: isCmp ? '#55704F' : '#fff', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isCmp ? '✓' : ''}</span>Compare
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={H2}>About the school</h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#4B5149', textWrap: 'pretty' }}>
                {sc.name} is a {sc.curriculum.toLowerCase()} preschool in {sc.area}, Pune, for children aged {sc.ages}. Small groups, a calm daily rhythm and plenty of time outdoors help children settle in and grow in confidence. Families are welcome to visit and see a morning session before applying.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16 }}>
              <div style={{ background: '#F7F3EA', borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={label}>Curriculum &amp; philosophy</span>
                <span style={{ fontSize: 19, fontWeight: 650 }}>{sc.curriculum}</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#4B5149' }}>{PHIL[sc.curriculum]}</p>
              </div>
              <div style={{ background: '#F7F3EA', borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={label}>Age groups</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {groups.map((g) => (
                    <div key={g[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, padding: '8px 0', borderBottom: '1px solid #E9E2D3' }}>
                      <span style={{ fontWeight: 600 }}>{g[0]}</span><span style={{ color: '#6E726A' }}>{g[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <h2 style={H2}>Complete fee structure</h2><span style={{ fontSize: 13, color: '#6E726A' }}>Academic year 2026–27 · sample data</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
                {[
                  { title: 'Recurring · every year', bg: '#EEF3EC', dot: { borderRadius: 999, background: '#A8BFA3' }, rows: feeRecurring },
                  { title: 'One-time · at admission', bg: '#FCEEE4', dot: { borderRadius: 2, background: '#F4C6A8' }, rows: feeOnce },
                ].map((t) => (
                  <div key={t.title} style={{ border: '1px solid #ECE6D9', borderRadius: 22, overflow: 'hidden', background: '#fff' }}>
                    <div style={{ padding: '16px 20px', background: t.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{t.title}</span><span style={{ width: 10, height: 10, ...t.dot }} />
                    </div>
                    {t.rows.map(([l, a]) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '14px 20px', borderTop: '1px solid #F3EFE6', fontSize: 15 }}>
                        <span>{l}</span><span style={{ fontWeight: 650, textAlign: 'right' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ background: '#2C332D', color: '#FFFCF7', borderRadius: 22, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>Estimated first-year total</span>
                  <span style={{ fontSize: 13, color: '#C8CDC5' }}>Excludes optional transport and daycare</span>
                </div>
                <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>{fmt(firstYear)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h2 style={H2}>Daily life at school</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 12 }}>
                {info.map(([l, v, dot]) => (
                  <div key={l} style={{ border: '1px solid #ECE6D9', borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 8, background: '#fff' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: dot }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#6E726A' }}>{l}</span>
                    <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 style={H2}>Facilities &amp; safety</h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {safety.map(([l, ok]) => (
                    <div key={l} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F0EBE0', fontSize: 15 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 999, background: ok ? '#A8BFA3' : '#D9D1C0', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{ok ? '✓' : '–'}</span>
                      <span style={{ color: ok ? '#2C332D' : '#6E726A' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 style={H2}>Activities &amp; programs</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {activities.map((a) => <span key={a} style={{ background: '#F7F3EA', padding: '9px 14px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>{a}</span>)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <h2 style={H2}>Parent reviews</h2>
                {sc.rating && <span style={{ fontSize: 14, fontWeight: 600 }}>★ {sc.rating} · {sc.reviews} reviews</span>}
              </div>
              {sc.rating ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
                  {reviews.map((r) => (
                    <div key={r.by} style={{ border: '1px solid #ECE6D9', borderRadius: 22, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
                      <span style={{ fontSize: 14, letterSpacing: 2, color: '#E2A03F' }}>{r.stars}</span>
                      <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>“{r.text}”</p>
                      <span style={{ fontSize: 13, color: '#6E726A' }}>{r.by}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ border: '1.5px dashed #D9D1C0', borderRadius: 22, padding: 28, fontSize: 15, color: '#6E726A' }}>No parent reviews yet. Reviews appear here once families who&apos;ve enrolled share their experience.</div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={H2}>Location</h2>
              <div style={{ position: 'relative', height: 280, borderRadius: 24, overflow: 'hidden', backgroundColor: '#E3ECF4' }}>
                <iframe
                  title={`Map of ${sc.area}, Pune`}
                  src={`https://maps.google.com/maps?q=${mapQ}&z=14&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: '100%', height: '100%', filter: 'saturate(.8)' }}
                />
                <span style={{ position: 'absolute', left: 14, top: 14, background: '#2C332D', color: '#FFFCF7', padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: '#F4C6A8', border: '2px solid #fff' }} />{sc.name}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h2 style={{ ...H2, margin: '0 0 8px' }}>Frequently asked questions</h2>
              <div style={{ borderTop: '1px solid #E4DDCE' }}>
                {faqs.map(([q, a], i) => (
                  <div key={q} style={{ borderBottom: '1px solid #E4DDCE' }}>
                    <button onClick={() => setPfaq(pfaq === i ? -1 : i)} aria-expanded={pfaq === i} className="unbutton" style={{ width: '100%', padding: '18px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontSize: 16, fontWeight: 600 }}>
                      {q}<span style={{ flex: 'none', fontSize: 18, transform: `rotate(${pfaq === i ? 45 : 0}deg)`, transition: 'transform .3s' }}>+</span>
                    </button>
                    {pfaq === i && <p style={{ margin: 0, padding: '0 40px 18px 4px', fontSize: 15, lineHeight: 1.6, color: '#6E726A', animation: 'snyIn .3s ease both' }}>{a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="sticky-aside">
            <div style={{ background: '#fff', border: '1px solid #ECE6D9', borderRadius: 28, padding: 26, boxShadow: '0 30px 60px -40px rgba(44,51,45,.35)', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13, color: '#6E726A' }}>Annual tuition</span>
                <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-.03em' }}>{fmt(sc.fee)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #F0EBE0' }}>
                {[['Admissions', sc.availability], ['Timings', sc.timings], ['Ages', sc.ages]].map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: i < 2 ? '1px solid #F0EBE0' : 'none', fontSize: 14 }}>
                    <span style={{ color: '#6E726A' }}>{k}</span><span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openModal('enquiry', sc.id)} className="btn btn-terra" style={{ fontSize: 15, padding: 16 }}>Request Admission Information</button>
              <button onClick={() => openModal('visit', sc.id)} className="btn btn-outline" style={{ fontSize: 15, padding: 15 }}>Book a School Visit</button>
              <span style={{ fontSize: 12.5, color: '#6E726A', textAlign: 'center' }}>Your details go only to this school.</span>
            </div>
          </aside>
        </div>
      </div>

      <div className="mobile-only" style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 55, background: 'rgba(255,252,247,.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid #ECE6D9', padding: '12px 16px', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{fmt(sc.fee)}</span><span style={{ fontSize: 12, color: '#6E726A' }}>per year</span>
        </div>
        <button onClick={() => openModal('enquiry', sc.id)} className="btn btn-terra" style={{ fontSize: 14, padding: '14px 18px' }}>Request Info</button>
      </div>
    </>
  );
}
