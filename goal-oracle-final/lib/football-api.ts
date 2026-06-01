// Football-Data.org API Service
// Documentation: https://www.football-data.org/documentation/api

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

// Competition IDs
export const COMPETITIONS = {
  WORLD_CUP: "WC", // FIFA World Cup
  EURO: "EC", // European Championship
  CHAMPIONS_LEAGUE: "CL",
  PREMIER_LEAGUE: "PL",
  LA_LIGA: "PD",
  BUNDESLIGA: "BL1",
  SERIE_A: "SA",
  LIGUE_1: "FL1",
} as const;

// Types based on Football-Data.org API response
export interface ApiTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string; // Three Letter Abbreviation
  crest: string;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  coach?: {
    id: number;
    name: string;
    nationality: string;
  };
}

export interface ApiMatch {
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "FINISHED" | "SUSPENDED" | "POSTPONED" | "CANCELLED" | "AWARDED";
  matchday: number;
  stage: string;
  group?: string;
  lastUpdated: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
    duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT";
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  odds?: {
    homeWin?: number;
    draw?: number;
    awayWin?: number;
  };
  referees?: Array<{
    id: number;
    name: string;
    type: string;
    nationality: string;
  }>;
}

export interface ApiStanding {
  stage: string;
  type: string;
  group?: string;
  table: Array<{
    position: number;
    team: ApiTeam;
    playedGames: number;
    form: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }>;
}

export interface ApiCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  currentSeason?: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; expiry: number }>();

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T, ttlSeconds: number): void {
  cache.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 });
}

