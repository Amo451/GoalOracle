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
const ACTIVE_COMPETITION = COMPETITIONS.PREMIER_LEAGUE, LALIGA, BUNDESLIGA, CHAMPIONS_LEAGUE;
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
  let stats = { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 };
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
          points: entry.points,
          goalDifference: entry.goalDifference,
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

  // Find mock team to get additional data
  const mockTeam = mockTeams.find(t => t.id === apiTeam.id.toString() || t.code === apiTeam.tla);
  
  return {
    id: apiTeam.id.toString(),
    name: apiTeam.name,
    code: apiTeam.tla,
    flag: apiTeam.crest || getTeamFlagUrl(apiTeam.tla),
    group: mockTeam?.group || "",
    league: "World Cup", // Add league field
    ranking: position || mockTeam?.ranking || 0,
    powerRating: mockTeam?.powerRating || 75,
    overallRating: mockTeam?.overallRating || 75,
    aiRating: mockTeam?.aiRating || 75,
    stats: {
      wins: stats.wins || mockTeam?.stats?.wins || 0,
      draws: stats.draws || mockTeam?.stats?.draws || 0,
      losses: stats.losses || mockTeam?.stats?.losses || 0,
      goalsFor: stats.goalsFor || mockTeam?.stats?.goalsFor || 0,
      goalsAgainst: stats.goalsAgainst || mockTeam?.stats?.goalsAgainst || 0,
      points: points || mockTeam?.stats?.points || 0,
      goalDifference: stats.goalDifference || mockTeam?.stats?.goalDifference || 0,
    },
    form: form.length > 0 ? form : mockTeam?.form || ["W", "D", "W"],
    strengths: mockTeam?.strengths || ["Competitive squad", "Tournament experience"],
    weaknesses: mockTeam?.weaknesses || ["TBD based on performance"],
    starPlayers: mockTeam?.starPlayers || [],
    tournamentProbability: mockTeam?.tournamentProbability || 5,
    description: mockTeam?.description || `${apiTeam.name} - competing in the World Cup.`,
    formation: mockTeam?.formation || "4-3-3",
    playingStyle: mockTeam?.playingStyle || "Possession-based",
    attackFocus: mockTeam?.attackFocus || "Wide play",
    defensiveStyle: mockTeam?.defensiveStyle || "High press",
    injuries: mockTeam?.injuries || [],
    topScorers: mockTeam?.topScorers || [],
    h2hWins: mockTeam?.h2hWins || 0,
    h2hDraws: mockTeam?.h2hDraws || 0,
    h2hLosses: mockTeam?.h2hLosses || 0,
    h2hGoalsScored: mockTeam?.h2hGoalsScored || 0,
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
      getMatches(ACTIVE_COMPETITION).catch(() => []),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch matches from API:", error);
  }
  
  // Always fallback to mock data
  console.log("Using mock data for matches");
  return mockMatches.map(match => ({
    ...match,
    prediction: match.prediction || {
      winner: "home",
      confidence: 70,
      predictedScore: { home: 2, away: 1 },
      analysis: "Match analysis based on team form and statistics.",
      keyFactors: ["Home advantage", "Recent form", "Head-to-head record"],
    },
    odds: match.odds || [
      { bookmaker: "Bet365", home: 2.40, draw: 3.20, away: 2.90 },
      { bookmaker: "William Hill", home: 2.35, draw: 3.25, away: 2.95 },
    ],
    suggestedBets: match.suggestedBets || [
      { type: "Match Result", selection: "Home Win", odds: 2.40, confidence: 70 },
      { type: "Both Teams to Score", selection: "Yes", odds: 1.75, confidence: 65 },
    ],
  }));
}

// Fetch upcoming matches
export async function fetchUpcomingMatches(limit = 10): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getUpcomingMatches(ACTIVE_COMPETITION, limit).catch(() => []),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch upcoming matches:", error);
  }
  
  // Always fallback to mock data
  return mockMatches
    .filter(m => new Date(m.date) >= new Date())
    .slice(0, limit)
    .map(match => ({
      ...match,
      prediction: match.prediction || {
        winner: "home",
        confidence: 70,
        predictedScore: { home: 2, away: 1 },
        analysis: "Upcoming match analysis.",
        keyFactors: ["Recent form", "Head-to-head", "Team news"],
      },
    }));
}

// Fetch today's matches
export async function fetchTodaysMatches(): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getTodaysMatches(ACTIVE_COMPETITION).catch(() => []),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch today's matches:", error);
  }
  
  // Always fallback to mock data
  const today = new Date().toISOString().split("T")[0];
  return mockMatches.filter(m => m.date === today);
}

