export type School = {
  id: string;
  name: string;
  area: string;
  km: number;
  curriculum: Curriculum;
  ageMin: number;
  ageMax: number;
  ages: string;
  fee: number;
  adm: number;
  annual: number;
  books: number;
  meals: boolean;
  daycare: boolean;
  dcHours: string;
  transport: boolean;
  timings: string;
  endsLate: boolean;
  ratio: string;
  ratioN: number;
  cctv: boolean;
  outdoor: string;
  indoor: string;
  availability: 'Open' | 'Few seats' | 'Waitlist';
  rating: number | null;
  reviews: number;
  verified: boolean;
  tone: string;
  cover: string;
  photos: { src: string; label: string }[];
  coords: [number, number];
};

export type Curriculum = 'Montessori' | 'Play-based' | 'Reggio Emilia' | 'Waldorf' | 'Blended';

const img = (n: string) => `/images/${n}.jpg`;

const S = (
  id: string, name: string, area: string, km: number, curriculum: Curriculum, ageMin: number, ageMax: number,
  fee: number, adm: number, annual: number, books: number, meals: boolean, daycare: boolean, dcHours: string,
  transport: boolean, timings: string, endsLate: boolean, ratio: string, cctv: boolean, outdoor: string, indoor: string,
  availability: School['availability'], rating: number | null, reviews: number, verified: boolean, tone: string,
  photos: [string, string, string, string], coords: [number, number],
): School => ({
  id, name, area, km, curriculum, ageMin, ageMax, ages: `${ageMin} – ${ageMax} yrs`, fee, adm, annual, books, meals,
  daycare, dcHours, transport, timings, endsLate, ratio, ratioN: +ratio.split(':')[1], cctv, outdoor, indoor,
  availability, rating, reviews, verified, tone, cover: img(`${id}-cover`),
  photos: photos.map((p, i) => ({ src: img(p), label: ['Classroom', 'Outdoor play', 'Art corner', 'Reading nook'][i] })),
  coords,
});

