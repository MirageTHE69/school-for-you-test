'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoMark, Wordmark } from './Logo';
import { useApp } from './AppProvider';

const NAV = [
  { label: 'Explore Preschools', href: '/explore' },
  { label: 'Compare Schools', href: '/#compare' },
  { label: 'How It Works', href: '/#how' },
  { label: 'For Schools', href: '/for-schools' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { fav, account, setAccount, openModal, flash } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMenuOpen(false), [pathname]);

  const accountLabel = account === 'School' ? 'Dashboard' : account === 'Parent' ? 'Log out' : 'Login';
  const accountAction = () => {
    setMenuOpen(false);
    if (account === 'School') router.push('/dashboard');
    else if (account === 'Parent') {
      setAccount(null);
      flash('Logged out');
    } else openModal('login');
  };
  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="wrap" style={{ paddingTop: 14, paddingBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <Link href="/" aria-label="schoolnearyou home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark />
          <Wordmark />
        </Link>

        <nav className="nav-full" style={{ gap: 2, alignItems: 'center' }}>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${isActive(l.href) ? ' active' : ''}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-full" style={{ gap: 4, alignItems: 'center' }}>
          <Link href="/saved" className={`nav-link${pathname === '/saved' ? ' active' : ''}`} style={{ padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#C4532F' }}>♥</span>Saved
            <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: '#C4532F', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{fav.length}</span>
          </Link>
          <button onClick={accountAction} className="nav-link" style={{ padding: '9px 12px' }}>{accountLabel}</button>
          <Link href="/list-your-preschool" className="nav-link" style={{ padding: '9px 12px' }}>List Your Preschool</Link>
          <Link href="/explore" className="btn btn-terra" style={{ fontSize: 14, padding: '11px 18px', whiteSpace: 'nowrap' }}>Find a Preschool</Link>
        </div>

        <div className="nav-compact" style={{ gap: 8, alignItems: 'center' }}>
          <Link href="/explore" className="btn btn-dark" style={{ fontSize: 13, padding: '10px 14px' }}>Find</Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{ border: '1px solid #E4DDCE', cursor: 'pointer', background: '#fff', width: 44, height: 44, borderRadius: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <span style={{ width: 16, height: 1.5, background: '#2C332D', borderRadius: 2, transition: 'transform .25s', transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 16, height: 1.5, background: '#2C332D', borderRadius: 2, transition: 'transform .25s', transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-compact" style={{ padding: '8px 16px 20px', flexDirection: 'column', gap: 4, background: '#FFFCF7', borderTop: '1px solid #ECE6D9', animation: 'snyIn .3s ease both' }}>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/saved" className="mobile-link" onClick={() => setMenuOpen(false)}>
            <span style={{ color: '#C4532F' }}>♥</span>Saved schools ({fav.length})
          </Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={accountAction} className="btn btn-outline" style={{ flex: 1, fontSize: 15, padding: 14, borderColor: '#E4DDCE' }}>{accountLabel}</button>
            <Link href="/list-your-preschool" className="btn btn-dark" style={{ flex: 1, fontSize: 15, padding: 14 }} onClick={() => setMenuOpen(false)}>List Your Preschool</Link>
          </div>
        </div>
      )}
    </header>
  );
}
