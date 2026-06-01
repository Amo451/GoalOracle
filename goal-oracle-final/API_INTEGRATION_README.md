# Football API Integration — Setup & Notes

## Files Changed

| File | What Changed |
|------|-------------|
| `app/today-predictions/page.tsx` | Replaced static mock data with `fetchTodaysMatches()` + `fetchUpcomingMatches()` fallback. Shows live API status indicator. |
| `app/predictions/[slug]/page.tsx` | Replaced `getMatchBySlug()` (mock only) with `fetchMatchBySlug()` (API-first). Now shows live/finished scores, team crests from API, win probability bars, and live H2H data. |
| `.env.local` | Added `FOOTBALL_DATA_API_KEY` — required for API calls. |

## Environment Setup

1. Copy `.env.local` to your project root (it's included here).
2. The key is already populated. If you rotate it, update `FOOTBALL_DATA_API_KEY`.

For production deployment (Vercel, etc.), add the env var in your dashboard:
- Variable: `FOOTBALL_DATA_API_KEY`
- Value: your key

## How It Works

```
API call → football-api.ts (raw fetch + cache)
              ↓
         data-api.ts (transforms ApiMatch → Match, adds predictions)
              ↓
    page.tsx (renders, falls back to mock data if API fails)
```

- **`today-predictions/page.tsx`**: Calls `fetchTodaysMatches()`. If no matches today (off-season / between match days), automatically falls back to `fetchUpcomingMatches(6)` so the page is never blank.
- **`predictions/[slug]/page.tsx`**: Calls `fetchMatchBySlug(slug)`. The match includes `_apiData` with live score, status, team crests, and TLAs. The page renders team logos (image URLs from API) instead of emoji flags when available. Also fetches H2H via `fetchHeadToHead()` and renders a visual win-probability bar.

## Active Competition

Currently set to World Cup (`WC`) in `lib/data-api.ts`:
```ts
const ACTIVE_COMPETITION = COMPETITIONS.WORLD_CUP;
```

Change to `COMPETITIONS.PREMIER_LEAGUE`, `CHAMPIONS_LEAGUE`, etc. as needed.

## Rate Limits

Football-Data.org free tier: 10 requests/minute.
The API layer caches responses (60s for matches, 3600s for teams/standings) to stay within limits.