export const SCHOOLS: School[] = [
  S('s1', 'Little Acorn Montessori', 'Koregaon Park', 1.2, 'Montessori', 1.5, 5, 145000, 25000, 12000, 8500, true, true, 'Till 6:30 pm', false, '9:00 am – 12:30 pm', false, '1 : 8', true, 'Garden and sandpit', 'Practical life, sensorial work, music', 'Few seats', 4.7, 38, true, '#C9D8C5', ['class-1', 'outdoor-4', 'art-6', 'reading-5'], [56, 40]),
  S('s2', 'Sunbeam Play Studio', 'Baner', 2.4, 'Play-based', 1.5, 4, 98000, 15000, 8000, 6000, true, true, 'Till 6:00 pm', true, '9:30 am – 12:30 pm', false, '1 : 10', true, 'Terrace play deck', 'Story time, music and movement', 'Open', 4.5, 22, false, '#F6D5BF', ['class-2', 'outdoor-1', 'art-2', 'reading-2'], [22, 30]),
  S('s3', 'The Banyan Courtyard', 'Aundh', 3.1, 'Reggio Emilia', 2, 6, 165000, 30000, 15000, 9500, true, false, '', true, '8:45 am – 1:00 pm', true, '1 : 7', true, 'Atelier courtyard', 'Atelier art, clay, light play', 'Waitlist', null, 0, true, '#CFDDEB', ['class-3', 'outdoor-2', 'art-3', 'reading-1'], [36, 22]),
  S('s4', 'Pebbles Preschool', 'Kothrud', 4.0, 'Play-based', 2, 5, 72000, 10000, 6000, 5500, false, true, 'Till 5:30 pm', true, '9:00 am – 12:00 pm', false, '1 : 12', true, 'Open lawn', 'Blocks, pretend play, rhymes', 'Open', 4.3, 51, false, '#F7E4A6', ['class-4', 'outdoor-3', 'art-7', 'reading-7'], [28, 62]),
  S('s5', 'Willow & Wren Waldorf', 'Kalyani Nagar', 6.6, 'Waldorf', 2.5, 6, 138000, 20000, 10000, 7000, true, false, '', true, '9:00 am – 1:00 pm', true, '1 : 9', false, 'Kitchen garden', 'Baking, puppetry, watercolour', 'Few seats', null, 0, false, '#E2D7EE', ['class-5', 'outdoor-5', 'art-1', 'reading-3'], [70, 34]),
  S('s6', 'Kidspace Montessori House', 'Viman Nagar', 5.2, 'Montessori', 1.5, 6, 118000, 18000, 9000, 7500, true, true, 'Till 7:00 pm', false, '9:00 am – 12:30 pm', false, '1 : 10', true, 'Sand and water play', 'Montessori materials, phonics, yoga', 'Open', 4.6, 29, true, '#F6D5BF', ['class-6', 'outdoor-8', 'art-4', 'reading-4'], [82, 20]),
  S('s7', 'Tiny Treehouse', 'Wakad', 9.8, 'Blended', 2, 5, 85000, 12000, 7000, 6500, false, false, '', false, '9:30 am – 12:30 pm', false, '1 : 12', true, 'Courtyard swings', 'Craft, rhymes, show-and-tell', 'Open', null, 0, false, '#C9D8C5', ['class-7', 'outdoor-6', 'art-5', 'reading-8'], [12, 44]),
  S('s8', 'Little Orbit Learning', 'Hinjewadi', 11.4, 'Blended', 1.5, 5, 105000, 15000, 9000, 8000, true, true, 'Till 7:30 pm', true, '8:30 am – 12:30 pm', false, '1 : 10', true, 'Splash pad and play yard', 'STEM play, music, dance', 'Few seats', 4.4, 17, false, '#F7E4A6', ['class-8', 'outdoor-9', 'art-8', 'reading-6'], [10, 18]),
  S('s9', 'Bloom Early Learning', 'Magarpatta', 7.3, 'Reggio Emilia', 2, 6, 152000, 25000, 12000, 9000, true, true, 'Till 6:00 pm', true, '9:00 am – 1:30 pm', true, '1 : 8', true, 'Nature trail', 'Project work, atelier, drama', 'Open', null, 0, true, '#CFDDEB', ['class-9', 'outdoor-7', 'art-9', 'reading-9'], [74, 60]),
];

export const getSchool = (id: string) => SCHOOLS.find((s) => s.id === id);

export const AREAS = SCHOOLS.map((s) => s.area);
export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

export const AGE: Record<string, number> = { 'Any age': 0, '1.5 – 2 yrs': 1.5, '2 – 3 yrs': 2, '3 – 4 yrs': 3, '4 – 6 yrs': 4 };
export const BUDGETS = ['Any budget', 'Under ₹1,00,000', '₹1,00,000 – ₹1,50,000', 'Above ₹1,50,000'];
export const TYPES = ['All types', 'Montessori', 'Play-based', 'Reggio Emilia', 'Waldorf', 'Blended'];
export const SORTS = ['Recommended', 'Fees: Low to High', 'Fees: High to Low', 'Distance', 'Rating'];
export const TIMINGS = ['Any timing', 'Half day (till 12:30)', 'Longer day (till 1 pm+)'];
export const TOGGLES: [ToggleKey, string][] = [['daycare', 'Daycare'], ['transport', 'Transport'], ['meals', 'Meals'], ['small', 'Small classes'], ['cctv', 'CCTV']];
export const PREFS = ['Play-based learning', 'Montessori learning', 'Outdoor activities', 'Daycare support', 'Healthy meals', 'Smaller classrooms', 'Flexible timings'];

export type ToggleKey = 'daycare' | 'transport' | 'meals' | 'small' | 'cctv';
export type Filters = { area: string; age: string; type: string; budget: string; timing: string } & Record<ToggleKey, boolean>;
export const DEFAULT_F: Filters = { area: 'All areas', age: 'Any age', type: 'All types', budget: 'Any budget', timing: 'Any timing', daycare: false, transport: false, meals: false, small: false, cctv: false };

