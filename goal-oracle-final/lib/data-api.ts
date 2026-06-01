// Data layer that integrates Football-Data.org API with fallback to mock data
import {
  getMatches,
  getTeams,
  getStandings,
  getTodaysMatches,
  getUpcomingMatches,
  getLiveMatches,
  getTeamMatches,
  getHeadToHead,
  formatMatchDate,
  formatMatchStatus,
  getTeamFlagUrl,
  generatePrediction,
  COMPETITIONS,
  type ApiMatch,
  type ApiTeam,
} from "./football-api";
import { teams as mockTeams, matches as mockMatches, type Team, type Match } from "./data";

// Configuration
const ACTIVE_COMPETITION = COMPETITIONS.WORLD_CUP;
const USE_MOCK_FALLBACK = true; // Fall back to mock data if API fails

// Transform API match to our Match interface
function transformApiMatch(
  apiMatch: ApiMatch,
  standings?: Awaited<ReturnType<typeof getStandings>>
): Match {
  const homeTeam = apiMatch.homeTeam;
  const awayTeam = apiMatch.awayTeam;
  const { date, time } = formatMatchDate(apiMatch.utcDate);
  
  // Generate slug from team names
  const slug = `${(homeTeam.shortName || homeTeam.name || "home").toLowerCase().replace(/\s+/g, "-")}-vs-${(awayTeam.shortName || awayTeam.name || "away").toLowerCase().replace(/\s+/g, "-")}`;
  
  // Generate AI prediction
  const prediction = generatePrediction(
    homeTeam as unknown as ApiTeam,
    awayTeam as unknown as ApiTeam,
    standings
  );
  
  // Determine winner from prediction
  const winner: "home" | "away" | "draw" = 
    prediction.homeWinProb > prediction.awayWinProb + 5 ? "home" :
    prediction.awayWinProb > prediction.homeWinProb + 5 ? "away" : "draw";
  
  // Predict score based on probabilities
  const predictedHomeGoals = winner === "home" ? 2 : winner === "draw" ? 1 : 1;
  const predictedAwayGoals = winner === "away" ? 2 : winner === "draw" ? 1 : 1;

  return {
    id: apiMatch.id.toString(),
    slug,
    homeTeam: (homeTeam.shortName || homeTeam.name || "home").toLowerCase().replace(/\s+/g, "-"),
    awayTeam: (awayTeam.shortName || awayTeam.name || "away").toLowerCase().replace(/\s+/g, "-"),
    date: apiMatch.utcDate.split("T")[0],
    time,
    venue: `${apiMatch.stage} - Matchday ${apiMatch.matchday}`,
    stage: apiMatch.stage.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    prediction: {
      winner,
      confidence: prediction.confidence,
      predictedScore: { home: predictedHomeGoals, away: predictedAwayGoals },
      analysis: prediction.analysis,
      keyFactors: [
        `${homeTeam.shortName} win probability: ${prediction.homeWinProb}%`,
        `Draw probability: ${prediction.drawProb}%`,
        `${awayTeam.shortName} win probability: ${prediction.awayWinProb}%`,
        prediction.suggestedBet,
      ],
    },
    odds: apiMatch.odds ? [
      {
        bookmaker: "Market Average",
        home: apiMatch.odds.homeWin || 2.5,
        draw: apiMatch.odds.draw || 3.2,
        away: apiMatch.odds.awayWin || 2.8,
      },
    ] : [
      { bookmaker: "Bet365", home: 2.40, draw: 3.20, away: 2.90 },
      { bookmaker: "William Hill", home: 2.35, draw: 3.25, away: 2.95 },
    ],
    headToHead: {
      homeWins: 5,
      draws: 3,
      awayWins: 4,
      lastMatches: [],
    },
    injuries: [],
    suggestedBets: [
      {
        type: "Match Result",
        selection: prediction.suggestedBet,
        odds: winner === "home" ? 2.40 : winner === "away" ? 2.90 : 3.20,
        confidence: prediction.confidence,
      },
      {
        type: "Both Teams to Score",
        selection: "Yes",
        odds: 1.75,
        confidence: 65,
      },
    ],
    isFeatured: apiMatch.stage.includes("FINAL") || apiMatch.stage.includes("SEMI"),
    isTrending: true,
    // Additional API data
    _apiData: {
      status: apiMatch.status,
      statusText: formatMatchStatus(apiMatch.status),
      score: apiMatch.score,
      matchday: apiMatch.matchday,
      group: apiMatch.group,
      homeTeamCrest: homeTeam.crest || getTeamFlagUrl(homeTeam.tla),
      awayTeamCrest: awayTeam.crest || getTeamFlagUrl(awayTeam.tla),
      homeTeamTla: homeTeam.tla,
      awayTeamTla: awayTeam.tla,
      homeTeamName: homeTeam.name,
      awayTeamName: awayTeam.name,
      isLive: apiMatch.status === "IN_PLAY" || apiMatch.status === "PAUSED",
      isFinished: apiMatch.status === "FINISHED",
    },
  } as Match & { _apiData: unknown };
}

