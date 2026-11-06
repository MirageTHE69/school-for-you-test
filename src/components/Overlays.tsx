'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSchool, SCHOOLS } from '@/lib/data';
import { useApp } from './AppProvider';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div role="status" style={{ position: 'fixed', top: 84, left: 12, right: 12, marginInline: 'auto', width: 'fit-content', zIndex: 80, background: '#fff', border: '1px solid #ECE6D9', color: '#2C332D', borderRadius: 999, padding: '12px 20px', fontSize: 14, fontWeight: 600, boxShadow: '0 16px 36px -18px rgba(44,51,45,.4)', animation: 'snyIn .3s ease both', maxWidth: 'calc(100vw - 24px)', textAlign: 'center' }}>
      {toast}
    </div>
  );
}

export function CompareTray() {
  const { cmp, setCmp } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  if (!cmp.length || ['/', '/dashboard', '/list-your-preschool'].includes(pathname)) return null;
  const list = cmp.map(getSchool).filter(Boolean);
  return (
    <div className={`compare-tray${pathname.startsWith('/schools/') ? ' raised' : ''}`} style={{ position: 'fixed', left: 12, right: 12, marginInline: 'auto', width: 'fit-content', zIndex: 58, background: '#2C332D', color: '#FFFCF7', borderRadius: 999, padding: '8px 8px 8px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 20px 40px -16px rgba(44,51,45,.5)', animation: 'snyIn .35s ease both', maxWidth: 'calc(100vw - 24px)' }}>
      <div style={{ display: 'flex' }}>
        {list.map((s) => (
          <span key={s!.id} style={{ position: 'relative', width: 28, height: 28, borderRadius: 999, border: '2px solid #2C332D', marginLeft: -6, background: s!.tone, overflow: 'hidden' }}>
            <Image src={s!.cover} alt="" fill sizes="28px" style={{ objectFit: 'cover' }} />
          </span>
        ))}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{cmp.length} of 3</span>
      <button onClick={() => setCmp([])} style={{ border: 'none', cursor: 'pointer', background: 'transparent', color: '#C8CDC5', fontSize: 13, fontWeight: 600 }}>Clear</button>
      <button onClick={() => router.push('/#compare')} className="btn btn-butter" style={{ fontSize: 14, padding: '11px 18px', whiteSpace: 'nowrap' }}>Compare now</button>
    </div>
  );
}

export function Modal() {
  const { modal, modalSchool, closeModal, setAccount, addEnquiry } = useApp();
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [role, setRole] = useState<'Parent' | 'School'>('Parent');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (modal) setSent(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, closeModal]);

  if (!modal) return null;
  const sc = getSchool(modalSchool) || SCHOOLS[0];
  const meta = {
    enquiry: ['Request admission information', sc.name, 'Send enquiry', `Enquiry sent to ${sc.name}`, 'The school will contact you on the number you shared. You can also book a visit from the profile.'],
    visit: ['Book a school visit', sc.name, 'Request visit', 'Visit requested', 'The school will confirm a time with you directly.'],
    login: ['Welcome back', 'Parents see their shortlist. Schools open their dashboard.', 'Continue', "You're logged in", 'Your saved schools stay on this device.'],
  }[modal];

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modal === 'login') {
      if (role === 'School') {
        setAccount('School');
        closeModal();
        router.push('/dashboard');
      } else {
        setSent(true);
        setAccount('Parent');
      }
      return;
    }
    const fd = new FormData(e.currentTarget);
    addEnquiry({
      id: Date.now(),
      school: sc.id,
      parent: String(fd.get('parent') || 'Parent'),
      child: String(fd.get('child') || ''),
      type: modal === 'visit' ? 'Visit' : 'Enquiry',
      msg: modal === 'visit' ? `Visit requested for ${fd.get('date') || 'a date to confirm'} (${fd.get('time')})` : String(fd.get('msg') || 'Requested admission information.'),
      when: 'Just now',
      status: 'New',
    });
    setSent(true);
  };

  return (
    <div onClick={closeModal} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(44,51,45,.38)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title" style={{ background: '#FFFCF7', borderRadius: 28, width: '100%', maxWidth: 460, maxHeight: 'calc(100vh - 32px)', overflow: 'auto', padding: 'clamp(22px,4vw,32px)', boxShadow: '0 40px 80px -30px rgba(44,51,45,.5)', animation: 'snyIn .35s cubic-bezier(.2,.7,.2,1) both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span id="modal-title" style={{ fontSize: 22, fontWeight: 650, letterSpacing: '-.02em' }}>{meta[0]}</span>
            <span style={{ fontSize: 14, color: '#6E726A' }}>{meta[1]}</span>
          </div>
          <button onClick={closeModal} aria-label="Close" style={{ flex: 'none', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 999, background: '#F1ECE1', color: '#2C332D', fontSize: 18 }}>×</button>
        </div>

        {!sent ? (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {modal === 'login' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, background: '#F1ECE1', borderRadius: 999, padding: 4 }}>
                  {(['Parent', 'School'] as const).map((r) => (
                    <button key={r} type="button" onClick={() => setRole(r)} style={{ border: 'none', cursor: 'pointer', background: role === r ? '#fff' : 'transparent', color: '#2C332D', fontSize: 14, fontWeight: 600, padding: 11, borderRadius: 999, boxShadow: role === r ? '0 2px 8px rgba(44,51,45,.12)' : 'none', transition: 'all .25s' }}>
                      I&apos;m a {r.toLowerCase()}
                    </button>
                  ))}
                </div>
                <label className="field">Mobile number or email<input required className="input white" autoComplete="username" /></label>
              </>
            )}
            {(modal === 'enquiry' || modal === 'visit') && (
              <>
                <label className="field">Parent&apos;s name<input name="parent" required className="input white" autoComplete="name" /></label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))', gap: 12 }}>
                  <label className="field">Phone<input required type="tel" placeholder="+91" className="input white" autoComplete="tel" /></label>
                  <label className="field">Child&apos;s age
                    <select name="child" required className="input white">
                      <option value="">Select</option><option>1.5 – 2 yrs</option><option>2 – 3 yrs</option><option>3 – 4 yrs</option><option>4 – 6 yrs</option>
                    </select>
                  </label>
                </div>
              </>
            )}
            {modal === 'visit' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))', gap: 12 }}>
                <label className="field">Preferred date<input name="date" required type="date" className="input white" style={{ padding: 13 }} /></label>
                <label className="field">Time<select name="time" className="input white"><option>Morning</option><option>Afternoon</option></select></label>
              </div>
            )}
            {modal === 'enquiry' && (
              <label className="field">Anything you&apos;d like to ask?<textarea name="msg" rows={3} placeholder="e.g. Are seats open for Nursery in June?" className="input white" style={{ resize: 'vertical' }} /></label>
            )}
            <button type="submit" className="btn btn-dark" style={{ fontSize: 15, padding: 16, marginTop: 6 }}>{meta[2]}</button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', animation: 'snyIn .4s ease both' }}>
            <span style={{ width: 48, height: 48, borderRadius: 999, background: '#A8BFA3', color: '#fff', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
            <span style={{ fontSize: 20, fontWeight: 650, letterSpacing: '-.02em' }}>{meta[3]}</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#6E726A' }}>{meta[4]}</p>
            <button onClick={closeModal} className="btn btn-dark" style={{ fontSize: 14, padding: '12px 22px' }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
