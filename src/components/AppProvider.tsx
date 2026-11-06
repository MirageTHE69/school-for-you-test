'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DEFAULT_F, SEED_ENQ, type Enquiry, type Filters } from '@/lib/data';

export type ModalKind = 'enquiry' | 'visit' | 'login' | null;
export type Account = 'Parent' | 'School' | null;

type Ctx = {
  fav: string[];
  cmp: string[];
  f: Filters;
  sort: string;
  enquiries: Enquiry[];
  account: Account;
  toast: string;
  modal: ModalKind;
  modalSchool: string;
  toggleFav: (id: string) => void;
  toggleCmp: (id: string) => void;
  setCmp: (ids: string[]) => void;
  setF: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
  setFilters: (f: Filters) => void;
  setSort: (s: string) => void;
  setAccount: (a: Account) => void;
  flash: (msg: string) => void;
  openModal: (kind: Exclude<ModalKind, null>, schoolId?: string) => void;
  closeModal: () => void;
  addEnquiry: (e: Enquiry) => void;
  updateEnquiry: (id: number, status: Enquiry['status']) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside <AppProvider>');
  return c;
}

const KEY = 'sny-state-v1';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [fav, setFav] = useState<string[]>(['s6']);
  const [cmp, setCmpState] = useState<string[]>(['s1', 's3', 's6']);
  const [f, setFState] = useState<Filters>({ ...DEFAULT_F });
  const [sort, setSort] = useState('Recommended');
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SEED_ENQ);
  const [account, setAccount] = useState<Account>(null);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<ModalKind>(null);
  const [modalSchool, setModalSchool] = useState('s1');
  const tt = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaded = useRef(false);

  // Restore the shortlist, comparison and enquiries saved on this device.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        /* eslint-disable react-hooks/set-state-in-effect */
        if (Array.isArray(d.fav)) setFav(d.fav);
        if (Array.isArray(d.cmp)) setCmpState(d.cmp);
        if (Array.isArray(d.enquiries)) setEnquiries(d.enquiries);
        if (d.account === 'Parent' || d.account === 'School') setAccount(d.account);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ fav, cmp, enquiries, account }));
    } catch {}
  }, [fav, cmp, enquiries, account]);

  const flash = useCallback((msg: string) => {
    if (tt.current) clearTimeout(tt.current);
    setToast(msg);
    tt.current = setTimeout(() => setToast(''), 2200);
  }, []);

  const toggleFav = useCallback((id: string) => {
    setFav((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);

  const toggleCmp = useCallback(
    (id: string) => {
      if (cmp.includes(id)) return setCmpState(cmp.filter((x) => x !== id));
      if (cmp.length >= 3) return flash('You can compare up to 3 schools.');
      setCmpState([...cmp, id]);
      flash('Added to comparison');
    },
    [cmp, flash],
  );

  const value: Ctx = {
    fav, cmp, f, sort, enquiries, account, toast, modal, modalSchool,
    toggleFav, toggleCmp,
    setCmp: setCmpState,
    setF: (k, v) => setFState((s) => ({ ...s, [k]: v })),
    setFilters: setFState,
    setSort, setAccount, flash,
    openModal: (kind, schoolId) => {
      if (schoolId) setModalSchool(schoolId);
      setModal(kind);
    },
    closeModal: () => setModal(null),
    addEnquiry: (e) => setEnquiries((s) => [e, ...s]),
    updateEnquiry: (id, status) => setEnquiries((s) => s.map((x) => (x.id === id ? { ...x, status } : x))),
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