// Transform API team to our Team interface
function transformApiTeam(apiTeam: ApiTeam, standings?: Awaited<ReturnType<typeof getStandings>>): Team {
  // Find team stats from standings
  let stats = { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
  let form: ("W" | "D" | "L")[] = [];
  let position = 0;
  let points = 0;

  if (standings) {
    for (const standing of standings) {
      const entry = standing.table.find(t => t.team.id === apiTeam.id);
      if (entry) {
        stats = {
          wins: entry.won,
          draws: entry.draw,
          losses: entry.lost,
          goalsFor: entry.goalsFor,
          goalsAgainst: entry.goalsAgainst,
        };
        form = (entry.form?.split(",").slice(0, 5) || []).map(f => {
          if (f === "W") return "W";
          if (f === "D") return "D";
          return "L";
        }) as ("W" | "D" | "L")[];
        position = entry.position;
        points = entry.points;
        break;
      }
    }
  }

  return {
    id: apiTeam.id.toString(),
    name: apiTeam.name,
    code: apiTeam.tla,
    flag: apiTeam.crest || getTeamFlagUrl(apiTeam.tla),
    group: "", // Will be set from standings
    ranking: position || 0,
    stats,
    form: form.length > 0 ? form : ["W", "D", "W"],
    strengths: ["Competitive squad", "Tournament experience"],
    weaknesses: ["TBD based on performance"],
    starPlayers: [],
    tournamentProbability: 5,
    description: `${apiTeam.name} - competing in the World Cup.`,
    _apiData: {
      crest: apiTeam.crest,
      tla: apiTeam.tla,
      coach: apiTeam.coach,
      founded: apiTeam.founded,
      venue: apiTeam.venue,
      points,
    },
  } as Team & { _apiData: unknown };
}

// Fetch all matches with API, fallback to mock
export async function fetchAllMatches(): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getMatches(ACTIVE_COMPETITION),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch matches from API:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockMatches;
  }
  
  return [];
}

// Fetch upcoming matches
export async function fetchUpcomingMatches(limit = 10): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getUpcomingMatches(ACTIVE_COMPETITION, limit),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch upcoming matches:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockMatches.filter(m => new Date(m.date) >= new Date()).slice(0, limit);
  }
  
  return [];
}

// Fetch today's matches
export async function fetchTodaysMatches(): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getTodaysMatches(ACTIVE_COMPETITION),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch today's matches:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    const today = new Date().toISOString().split("T")[0];
    return mockMatches.filter(m => m.date === today);
  }
  
  return [];
}

// Fetch live matches
export async function fetchLiveMatches(): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getLiveMatches(ACTIVE_COMPETITION),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch live matches:", error);
  }
  
  return [];
}

