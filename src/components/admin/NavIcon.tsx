// Line icons for the CMS sidebar and the dashboard index (24px grid, drawn with currentColor).
import type { ReactNode } from 'react'

const PATHS = {
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  home: <><path d="M3.5 10.5 12 3.5l8.5 7" /><path d="M5.5 9v11.5h13V9" /><path d="M10 20.5V15h4v5.5" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5" /><path d="M12 7.75h.01" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20.5h8" /><path d="M12 16v4.5" /></>,
  shield: <><path d="M12 3.5 5 6.25v5.25c0 4.25 2.9 7.9 7 9 4.1-1.1 7-4.75 7-9V6.25z" /><path d="m9.25 12 2 2 3.5-3.75" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="1.5" /><path d="M9 7V5.25c0-.7.55-1.25 1.25-1.25h3.5c.7 0 1.25.55 1.25 1.25V7" /><path d="M3 12.5h18" /></>,
  newspaper: <><path d="M4 5h12.5v13.5c0 1.1.9 2 2 2H6a2 2 0 0 1-2-2z" /><path d="M16.5 9H20v9.5a2 2 0 0 1-2 2" /><path d="M7.5 9h5.5" /><path d="M7.5 12.5h5.5" /><path d="M7.5 16h3.5" /></>,
  book: <><path d="M4.5 5a2 2 0 0 1 2-2h13v15h-13a2 2 0 0 0-2 2z" /><path d="M4.5 20a1.5 1.5 0 0 0 1.5 1.5h13.5V18" /><path d="M8.5 7.5h7" /></>,
  help: <><circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.4a2.5 2.5 0 0 1 4.85.85c0 1.75-2.45 2.2-2.45 3.6" /><path d="M12 17h.01" /></>,
  quote: <><path d="M4 4.5h16v11.5H9l-5 4z" /><path d="M8 8.5h8" /><path d="M8 12h5" /></>,
  building: <><path d="M4.5 20.5V5a1 1 0 0 1 1-1h8.5a1 1 0 0 1 1 1v15.5" /><path d="M15 9h3.5a1 1 0 0 1 1 1v10.5" /><path d="M3 20.5h18" /><path d="M8 8h3.5" /><path d="M8 12h3.5" /><path d="M8 16h3.5" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><circle cx="8.75" cy="9.25" r="1.75" /><path d="m21 15.5-4.75-4.75L7 20" /></>,
  layers: <><path d="m12 3.5 8.5 4.75L12 13 3.5 8.25z" /><path d="m3.5 12.5 8.5 4.75 8.5-4.75" /><path d="m3.5 16.5 8.5 4.75 8.5-4.75" /></>,
  flag: <><path d="M5.5 21V4" /><path d="M5.5 4.5h11l-2.25 4 2.25 4h-11" /></>,
  pin: <><path d="M12 21s-6.5-5.75-6.5-11a6.5 6.5 0 0 1 13 0c0 5.25-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.25" /></>,
  inbox: <><path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" /><path d="M6 5h12l2.5 8.5V19a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-5.5z" /></>,
  sliders: <><path d="M4 7h9" /><path d="M17 7h3" /><circle cx="15" cy="7" r="2" /><path d="M4 12h3" /><path d="M11 12h9" /><circle cx="9" cy="12" r="2" /><path d="M4 17h11" /><path d="M19 17h1" /><circle cx="17" cy="17" r="2" /></>,
  type: <><path d="M5 7V4.5h14V7" /><path d="M12 4.5v15" /><path d="M9 19.5h6" /></>,
  users: <><circle cx="9" cy="8" r="3.25" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M15.5 4.9a3.25 3.25 0 0 1 0 6.2" /><path d="M17.5 14.4A6 6 0 0 1 21 20" /></>,
  external: <><path d="M14 4h6v6" /><path d="m20 4-8.5 8.5" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  logout: <><path d="M14.5 4H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.5" /><path d="m9.5 16.5-4.5-4.5 4.5-4.5" /><path d="M5 12h10.5" /></>,
  file: <><path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5" /></>,
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof PATHS

export function NavIcon({ name }: { name: IconName }) {
  return (
    <svg className="cms-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  )
}