// Fetch live matches
export async function fetchLiveMatches(): Promise<Match[]> {
  try {
    const [apiMatches, standings] = await Promise.all([
      getLiveMatches(ACTIVE_COMPETITION).catch(() => []),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiMatches && apiMatches.length > 0) {
      return apiMatches.map(m => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch live matches:", error);
  }
  
  // Return empty array for live matches if no API data
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
  
  return mockMatches.find(m => m.slug === slug) || null;
}

// Fetch all teams
export async function fetchAllTeams(): Promise<Team[]> {
  try {
    const [apiTeams, standings] = await Promise.all([
      getTeams(ACTIVE_COMPETITION).catch(() => []),
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
    ]);
    
    if (apiTeams && apiTeams.length > 0) {
      return apiTeams.map(t => transformApiTeam(t, standings));
    }
  } catch (error) {
    console.error("Failed to fetch teams from API:", error);
  }
  
  // Always fallback to mock data with enhanced fields
  console.log("Using mock data for teams");
  return mockTeams.map(team => ({
    ...team,
    league: team.league || "World Cup",
    powerRating: team.powerRating || 75,
    overallRating: team.overallRating || 75,
    aiRating: team.aiRating || 75,
    formation: team.formation || "4-3-3",
    playingStyle: team.playingStyle || "Possession-based",
    attackFocus: team.attackFocus || "Wide play",
    defensiveStyle: team.defensiveStyle || "High press",
    injuries: team.injuries || [],
    topScorers: team.topScorers || [],
    h2hWins: team.h2hWins || 0,
    h2hDraws: team.h2hDraws || 0,
    h2hLosses: team.h2hLosses || 0,
    h2hGoalsScored: team.h2hGoalsScored || 0,
    stats: {
      ...team.stats,
      points: team.stats?.points || 0,
      goalDifference: (team.stats?.goalsFor || 0) - (team.stats?.goalsAgainst || 0),
    },
  }));
}

// Fetch a single team by ID
export async function fetchTeamById(id: string): Promise<Team | null> {
  try {
    const teams = await fetchAllTeams();
    const team = teams.find(t => t.id === id || t.code?.toLowerCase() === id.toLowerCase());
    if (team) return team;
  } catch (error) {
    console.error("Failed to fetch team:", error);
  }
  
  return mockTeams.find(t => t.id === id) || null;
}

// Fetch team's matches
export async function fetchTeamMatches(teamId: string, limit = 10): Promise<Match[]> {
  try {
    const numericId = parseInt(teamId, 10);
    if (!isNaN(numericId)) {
      const [apiMatches, standings] = await Promise.all([
        getTeamMatches(numericId, { limit }).catch(() => []),
        getStandings(ACTIVE_COMPETITION).catch(() => undefined),
      ]);
      
      if (apiMatches && apiMatches.length > 0) {
        return apiMatches.map(m => transformApiMatch(m, standings));
      }
    }
  } catch (error) {
    console.error("Failed to fetch team matches:", error);
  }
  
  // Always fallback to mock data
  return mockMatches.filter(
    m => m.homeTeam === teamId || m.awayTeam === teamId
  ).slice(0, limit);
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
      return await getHeadToHead(numericId).catch(() => null);
    }
  } catch (error) {
    console.error("Failed to fetch head-to-head:", error);
  }
  
  // Return mock H2H data
  return {
    numberOfMatches: 10,
    totalGoals: 25,
    homeTeam: { wins: 5, draws: 3, losses: 2 },
    awayTeam: { wins: 2, draws: 3, losses: 5 },
  };
}

// Fetch standings/groups
export async function fetchStandings(): Promise<{
  group: string;
  teams: { team: Team; points: number; played: number; gd: number }[];
}[]> {
  try {
    const [standings, apiTeams] = await Promise.all([
      getStandings(ACTIVE_COMPETITION).catch(() => undefined),
      getTeams(ACTIVE_COMPETITION).catch(() => []),
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
  const groups = [...new Set(mockTeams.map(t => t.group))];
  return groups.map(group => ({
    group: `Group ${group}`,
    teams: mockTeams
      .filter(t => t.group === group)
      .map(team => ({
        team: {
          ...team,
          league: team.league || "World Cup",
          powerRating: team.powerRating || 75,
          overallRating: team.overallRating || 75,
        },
        points: (team.stats?.wins || 0) * 3 + (team.stats?.draws || 0),
        played: (team.stats?.wins || 0) + (team.stats?.draws || 0) + (team.stats?.losses || 0),
        gd: (team.stats?.goalsFor || 0) - (team.stats?.goalsAgainst || 0),
      }))
      .sort((a, b) => b.points - a.points),
  }));
}

// Check if API is available and working
export async function checkApiStatus(): Promise<{
  available: boolean;
  competition: string | null;
  matchCount: number;
  error?: string;
}> {
  try {
    const matches = await getMatches(ACTIVE_COMPETITION).catch(() => []);
    return {
      available: matches.length > 0,
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