// Fetch a single match by slug
export async function fetchMatchBySlug(slug: string): Promise<Match | null> {
  try {
    const matches = await fetchAllMatches();
    const match = matches.find(m => m.slug === slug);
    if (match) return match;
  } catch (error) {
    console.error("Failed to fetch match:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockMatches.find(m => m.slug === slug) || null;
  }
  
  return null;
}

// Fetch all teams
export async function fetchAllTeams(): Promise<Team[]> {
  try {
    const [apiTeams, standings] = await Promise.all([
      getTeams(ACTIVE_COMPETITION),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiTeams && apiTeams.length > 0) {
      return apiTeams.map(t => transformApiTeam(t, standings));
    }
  } catch (error) {
    console.error("Failed to fetch teams from API:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockTeams;
  }
  
  return [];
}

// Fetch a single team by ID
export async function fetchTeamById(id: string): Promise<Team | null> {
  try {
    const teams = await fetchAllTeams();
    const team = teams.find(t => t.id === id || t.code.toLowerCase() === id.toLowerCase());
    if (team) return team;
  } catch (error) {
    console.error("Failed to fetch team:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockTeams.find(t => t.id === id) || null;
  }
  
  return null;
}

// Fetch team's matches
export async function fetchTeamMatches(teamId: string, limit = 10): Promise<Match[]> {
  try {
    const numericId = parseInt(teamId, 10);
    if (!isNaN(numericId)) {
      const [apiMatches, standings] = await Promise.all([
        getTeamMatches(numericId, { limit }),
        getStandings(ACTIVE_COMPETITION).catch(() => undefined),
      ]);
      
      if (apiMatches && apiMatches.length > 0) {
        return apiMatches.map(m => transformApiMatch(m, standings));
      }
    }
  } catch (error) {
    console.error("Failed to fetch team matches:", error);
  }
  
  if (USE_MOCK_FALLBACK) {
    return mockMatches.filter(
      m => m.homeTeam === teamId || m.awayTeam === teamId
    ).slice(0, limit);
  }
  
  return [];
}

// Fetch head-to-head stats (requires match ID)
export async function fetchHeadToHead(matchId: string): Promise<{
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: { wins: number; draws: number; losses: number };
  awayTeam: { wins: number; draws: number; losses: number };
} | null> {
  try {
    const numericId = parseInt(matchId, 10);
    if (!isNaN(numericId)) {
      return await getHeadToHead(numericId);
    }
  } catch (error) {
    console.error("Failed to fetch head-to-head:", error);
  }
  
  return null;
}

// Fetch standings/groups
export async function fetchStandings(): Promise<{
  group: string;
  teams: { team: Team; points: number; played: number; gd: number }[];
}[]> {
  try {
    const [standings, apiTeams] = await Promise.all([
      getStandings(ACTIVE_COMPETITION),
      getTeams(ACTIVE_COMPETITION),
    ]);
    
    if (standings && standings.length > 0) {
      return standings.map(standing => ({
        group: standing.group || standing.stage,
        teams: standing.table.map(entry => {
          const apiTeam = apiTeams.find(t => t.id === entry.team.id);
          return {
            team: transformApiTeam(apiTeam || entry.team as unknown as ApiTeam, standings),
            points: entry.points,
            played: entry.playedGames,
            gd: entry.goalDifference,
          };
        }),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch standings:", error);
  }
  
  // Mock standings from teams
  if (USE_MOCK_FALLBACK) {
    const groups = [...new Set(mockTeams.map(t => t.group))];
    return groups.map(group => ({
      group: `Group ${group}`,
      teams: mockTeams
        .filter(t => t.group === group)
        .map(team => ({
          team,
          points: team.stats.wins * 3 + team.stats.draws,
          played: team.stats.wins + team.stats.draws + team.stats.losses,
          gd: team.stats.goalsFor - team.stats.goalsAgainst,
        }))
        .sort((a, b) => b.points - a.points),
    }));
  }
  
  return [];
}

// Check if API is available and working
export async function checkApiStatus(): Promise<{
  available: boolean;
  competition: string | null;
  matchCount: number;
  error?: string;
}> {
  try {
    const matches = await getMatches(ACTIVE_COMPETITION);
    return {
      available: true,
      competition: ACTIVE_COMPETITION,
      matchCount: matches.length,
    };
  } catch (error) {
    return {
      available: false,
      competition: null,
      matchCount: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Export the active competition for reference
export { ACTIVE_COMPETITION };
