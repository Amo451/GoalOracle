// Data layer that integrates Football API with fallback to mock data
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

// Configuration - European Top Leagues
const ACTIVE_COMPETITIONS = [
  COMPETITIONS.PREMIER_LEAGUE,
  COMPETITIONS.LA_LIGA,
  COMPETITIONS.BUNDESLIGA,
  COMPETITIONS.SERIE_A,
  COMPETITIONS.LIGUE_1,
  COMPETITIONS.CHAMPIONS_LEAGUE,
];

const USE_MOCK_FALLBACK = true;

// Helper to fetch from all active competitions
async function fetchFromAllCompetitions<T>(
  fetchFn: (competition: string) => Promise<T[]>,
  filterUnique = true
): Promise<T[]> {
  const results: T[] = [];
  const seenIds = new Set<number>();
  
  for (const competition of ACTIVE_COMPETITIONS) {
    try {
      const data = await fetchFn(competition).catch(() => []);
      if (filterUnique) {
        for (const item of data) {
          const itemId = (item as any).id;
          if (itemId && !seenIds.has(itemId)) {
            seenIds.add(itemId);
            results.push(item);
          }
        }
      } else {
        results.push(...data);
      }
    } catch (error) {
      console.error(`Failed to fetch from ${competition}:`, error);
    }
  }
  
  return results;
}

// Transform API match to our Match interface
function transformApiMatch(
  apiMatch: ApiMatch,
  standings?: Awaited<ReturnType<typeof getStandings>>
): Match {
  const homeTeam = apiMatch.homeTeam;
  const awayTeam = apiMatch.awayTeam;
  const { date, time } = formatMatchDate(apiMatch.utcDate);
  
  const slug = `${(homeTeam.shortName || homeTeam.name || "home").toLowerCase().replace(/\s+/g, "-")}-vs-${(awayTeam.shortName || awayTeam.name || "away").toLowerCase().replace(/\s+/g, "-")}`;
  
  const prediction = generatePrediction(
    homeTeam as unknown as ApiTeam,
    awayTeam as unknown as ApiTeam,
    standings
  );
  
  const winner: "home" | "away" | "draw" = 
    prediction.homeWinProb > prediction.awayWinProb + 5 ? "home" :
    prediction.awayWinProb > prediction.homeWinProb + 5 ? "away" : "draw";
  
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

  const mockTeam = mockTeams.find(t => t.id === apiTeam.id.toString() || t.code === apiTeam.tla);
  
  return {
    id: apiTeam.id.toString(),
    name: apiTeam.name,
    code: apiTeam.tla,
    flag: apiTeam.crest || getTeamFlagUrl(apiTeam.tla),
    group: mockTeam?.group || "",
    league: mockTeam?.league || "European League",
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
    description: mockTeam?.description || `${apiTeam.name} - competing in European football.`,
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

// Fetch all matches from all active competitions
export async function fetchAllMatches(): Promise<Match[]> {
  try {
    const allMatches = await fetchFromAllCompetitions(
      (competition: string) => getMatches(competition).catch(() => [])
    );
    
    if (allMatches.length > 0) {
      const allStandings = await fetchFromAllCompetitions(
        (competition: string) => getStandings(competition).catch(() => [])
      );
      const standings = allStandings.flat();
      return allMatches.map((m: ApiMatch) => transformApiMatch(m, standings));
    }
  } catch (error) {
    console.error("Failed to fetch matches from API:", error);
  }
  
  console.log("Using mock data for matches");
  return mockMatches.map((match: Match) => ({
    ...match,
    prediction: match.prediction || {
      winner: "home" as const,
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

export async function fetchAllTeams(): Promise<Team[]> {
  try {
    const allTeams = await fetchFromAllCompetitions(
      (competition: string) => getTeams(competition).catch(() => [])
    );
    
    if (allTeams.length > 0) {
      const allStandings = await fetchFromAllCompetitions(
        (competition: string) => getStandings(competition).catch(() => [])
      );
      const standings = allStandings.flat();
      return allTeams.map((t: ApiTeam) => transformApiTeam(t, standings));
    }
  } catch (error) {
    console.error("Failed to fetch teams from API:", error);
  }
  
  console.log("Using mock data for teams");
  return mockTeams.map((team: Team) => ({
    ...team,
    league: team.league || "European League",
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

export async function fetchTeamById(id: string): Promise<Team | null> {
  try {
    const teams = await fetchAllTeams();
    const team = teams.find((t: Team) => t.id === id || t.code?.toLowerCase() === id.toLowerCase());
    if (team) return team;
  } catch (error) {
    console.error("Failed to fetch team:", error);
  }
  
  return mockTeams.find((t: Team) => t.id === id) || null;
}

export { ACTIVE_COMPETITIONS };

// Get today's matches
export async function fetchTodaysMatches(): Promise<Match[]> {
  const matches = await fetchAllMatches();

  const today = new Date().toISOString().split("T")[0];

  return matches.filter(match => match.date === today);
}

// Get upcoming matches
export async function fetchUpcomingMatches(): Promise<Match[]> {
  const matches = await fetchAllMatches();

  const today = new Date().toISOString().split("T")[0];

  return matches
    .filter(match => match.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// API health check
export async function checkApiStatus() {
  try {
    await fetchAllMatches();

    return {
      connected: true,
      usingFallback: false,
    };
  } catch {
    return {
      connected: false,
      usingFallback: true,
    };
  }
}
