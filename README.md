# schoolnearyou

A Next.js (App Router) build of the SchoolNearYou v2 design: a site for finding, comparing and enquiring at preschools in Pune.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero search, featured schools, side-by-side compare, preferences, how it works, gallery, FAQ |
| `/explore` | Filterable list with grid and map views |
| `/schools/[id]` | School profile: gallery, fees, daily life, safety, reviews, map, enquiry and visit booking |
| `/saved` | Parent's shortlist |
| `/for-schools` | Landing page for preschool owners, with registration form |
| `/list-your-preschool` | 4-step listing wizard with photo upload and a live card preview |
| `/dashboard` | School dashboard: enquiries and profile completeness |

## Notes

- School data is sample data in `src/lib/data.ts`.
- Saved schools, the comparison list, enquiries and login state are kept in `localStorage` (`src/components/AppProvider.tsx`).
- Photos in `public/images` are free-licence stock photos from [Pexels](https://www.pexels.com/license/) and [Unsplash](https://unsplash.com/license).
