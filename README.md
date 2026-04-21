# Gnanadeep Gudapati — Portfolio

A modern, production-ready React portfolio with Framer Motion animations, Tailwind CSS,
and a "Soft Neobrutalism" design system.

---

## Local Development (30 seconds)

```bash
cd portfolio
npm install
npm run dev
```
Open http://localhost:5173

---

## Deploy to Vercel (2 minutes, FREE)

1. Push this `portfolio/` folder to a GitHub repo
2. Go to https://vercel.com → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `https://your-project.vercel.app` ✅

> **Custom domain**: In Vercel dashboard → Settings → Domains → add yours free

---

## Deploy to Netlify (2 minutes, FREE)

1. Push to GitHub
2. Go to https://netlify.com → **Add new site → Import from Git**
3. Select your repo
4. Set Build command: `npm run build`
5. Set Publish directory: `dist`
6. Click **Deploy site** ✅

---

## Adding Your Photo

1. Copy your photo to `portfolio/public/profile.jpg`
2. Open `src/App.jsx` and find the `{/* TO ADD YOUR PHOTO */}` comment (~line 280)
3. Uncomment the `<img>` tag and delete the placeholder `<div>`

```jsx
// Before:
{/* <img src="/profile.jpg" alt="Gnanadeep Gudapati" className="w-full h-full object-cover" /> */}

// After:
<img src="/profile.jpg" alt="Gnanadeep Gudapati" className="w-full h-full object-cover" />
```

---

## Updating GitHub Project Links

In `src/App.jsx`, update the `GITHUB` constant at the top and individual
`github:` fields in the `PROJECTS` array to point to specific repos.

---

## Tech Stack

- React 18 + Vite
- Tailwind CSS 3
- Framer Motion 11
- Lucide React icons
- Google Fonts: Inter + Space Grotesk
