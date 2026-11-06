'use client';

import Link from 'next/link';
import { Wordmark } from './Logo';
import { useApp } from './AppProvider';

export default function Footer() {
  const { openModal } = useApp();
  return (
    <footer style={{ background: '#F7F3EA', borderTop: '1px solid #ECE6D9' }}>
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
            <Wordmark size={22} />
            <span className="serif" style={{ fontSize: 22, color: '#4B5149', letterSpacing: 0 }}>Big beginnings start here.</span>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <span style={{ fontWeight: 700, marginBottom: 4 }}>Parents</span>
              <Link href="/explore">Explore preschools</Link>
              <Link href="/#compare">Compare schools</Link>
              <Link href="/#faq">Parent FAQs</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <span style={{ fontWeight: 700, marginBottom: 4 }}>Schools</span>
              <Link href="/list-your-preschool">List your preschool</Link>
              <a href="#" onClick={(e) => { e.preventDefault(); openModal('login'); }}>School login</a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13, color: '#6E726A', borderTop: '1px solid #E4DDCE', paddingTop: 22 }}>
          <span>© 2026 schoolnearyou · Pune</span>
          <span>School information shown is sample data.</span>
        </div>
      </div>
    </footer>
  );
}