// API fetch helper with rate limiting awareness
async function fetchFromApi<T>(endpoint: string, cacheTTL = 300): Promise<T> {
  const cacheKey = `football-api:${endpoint}`;
  const cached = getCached<T>(cacheKey);
  if (cached) {
    return cached;
  }

  if (!API_KEY) {
    throw new Error("FOOTBALL_DATA_API_KEY environment variable is not set");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
    next: { revalidate: cacheTTL }, // Next.js cache
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("API rate limit exceeded. Please wait before making more requests.");
    }
    throw new Error(`Football API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  setCache(cacheKey, data, cacheTTL);
  return data;
}

// Get competition details
export async function getCompetition(competitionCode: string): Promise<ApiCompetition> {
  const data = await fetchFromApi<{ competition: ApiCompetition }>(
    `/competitions/${competitionCode}`,
    3600 // Cache for 1 hour
  );
  return data.competition;
}

// Get all matches for a competition
export async function getMatches(
  competitionCode: string,
  options?: {
    status?: string;
    matchday?: number;
    dateFrom?: string;
    dateTo?: string;
  }
): Promise<ApiMatch[]> {
  const params = new URLSearchParams();
  if (options?.status) params.set("status", options.status);
  if (options?.matchday) params.set("matchday", options.matchday.toString());
  if (options?.dateFrom) params.set("dateFrom", options.dateFrom);
  if (options?.dateTo) params.set("dateTo", options.dateTo);

  const queryString = params.toString();
  const endpoint = `/competitions/${competitionCode}/matches${queryString ? `?${queryString}` : ""}`;
  
  const data = await fetchFromApi<{ matches: ApiMatch[] }>(endpoint, 60); // Cache for 1 minute for live data
  return data.matches;
}

// Get a single match by ID
export async function getMatch(matchId: number): Promise<ApiMatch> {
  const data = await fetchFromApi<ApiMatch>(`/matches/${matchId}`, 60);
  return data;
}

// Get today's matches across all competitions or specific one
export async function getTodaysMatches(competitionCode?: string): Promise<ApiMatch[]> {
  const today = new Date().toISOString().split("T")[0];
  
  if (competitionCode) {
    return getMatches(competitionCode, { dateFrom: today, dateTo: today });
  }
  
  const data = await fetchFromApi<{ matches: ApiMatch[] }>(
    `/matches?dateFrom=${today}&dateTo=${today}`,
    60
  );
  return data.matches;
}

// Get upcoming matches
export async function getUpcomingMatches(
  competitionCode: string,
  limit = 10
): Promise<ApiMatch[]> {
  const matches = await getMatches(competitionCode, { status: "SCHEDULED" });
  return matches.slice(0, limit);
}

// Get finished matches (results)
export async function getFinishedMatches(
  competitionCode: string,
  limit = 10
): Promise<ApiMatch[]> {
  const matches = await getMatches(competitionCode, { status: "FINISHED" });
  return matches.slice(-limit).reverse();
}

// Get live matches
export async function getLiveMatches(competitionCode?: string): Promise<ApiMatch[]> {
  if (competitionCode) {
    return getMatches(competitionCode, { status: "IN_PLAY" });
  }
  
  const data = await fetchFromApi<{ matches: ApiMatch[] }>(
    `/matches?status=IN_PLAY`,
    30 // Cache for 30 seconds for live data
  );
  return data.matches;
}

// Get teams for a competition
export async function getTeams(competitionCode: string): Promise<ApiTeam[]> {
  const data = await fetchFromApi<{ teams: ApiTeam[] }>(
    `/competitions/${competitionCode}/teams`,
    3600 // Cache for 1 hour
  );
  return data.teams;
}

// Get a single team
export async function getTeam(teamId: number): Promise<ApiTeam> {
  const data = await fetchFromApi<ApiTeam>(`/teams/${teamId}`, 3600);
  return data;
}

// Get team's matches
export async function getTeamMatches(
  teamId: number,
  options?: {
    status?: string;
    limit?: number;
  }
): Promise<ApiMatch[]> {
  const params = new URLSearchParams();
  if (options?.status) params.set("status", options.status);
  if (options?.limit) params.set("limit", options.limit.toString());

  const queryString = params.toString();
  const endpoint = `/teams/${teamId}/matches${queryString ? `?${queryString}` : ""}`;
  
  const data = await fetchFromApi<{ matches: ApiMatch[] }>(endpoint, 300);
  return data.matches;
}

// Get standings for a competition
export async function getStandings(competitionCode: string): Promise<ApiStanding[]> {
  const data = await fetchFromApi<{ standings: ApiStanding[] }>(
    `/competitions/${competitionCode}/standings`,
    300 // Cache for 5 minutes
  );
  return data.standings;
}

// Get head-to-head data between two teams
export async function getHeadToHead(matchId: number): Promise<{
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: { wins: number; draws: number; losses: number };
  awayTeam: { wins: number; draws: number; losses: number };
}> {
  const data = await fetchFromApi<{
    aggregates: {
      numberOfMatches: number;
      totalGoals: number;
      homeTeam: { wins: number; draws: number; losses: number };
      awayTeam: { wins: number; draws: number; losses: number };
    };
  }>(`/matches/${matchId}/head2head`, 3600);
  return data.aggregates;
}

// Helper to format match status for display
export function formatMatchStatus(status: ApiMatch["status"]): string {
  const statusMap: Record<ApiMatch["status"], string> = {
    SCHEDULED: "Scheduled",
    TIMED: "Scheduled",
    IN_PLAY: "Live",
    PAUSED: "Half Time",
    FINISHED: "Finished",
    SUSPENDED: "Suspended",
    POSTPONED: "Postponed",
    CANCELLED: "Cancelled",
    AWARDED: "Awarded",
  };
  return statusMap[status] || status;
}

// Helper to format date for display
export function formatMatchDate(utcDate: string): {
  date: string;
  time: string;
  relative: string;
} {
  const date = new Date(utcDate);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let relative: string;
  if (diffDays === 0) {
    relative = "Today";
  } else if (diffDays === 1) {
    relative = "Tomorrow";
  } else if (diffDays === -1) {
    relative = "Yesterday";
  } else if (diffDays > 0) {
    relative = `In ${diffDays} days`;
  } else {
    relative = `${Math.abs(diffDays)} days ago`;
  }

  return {
    date: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    relative,
  };
}

// Country code mapping for flags (TLA to ISO 3166-1 alpha-2)
const COUNTRY_CODES: Record<string, string> = {
  // Major teams - extend as needed
  ARG: "ar", BRA: "br", FRA: "fr", GER: "de", ESP: "es",
  ENG: "gb-eng", ITA: "it", POR: "pt", NED: "nl", BEL: "be",
  CRO: "hr", URU: "uy", SEN: "sn", USA: "us", MEX: "mx",
  JPN: "jp", KOR: "kr", AUS: "au", MAR: "ma", SUI: "ch",
  POL: "pl", DEN: "dk", WAL: "gb-wls", TUN: "tn", CAN: "ca",
  QAT: "qa", ECU: "ec", IRN: "ir", SRB: "rs", GHA: "gh",
  CMR: "cm", KSA: "sa", CRC: "cr", COL: "co", CHI: "cl",
  PER: "pe", NIG: "ng", ALG: "dz", EGY: "eg", RSA: "za",
  AUT: "at", CZE: "cz", UKR: "ua", RUS: "ru", SWE: "se",
  SCO: "gb-sct", IRL: "ie", NOR: "no", FIN: "fi", GRE: "gr",
  TUR: "tr", HUN: "hu", ROU: "ro", SVK: "sk", SVN: "si",
};

// Get flag URL for a team
export function getTeamFlagUrl(tla: string): string {
  if (!tla) return `https://flagcdn.com/w80/un.png`;
  const countryCode = COUNTRY_CODES[tla] || tla.toLowerCase();
  return `https://flagcdn.com/w80/${countryCode}.png`;
}

// Generate AI prediction based on team stats and form
export function generatePrediction(
  homeTeam: ApiTeam,
  awayTeam: ApiTeam,
  standings?: ApiStanding[]
): {
  prediction: string;
  confidence: number;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  suggestedBet: string;
  analysis: string;
} {
  // Find teams in standings for form data
  let homeStats = { points: 0, goalsFor: 0, goalsAgainst: 0, form: "" };
  let awayStats = { points: 0, goalsFor: 0, goalsAgainst: 0, form: "" };

  if (standings) {
    for (const standing of standings) {
      for (const entry of standing.table) {
        if (entry.team.id === homeTeam.id) {
          homeStats = {
            points: entry.points,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            form: entry.form || "",
          };
        }
        if (entry.team.id === awayTeam.id) {
          awayStats = {
            points: entry.points,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            form: entry.form || "",
          };
        }
      }
    }
  }

  // Simple probability calculation based on available stats
  const homeStrength = homeStats.points + homeStats.goalsFor * 0.5 + 5; // Home advantage
  const awayStrength = awayStats.points + awayStats.goalsFor * 0.5;
  const totalStrength = homeStrength + awayStrength + 10; // Base for draw

  let homeWinProb = Math.round((homeStrength / totalStrength) * 100);
  let awayWinProb = Math.round((awayStrength / totalStrength) * 100);
  let drawProb = 100 - homeWinProb - awayWinProb;

  // Normalize to ensure sum is 100
  if (drawProb < 15) drawProb = 15;
  if (drawProb > 35) drawProb = 35;
  const remaining = 100 - drawProb;
  const ratio = homeWinProb / (homeWinProb + awayWinProb) || 0.5;
  homeWinProb = Math.round(remaining * ratio);
  awayWinProb = remaining - homeWinProb;

  // Determine prediction
  let prediction: string;
  let suggestedBet: string;
  let confidence: number;

  if (homeWinProb > awayWinProb + 10) {
    prediction = `${homeTeam.shortName} Win`;
    suggestedBet = `${homeTeam.shortName} to win`;
    confidence = Math.min(homeWinProb + 10, 92);
  } else if (awayWinProb > homeWinProb + 10) {
    prediction = `${awayTeam.shortName} Win`;
    suggestedBet = `${awayTeam.shortName} to win`;
    confidence = Math.min(awayWinProb + 10, 92);
  } else {
    prediction = "Draw";
    suggestedBet = "Draw or BTTS";
    confidence = Math.min(drawProb + 15, 75);
  }

  const analysis = `Based on current tournament form and statistics, ${
    homeWinProb > awayWinProb
      ? `${homeTeam.shortName} has the edge with home advantage`
      : awayWinProb > homeWinProb
      ? `${awayTeam.shortName} shows stronger form coming into this match`
      : "both teams are evenly matched"
  }. ${
    homeStats.goalsFor > 0 || awayStats.goalsFor > 0
      ? `Goal-scoring form suggests ${
          homeStats.goalsFor > awayStats.goalsFor
            ? homeTeam.shortName
            : awayTeam.shortName
        } has the attacking edge.`
      : "Historical data suggests a competitive encounter."
  }`;

  return {
    prediction,
    confidence,
    homeWinProb,
    drawProb,
    awayWinProb,
    suggestedBet,
    analysis,
  };
}
