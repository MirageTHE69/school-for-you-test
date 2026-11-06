import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchoolProfile from '@/components/SchoolProfile';
import { getSchool, SCHOOLS } from '@/lib/data';

export function generateStaticParams() {
  return SCHOOLS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getSchool(id);
  if (!s) return {};
  return { title: `${s.name}, ${s.area}`, description: `${s.curriculum} preschool in ${s.area}, Pune for ages ${s.ages}. Fees, facilities, timings and parent reviews.` };
}

export default async function SchoolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getSchool(id)) notFound();
  return <SchoolProfile id={id} />;
}