export const PHIL: Record<Curriculum, string> = {
  Montessori: 'Children choose their work from prepared shelves and learn at their own pace in mixed-age rooms, guided by trained Montessori teachers.',
  'Play-based': 'Learning happens through guided play, stories and songs, with teachers building early literacy and number sense into everyday activities.',
  'Reggio Emilia': "Projects grow from children's own questions. Teachers document each child's thinking and the studio is treated as a third teacher.",
  Waldorf: 'A gentle daily rhythm of free play, storytelling, art and outdoor time, with an emphasis on imagination and natural materials.',
  Blended: 'A mix of play-based and structured learning, combining activity corners with short guided sessions on language and numbers.',
};

export const FAQS: [string, string][] = [
  ['What age can my child start preschool?', 'Most preschools in Pune accept children from around 1.5 years for playgroup. Nursery usually starts at 2.5 to 3, followed by LKG and UKG up to about 6 years.'],
  ['How much does preschool usually cost?', 'It varies widely by curriculum, facilities and location. The sample schools on schoolnearyou range from ₹72,000 to ₹1,65,000 a year in tuition, before one-time admission fees.'],
  ['What is the difference between playgroup and nursery?', 'Playgroup is for the youngest children and focuses on settling in, play and social skills. Nursery adds more structured activities like early language, numbers and fine-motor work.'],
  ['What should I look for when choosing a preschool?', 'Visit in person. Look at teacher-student ratio, how teachers speak to children, cleanliness, outdoor space, safety measures and whether the daily routine suits your family.'],
  ['Does the school provide daycare?', 'Many do. Use the Daycare filter to see schools that offer extended care, and check each profile for daycare hours and charges.'],
  ['Can I book a school visit?', 'Yes. Open any school profile and choose Book a School Visit to request a date and time. The school confirms directly with you.'],
  ['What fees are included in the annual cost?', 'Each profile separates recurring yearly costs (tuition, annual charges, books and uniform) from one-time costs at admission (registration, admission fee and refundable deposit).'],
];

export const GALLERY: { label: string; tone: string; span: number; src: string; alt: string }[] = [
  { label: 'Learning spaces', tone: '#C9D8C5', span: 2, src: img('gallery-learning'), alt: 'A bright preschool learning room with low shelves and a child at a table' },
  { label: 'Outdoor playgrounds', tone: '#F7E4A6', span: 1, src: img('gallery-outdoor'), alt: 'Colourful outdoor playground with slides' },
  { label: 'Art and creativity', tone: '#F6D5BF', span: 1, src: img('gallery-art'), alt: 'Children painting together at an art table' },
  { label: 'Reading corners', tone: '#E2D7EE', span: 1, src: img('gallery-reading'), alt: 'A young girl reading a picture book' },
  { label: 'Activity rooms', tone: '#CFDDEB', span: 1, src: img('gallery-activity'), alt: 'Children and teachers playing with balls in an activity room' },
  { label: 'Daycare environments', tone: '#F6D5BF', span: 1, src: img('gallery-daycare'), alt: 'Children having a snack in a daycare room with nap beds' },
];

export const OWNER: [string, string, string][] = [
  ['Create school profile', 'Build a clear, complete page parents can trust.', '#A8BFA3'],
  ['Showcase classrooms and facilities', 'Add photos of your spaces, play areas and activity rooms.', '#F4C6A8'],
  ['Publish fee structures', 'Show recurring and one-time fees in a format parents understand.', '#E2BE4E'],
  ['Receive admission enquiries', 'Parents send enquiries and visit requests straight to you.', '#8FB0CF'],
  ['Track profile views', 'See how many families are viewing your school each week.', '#B9A3D4'],
  ['Manage parent enquiries', 'Reply, follow up and keep every conversation in one place.', '#A8BFA3'],
];

export type Enquiry = { id: number; school: string; parent: string; child: string; type: 'Visit' | 'Enquiry'; msg: string; when: string; status: 'New' | 'Contacted' };
export const SEED_ENQ: Enquiry[] = [
  { id: 1, school: 's1', parent: 'Ananya Kulkarni', child: '2 – 3 yrs', type: 'Visit', msg: 'Would like to visit on a Saturday morning.', when: 'Today, 10:42 am', status: 'New' },
  { id: 2, school: 's1', parent: 'Rohan Mehta', child: '3 – 4 yrs', type: 'Enquiry', msg: 'Are seats open for Nursery in June?', when: 'Yesterday', status: 'New' },
  { id: 3, school: 's1', parent: 'Sneha Patil', child: '1.5 – 2 yrs', type: 'Enquiry', msg: 'Do you offer daycare till 6:30 pm?', when: '3 Nov', status: 'Contacted' },
];
export const CHECKS = ['Basic details', 'Fee structure', 'Classroom photos', 'Daycare details', 'Admission dates'];

export function filterSchools(list: School[], f: Filters) {
  return list.filter((s) => {
    if (f.area !== 'All areas' && s.area !== f.area) return false;
    const a = AGE[f.age];
    if (a && !(s.ageMin <= a && s.ageMax > a)) return false;
    if (f.type !== 'All types' && s.curriculum !== f.type) return false;
    if (f.budget === BUDGETS[1] && s.fee >= 100000) return false;
    if (f.budget === BUDGETS[2] && (s.fee < 100000 || s.fee > 150000)) return false;
    if (f.budget === BUDGETS[3] && s.fee <= 150000) return false;
    if (f.timing === TIMINGS[1] && s.endsLate) return false;
    if (f.timing === TIMINGS[2] && !s.endsLate) return false;
    if (f.daycare && !s.daycare) return false;
    if (f.transport && !s.transport) return false;
    if (f.meals && !s.meals) return false;
    if (f.cctv && !s.cctv) return false;
    if (f.small && s.ratioN > 9) return false;
    return true;
  });
}

export function sortSchools(list: School[], sort: string) {
  const l = [...list];
  if (sort === SORTS[1]) l.sort((a, b) => a.fee - b.fee);
  else if (sort === SORTS[2]) l.sort((a, b) => b.fee - a.fee);
  else if (sort === SORTS[3]) l.sort((a, b) => a.km - b.km);
  else if (sort === SORTS[4]) l.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return l;
}

export const facilitiesOf = (s: School) =>
  [s.daycare && 'Daycare', s.meals && 'Meals', s.transport && 'Transport', s.cctv && 'CCTV'].filter(Boolean) as string[];

export type CompareRow = { label: string; differs: boolean; cells: { text: string; best: boolean; money: boolean }[] };
export function compareRows(list: School[], full: boolean): CompareRow[] {
  const yn = (b: boolean, y: string, n: string) => (b ? y : n);
  const defs: [string, (s: School) => string | number, boolean?][] = [
    ['Annual tuition fee', (s) => s.fee, true], ['Admission fee', (s) => s.adm, true], ['Annual charges', (s) => s.annual, true], ['Books and uniform', (s) => s.books, true],
    ['Meals', (s) => yn(s.meals, 'Included', 'Not provided')], ['Daycare', (s) => (s.daycare ? s.dcHours : 'Not offered')], ['Transport', (s) => yn(s.transport, 'Available', 'Not offered')],
    ['Curriculum', (s) => s.curriculum], ['Class timings', (s) => s.timings], ['Teacher-student ratio', (s) => s.ratio], ['CCTV', (s) => yn(s.cctv, 'Yes', 'No')],
    ['Outdoor play area', (s) => s.outdoor], ['Indoor activities', (s) => s.indoor], ['Age groups', (s) => s.ages], ['Admission availability', (s) => s.availability],
  ];
  return (full ? defs : defs.filter((_, i) => [0, 1, 4, 5, 7, 9, 14].includes(i))).map(([label, fn, money]) => {
    const vals = list.map(fn);
    const min = money ? Math.min(...(vals as number[])) : null;
    const differs = new Set(vals).size > 1;
    return { label, differs, cells: vals.map((v) => ({ text: money ? fmt(v as number) : String(v), best: !!money && differs && v === min, money: !!money })) };
  });
}
