// Sample data for GoalOracle AI - European Football Leagues

export interface Team {
  id: string
  name: string
  code: string
  flag: string
  group: string
  league: string // Added: European league name
  ranking: number
  powerRating: number // Added: Team power rating
  overallRating: number // Added: Overall team rating
  aiRating: number // Added: AI rating
  stats: {
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    points: number // Added: League points
    goalDifference: number // Added: Goal difference
  }
  form: ('W' | 'D' | 'L')[]
  strengths: string[]
  weaknesses: string[]
  starPlayers: {
    name: string
    position: string
    rating: number
  }[]
  tournamentProbability: number
  description: string
  // New fields for team analysis
  formation: string
  playingStyle: string
  attackFocus: string
  defensiveStyle: string
  injuries: {
    player: string
    status: string
    returnDate?: string
  }[]
  topScorers: {
    name: string
    goals: number
    assists: number
  }[]
  h2hWins: number
  h2hDraws: number
  h2hLosses: number
  h2hGoalsScored: number
}

export interface Match {
  id: string
  slug: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  stage: string
  result?: 'W' | 'D' | 'L' // Added: Match result
  homeScore?: number // Added: Home team score
  awayScore?: number // Added: Away team score
  prediction: {
    winner: 'home' | 'away' | 'draw'
    confidence: number
    predictedScore: {
      home: number
      away: number
    }
    analysis: string
    keyFactors: string[]
  }
  odds: {
    bookmaker: string
    home: number
    draw: number
    away: number
  }[]
  headToHead: {
    homeWins: number
    draws: number
    awayWins: number
    lastMatches: {
      date: string
      score: string
      winner: string
    }[]
  }
  injuries: {
    team: string
    player: string
    status: string
  }[]
  suggestedBets: {
    type: string
    selection: string
    odds: number
    confidence: number
  }[]
  isFeatured?: boolean
  isTrending?: boolean
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'predictions' | 'betting-tips' | 'streaming' | 'analysis' | 'news'
  author: string
  date: string
  readTime: number
  image: string
  tags: string[]
}

export interface Bookmaker {
  id: string
  name: string
  logo: string
  rating: number
  welcomeBonus: string
  bonusValue: string
  pros: string[]
  cons: string[]
  url: string
  featured?: boolean
}

// Teams Data - European Leagues
export const teams: Team[] = [
  {
    id: 'man-city',
    name: 'Manchester City',
    code: 'MCI',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'Premier League',
    league: 'Premier League',
    ranking: 1,
    powerRating: 92,
    overallRating: 94,
    aiRating: 93,
    stats: { 
      wins: 28, 
      draws: 5, 
      losses: 3, 
      goalsFor: 89, 
      goalsAgainst: 28,
      points: 89,
      goalDifference: 61
    },
    form: ['W', 'W', 'D', 'W', 'W'],
    strengths: ['Possession dominance', 'Squad depth', 'Pep Guardiola tactics', 'Attacking creativity'],
    weaknesses: ['Over-reliance on Haaland', 'Defensive transitions'],
    starPlayers: [
      { name: 'Erling Haaland', position: 'Striker', rating: 94 },
      { name: 'Kevin De Bruyne', position: 'Midfielder', rating: 92 },
      { name: 'Phil Foden', position: 'Forward', rating: 89 }
    ],
    tournamentProbability: 22.5,
    description: 'Reigning Premier League champions with a star-studded squad and world-class manager.',
    formation: '4-3-3',
    playingStyle: 'Possession-based attacking',
    attackFocus: 'Width and overlapping fullbacks',
    defensiveStyle: 'High press with compact shape',
    injuries: [],
    topScorers: [
      { name: 'Erling Haaland', goals: 27, assists: 5 },
      { name: 'Phil Foden', goals: 11, assists: 7 },
      { name: 'Julian Alvarez', goals: 9, assists: 6 }
    ],
    h2hWins: 12,
    h2hDraws: 5,
    h2hLosses: 8,
    h2hGoalsScored: 42
  },
  {
    id: 'real-madrid',
    name: 'Real Madrid',
    code: 'RMA',
    flag: '🇪🇸',
    group: 'La Liga',
    league: 'La Liga',
    ranking: 2,
    powerRating: 90,
    overallRating: 92,
    aiRating: 91,
    stats: { 
      wins: 26, 
      draws: 6, 
      losses: 4, 
      goalsFor: 78, 
      goalsAgainst: 30,
      points: 84,
      goalDifference: 48
    },
    form: ['W', 'W', 'L', 'W', 'D'],
    strengths: ['Champions League pedigree', 'Counter-attacking', 'Midfield creativity'],
    weaknesses: ['Defensive injuries', 'Ageing squad'],
    starPlayers: [
      { name: 'Jude Bellingham', position: 'Midfielder', rating: 91 },
      { name: 'Vinicius Jr.', position: 'Forward', rating: 93 },
      { name: 'Rodrygo', position: 'Forward', rating: 88 }
    ],
    tournamentProbability: 18.7,
    description: 'European giants with a record 14 Champions League titles and a squad full of world-class talent.',
    formation: '4-3-3',
    playingStyle: 'Direct counter-attacking',
    attackFocus: 'Speed on the wings',
    defensiveStyle: 'Low block with quick transitions',
    injuries: [
      { player: 'David Alaba', status: 'Out (ACL)', returnDate: '2026-08-15' },
      { player: 'Thibaut Courtois', status: 'Doubtful', returnDate: '2026-07-20' }
    ],
    topScorers: [
      { name: 'Vinicius Jr.', goals: 18, assists: 8 },
      { name: 'Jude Bellingham', goals: 15, assists: 6 },
      { name: 'Rodrygo', goals: 12, assists: 5 }
    ],
    h2hWins: 15,
    h2hDraws: 4,
    h2hLosses: 9,
    h2hGoalsScored: 48
  },
  {
    id: 'bayern',
    name: 'Bayern Munich',
    code: 'FCB',
    flag: '🇩🇪',
    group: 'Bundesliga',
    league: 'Bundesliga',
    ranking: 3,
    powerRating: 88,
    overallRating: 90,
    aiRating: 89,
    stats: { 
      wins: 25, 
      draws: 7, 
      losses: 2, 
      goalsFor: 82, 
      goalsAgainst: 25,
      points: 82,
      goalDifference: 57
    },
    form: ['W', 'W', 'W', 'D', 'W'],
    strengths: ['Bundesliga dominance', 'Attacking firepower', 'Squad depth'],
    weaknesses: ['European consistency', 'Key player injuries'],
    starPlayers: [
      { name: 'Harry Kane', position: 'Striker', rating: 90 },
      { name: 'Jamal Musiala', position: 'Midfielder', rating: 89 },
      { name: 'Leroy Sané', position: 'Winger', rating: 87 }
    ],
    tournamentProbability: 16.3,
    description: 'German powerhouse with a rich history of domestic and European success.',
    formation: '4-2-3-1',
    playingStyle: 'High-pressing attacking',
    attackFocus: 'Central combination play',
    defensiveStyle: 'Aggressive high line',
    injuries: [
      { player: 'Matthijs de Ligt', status: 'Doubtful', returnDate: '2026-07-28' }
    ],
    topScorers: [
      { name: 'Harry Kane', goals: 28, assists: 7 },
      { name: 'Leroy Sané', goals: 13, assists: 9 },
      { name: 'Jamal Musiala', goals: 10, assists: 12 }
    ],
    h2hWins: 18,
    h2hDraws: 6,
    h2hLosses: 5,
    h2hGoalsScored: 56
  },
  {
    id: 'psg',
    name: 'Paris Saint-Germain',
    code: 'PSG',
    flag: '🇫🇷',
    group: 'Ligue 1',
    league: 'Ligue 1',
    ranking: 4,
    powerRating: 87,
    overallRating: 88,
    aiRating: 87,
    stats: { 
      wins: 22, 
      draws: 8, 
      losses: 4, 
      goalsFor: 75, 
      goalsAgainst: 32,
      points: 74,
      goalDifference: 43
    },
    form: ['W', 'D', 'W', 'W', 'L'],
    strengths: ['Individual brilliance', 'Attacking talent', 'French dominance'],
    weaknesses: ['Team cohesion', 'Defensive structure'],
    starPlayers: [
      { name: 'Kylian Mbappé', position: 'Forward', rating: 94 },
      { name: 'Ousmane Dembélé', position: 'Winger', rating: 87 },
      { name: 'Achraf Hakimi', position: 'Fullback', rating: 86 }
    ],
    tournamentProbability: 14.2,
    description: 'French giants with superstar talent and domestic dominance.',
    formation: '4-3-3',
    playingStyle: 'Counter-attacking with pace',
    attackFocus: 'Direct runs in behind',
    defensiveStyle: 'Medium block with pressing triggers',
    injuries: [
      { player: 'Presnel Kimpembe', status: 'Out', returnDate: '2026-09-01' }
    ],
    topScorers: [
      { name: 'Kylian Mbappé', goals: 24, assists: 8 },
      { name: 'Gonçalo Ramos', goals: 14, assists: 4 },
      { name: 'Ousmane Dembélé', goals: 8, assists: 12 }
    ],
    h2hWins: 10,
    h2hDraws: 7,
    h2hLosses: 8,
    h2hGoalsScored: 38
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    code: 'BAR',
    flag: '🇪🇸',
    group: 'La Liga',
    league: 'La Liga',
    ranking: 5,
    powerRating: 86,
    overallRating: 87,
    aiRating: 86,
    stats: { 
      wins: 21, 
      draws: 9, 
      losses: 4, 
      goalsFor: 68, 
      goalsAgainst: 29,
      points: 72,
      goalDifference: 39
    },
    form: ['W', 'D', 'W', 'L', 'W'],
    strengths: ['Youth development', 'Possession football', 'Technical quality'],
    weaknesses: ['Financial constraints', 'European struggles'],
    starPlayers: [
      { name: 'Lamine Yamal', position: 'Forward', rating: 88 },
      { name: 'Pedri', position: 'Midfielder', rating: 87 },
      { name: 'Gavi', position: 'Midfielder', rating: 87 }
    ],
    tournamentProbability: 12.8,
    description: 'Spanish giants known for their beautiful football and world-class youth academy.',
    formation: '4-3-3',
    playingStyle: 'Tiki-taka possession',
    attackFocus: 'Through the middle',
    defensiveStyle: 'High press with positional discipline',
    injuries: [
      { player: 'Raphinha', status: 'Fit' },
      { player: 'João Cancelo', status: 'Doubtful', returnDate: '2026-07-15' }
    ],
    topScorers: [
      { name: 'Lamine Yamal', goals: 16, assists: 10 },
      { name: 'Ferran Torres', goals: 12, assists: 5 },
      { name: 'Robert Lewandowski', goals: 11, assists: 6 }
    ],
    h2hWins: 14,
    h2hDraws: 8,
    h2hLosses: 7,
    h2hGoalsScored: 45
  },
  {
    id: 'liverpool',
    name: 'Liverpool',
    code: 'LIV',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'Premier League',
    league: 'Premier League',
    ranking: 6,
    powerRating: 85,
    overallRating: 86,
    aiRating: 85,
    stats: { 
      wins: 20, 
      draws: 8, 
      losses: 6, 
      goalsFor: 72, 
      goalsAgainst: 35,
      points: 68,
      goalDifference: 37
    },
    form: ['L', 'W', 'W', 'D', 'W'],
    strengths: ['High-intensity pressing', 'Anfield atmosphere', 'Klopp\'s system'],
    weaknesses: ['Squad transitions', 'Injury prone squad'],
    starPlayers: [
      { name: 'Mohamed Salah', position: 'Forward', rating: 91 },
      { name: 'Darwin Núñez', position: 'Striker', rating: 86 },
      { name: 'Alexis Mac Allister', position: 'Midfielder', rating: 86 }
    ],
    tournamentProbability: 11.5,
    description: 'Historic English club with a passionate fanbase and attacking football tradition.',
    formation: '4-3-3',
    playingStyle: 'High-pressing heavy metal',
    attackFocus: 'Width and crossing',
    defensiveStyle: 'Aggressive gegenpress',
    injuries: [
      { player: 'Alisson Becker', status: 'Fit' },
      { player: 'Trent Alexander-Arnold', status: 'Doubtful', returnDate: '2026-07-22' }
    ],
    topScorers: [
      { name: 'Mohamed Salah', goals: 21, assists: 9 },
      { name: 'Darwin Núñez', goals: 15, assists: 6 },
      { name: 'Luis Díaz', goals: 9, assists: 7 }
    ],
    h2hWins: 11,
    h2hDraws: 6,
    h2hLosses: 10,
    h2hGoalsScored: 40
  },
  {
    id: 'inter',
    name: 'Inter Milan',
    code: 'INT',
    flag: '🇮🇹',
    group: 'Serie A',
    league: 'Serie A',
    ranking: 7,
    powerRating: 84,
    overallRating: 85,
    aiRating: 84,
    stats: { 
      wins: 22, 
      draws: 5, 
      losses: 5, 
      goalsFor: 65, 
      goalsAgainst: 28,
      points: 71,
      goalDifference: 37
    },
    form: ['W', 'W', 'L', 'D', 'W'],
    strengths: ['Defensive organization', 'Counter-attacking', 'Italian tactical discipline'],
    weaknesses: ['Squad depth', 'European experience'],
    starPlayers: [
      { name: 'Lautaro Martínez', position: 'Striker', rating: 88 },
      { name: 'Hakan Çalhanoğlu', position: 'Midfielder', rating: 86 },
      { name: 'Nicolò Barella', position: 'Midfielder', rating: 87 }
    ],
    tournamentProbability: 10.3,
    description: 'Italian giants with a rich history and tactical intelligence.',
    formation: '3-5-2',
    playingStyle: 'Defensive solidity with quick breaks',
    attackFocus: 'Two-striker partnership',
    defensiveStyle: 'Compact low block',
    injuries: [
      { player: 'Stefan de Vrij', status: 'Doubtful', returnDate: '2026-07-18' }
    ],
    topScorers: [
      { name: 'Lautaro Martínez', goals: 19, assists: 5 },
      { name: 'Marcus Thuram', goals: 12, assists: 8 },
      { name: 'Hakan Çalhanoğlu', goals: 8, assists: 10 }
    ],
    h2hWins: 8,
    h2hDraws: 4,
    h2hLosses: 7,
    h2hGoalsScored: 28
  },
  {
    id: 'milan',
    name: 'AC Milan',
    code: 'MIL',
    flag: '🇮🇹',
    group: 'Serie A',
    league: 'Serie A',
    ranking: 8,
    powerRating: 82,
    overallRating: 83,
    aiRating: 82,
    stats: { 
      wins: 19, 
      draws: 8, 
      losses: 6, 
      goalsFor: 58, 
      goalsAgainst: 32,
      points: 65,
      goalDifference: 26
    },
    form: ['D', 'W', 'W', 'L', 'W'],
    strengths: ['Champions League pedigree', 'Youth energy', 'Attacking flair'],
    weaknesses: ['Consistency', 'Defensive injuries'],
    starPlayers: [
      { name: 'Rafael Leão', position: 'Forward', rating: 87 },
      { name: 'Theo Hernández', position: 'Fullback', rating: 86 },
      { name: 'Mike Maignan', position: 'Goalkeeper', rating: 88 }
    ],
    tournamentProbability: 9.8,
    description: 'Seven-time Champions League winners with a rich Italian football heritage.',
    formation: '4-2-3-1',
    playingStyle: 'Counter-attacking with flair',
    attackFocus: 'Left-wing overloads',
    defensiveStyle: 'Medium block with quick transitions',
    injuries: [],
    topScorers: [
      { name: 'Olivier Giroud', goals: 14, assists: 7 },
      { name: 'Rafael Leão', goals: 11, assists: 9 },
      { name: 'Christian Pulisic', goals: 8, assists: 6 }
    ],
    h2hWins: 7,
    h2hDraws: 5,
    h2hLosses: 8,
    h2hGoalsScored: 26
  }
]

// Matches Data - European Leagues
export const matches: Match[] = [
  {
    id: '1',
    slug: 'man-city-vs-liverpool',
    homeTeam: 'man-city',
    awayTeam: 'liverpool',
    date: '2026-07-20',
    time: '20:00',
    venue: 'Etihad Stadium, Manchester',
    stage: 'Premier League',
    result: 'W',
    homeScore: 2,
    awayScore: 1,
    prediction: {
      winner: 'home',
      confidence: 62,
      predictedScore: { home: 2, away: 1 },
      analysis: 'Manchester City\'s home advantage and superior squad depth should edge this crucial Premier League clash.',
      keyFactors: [
        'Man City unbeaten in last 15 home games',
        'Liverpool\'s away form inconsistent',
        'Haaland in scoring form',
        'Salah vs Walker battle key'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 1.85, draw: 3.80, away: 4.00 },
      { bookmaker: 'William Hill', home: 1.80, draw: 3.85, away: 4.10 },
      { bookmaker: 'Betfair', home: 1.87, draw: 3.78, away: 3.98 }
    ],
    headToHead: {
      homeWins: 6,
      draws: 4,
      awayWins: 5,
      lastMatches: [
        { date: '2026-03-10', score: '2-2', winner: 'Draw' },
        { date: '2025-12-15', score: '1-0', winner: 'Man City' },
        { date: '2025-10-05', score: '1-1', winner: 'Draw' }
      ]
    },
    injuries: [
      { team: 'Man City', player: 'Erling Haaland', status: 'Fit' },
      { team: 'Liverpool', player: 'Alisson Becker', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Man City Win', odds: 1.85, confidence: 62 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.70, confidence: 78 },
      { type: 'Total Goals', selection: 'Over 2.5', odds: 1.75, confidence: 71 }
    ],
    isFeatured: true,
    isTrending: true
  },
  {
    id: '2',
    slug: 'real-madrid-vs-barcelona',
    homeTeam: 'real-madrid',
    awayTeam: 'barcelona',
    date: '2026-07-21',
    time: '21:00',
    venue: 'Santiago Bernabéu, Madrid',
    stage: 'La Liga',
    result: 'D',
    homeScore: 1,
    awayScore: 1,
    prediction: {
      winner: 'draw',
      confidence: 55,
      predictedScore: { home: 1, away: 1 },
      analysis: 'The biggest rivalry in club football. Both teams are evenly matched with world-class talent.',
      keyFactors: [
        'Historic El Clásico rivalry',
        'Bellingham vs Pedri midfield battle',
        'Vinicius vs Cancelo matchup',
        'Both teams in top form'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.30, draw: 3.40, away: 3.00 },
      { bookmaker: 'William Hill', home: 2.25, draw: 3.45, away: 3.05 },
      { bookmaker: 'Betfair', home: 2.32, draw: 3.38, away: 2.98 }
    ],
    headToHead: {
      homeWins: 18,
      draws: 8,
      awayWins: 16,
      lastMatches: [
        { date: '2026-04-15', score: '2-1', winner: 'Real Madrid' },
        { date: '2026-01-12', score: '3-2', winner: 'Barcelona' },
        { date: '2025-10-20', score: '0-0', winner: 'Draw' }
      ]
    },
    injuries: [
      { team: 'Real Madrid', player: 'David Alaba', status: 'Out' },
      { team: 'Barcelona', player: 'Frenkie de Jong', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Draw', odds: 3.40, confidence: 55 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.65, confidence: 82 },
      { type: 'Total Goals', selection: 'Under 2.5', odds: 1.80, confidence: 58 }
    ],
    isFeatured: true,
    isTrending: true
  },
  {
    id: '3',
    slug: 'bayern-vs-psg',
    homeTeam: 'bayern',
    awayTeam: 'psg',
    date: '2026-07-22',
    time: '20:45',
    venue: 'Allianz Arena, Munich',
    stage: 'Champions League',
    result: 'W',
    homeScore: 3,
    awayScore: 1,
    prediction: {
      winner: 'home',
      confidence: 58,
      predictedScore: { home: 2, away: 0 },
      analysis: 'Bayern\'s home advantage and pressing game should overwhelm PSG\'s defensive vulnerabilities.',
      keyFactors: [
        'Bayern unbeaten at home in UCL',
        'PSG\'s defensive issues',
        'Kane in clinical form',
        'Mbappé\'s pace on the counter'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 1.95, draw: 3.80, away: 3.60 },
      { bookmaker: 'William Hill', home: 1.90, draw: 3.85, away: 3.70 },
      { bookmaker: 'Betfair', home: 1.97, draw: 3.78, away: 3.58 }
    ],
    headToHead: {
      homeWins: 5,
      draws: 3,
      awayWins: 4,
      lastMatches: [
        { date: '2026-03-08', score: '2-1', winner: 'Bayern' },
        { date: '2025-11-26', score: '1-0', winner: 'PSG' },
        { date: '2025-09-15', score: '3-0', winner: 'Bayern' }
      ]
    },
    injuries: [
      { team: 'Bayern', player: 'Matthijs de Ligt', status: 'Fit' },
      { team: 'PSG', player: 'Marquinhos', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Bayern Win', odds: 1.95, confidence: 58 },
      { type: 'Clean Sheet', selection: 'Bayern', odds: 2.30, confidence: 45 },
      { type: 'Total Goals', selection: 'Under 3.5', odds: 1.70, confidence: 62 }
    ],
    isFeatured: true,
    isTrending: false
  },
  {
    id: '4',
    slug: 'inter-milan-vs-milan',
    homeTeam: 'inter',
    awayTeam: 'milan',
    date: '2026-07-23',
    time: '20:00',
    venue: 'San Siro, Milan',
    stage: 'Serie A',
    result: 'D',
    homeScore: 0,
    awayScore: 0,
    prediction: {
      winner: 'draw',
      confidence: 52,
      predictedScore: { home: 0, away: 0 },
      analysis: 'The Derby della Madonnina promises to be a tactical battle with both teams canceling each other out.',
      keyFactors: [
        'Both teams defensively solid',
        'Derby intensity',
        'Tactical chess match expected',
        'Low-scoring affair likely'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.60, draw: 3.10, away: 2.80 },
      { bookmaker: 'William Hill', home: 2.55, draw: 3.15, away: 2.85 },
      { bookmaker: 'Betfair', home: 2.62, draw: 3.08, away: 2.78 }
    ],
    headToHead: {
      homeWins: 9,
      draws: 8,
      awayWins: 12,
      lastMatches: [
        { date: '2026-04-05', score: '1-2', winner: 'Milan' },
        { date: '2026-01-28', score: '3-0', winner: 'Inter' },
        { date: '2025-10-15', score: '1-1', winner: 'Draw' }
      ]
    },
    injuries: [
      { team: 'Inter', player: 'Lautaro Martínez', status: 'Fit' },
      { team: 'Milan', player: 'Rafael Leão', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Draw', odds: 3.10, confidence: 52 },
      { type: 'Under 2.5 Goals', selection: 'Yes', odds: 1.70, confidence: 68 },
      { type: 'Both Teams to Score', selection: 'No', odds: 1.90, confidence: 55 }
    ],
    isFeatured: false,
    isTrending: false
  }
]

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'champions-league-prediction-2026',
    title: 'UEFA Champions League 2026: Who Will Lift the Trophy?',
    excerpt: 'AI-powered analysis of this season\'s Champions League favorites and dark horses.',
    content: 'Full article content here...',
    category: 'predictions',
    author: 'AI Analysis Team',
    date: '2026-07-10',
    readTime: 10,
    image: '/blog/ucl-predictions.jpg',
    tags: ['Champions League', 'Predictions', 'Analysis']
  },
  {
    id: '2',
    slug: 'premier-league-title-race-2026',
    title: 'Premier League Title Race: Who Has the Edge?',
    excerpt: 'Analyzing the remaining fixtures and key battles in this tight title race.',
    content: 'Full article content here...',
    category: 'analysis',
    author: 'Marcus Webb',
    date: '2026-07-15',
    readTime: 8,
    image: '/blog/premier-league.jpg',
    tags: ['Premier League', 'Title Race', 'Analysis']
  },
  {
    id: '3',
    slug: 'el-clasico-betting-preview',
    title: 'El Clásico: Ultimate Betting Preview',
    excerpt: 'Expert betting tips and analysis for the biggest rivalry in world football.',
    content: 'Full article content here...',
    category: 'betting-tips',
    author: 'Sophie Martinez',
    date: '2026-07-18',
    readTime: 6,
    image: '/blog/el-clasico.jpg',
    tags: ['El Clásico', 'Betting', 'Preview']
  },
  {
    id: '4',
    slug: 'transfer-window-impact-2026',
    title: 'How the Summer Transfer Window is Changing European Football',
    excerpt: 'Major transfers and their impact on the European football landscape.',
    content: 'Full article content here...',
    category: 'news',
    author: 'James Foster',
    date: '2026-07-20',
    readTime: 7,
    image: '/blog/transfers.jpg',
    tags: ['Transfers', 'Summer Window', 'Impact']
  }
]

// Bookmakers Data
export const bookmakers: Bookmaker[] = [
  {
    id: '1',
    name: 'Bet365',
    logo: '/bookmakers/bet365.svg',
    rating: 4.8,
    welcomeBonus: '100% Deposit Match',
    bonusValue: 'Up to $200',
    pros: ['Best live streaming', 'Excellent odds', 'Fast payouts', '24/7 support'],
    cons: ['Country restrictions', 'Verification can be slow'],
    url: '#',
    featured: true
  },
  {
    id: '2',
    name: 'William Hill',
    logo: '/bookmakers/williamhill.svg',
    rating: 4.6,
    welcomeBonus: 'Bet $10 Get $30',
    bonusValue: '$30 Free Bets',
    pros: ['Trusted brand', 'Great mobile app', 'Many markets', 'Good promotions'],
    cons: ['Lower odds sometimes', 'Slower withdrawals'],
    url: '#',
    featured: true
  },
  {
    id: '3',
    name: 'Betfair',
    logo: '/bookmakers/betfair.svg',
    rating: 4.7,
    welcomeBonus: 'Exchange Welcome Offer',
    bonusValue: 'Up to $100',
    pros: ['Betting exchange option', 'Best prices via exchange', 'Cash out feature'],
    cons: ['Complex for beginners', 'Commission on winnings'],
    url: '#',
    featured: true
  },
  {
    id: '4',
    name: 'DraftKings',
    logo: '/bookmakers/draftkings.svg',
    rating: 4.5,
    welcomeBonus: 'Bet $5 Get $200',
    bonusValue: '$200 Bonus Bets',
    pros: ['Great US coverage', 'Modern interface', 'Daily fantasy integration'],
    cons: ['Limited international', 'Newer to sports betting'],
    url: '#',
    featured: false
  },
  {
    id: '5',
    name: 'FanDuel',
    logo: '/bookmakers/fanduel.svg',
    rating: 4.5,
    welcomeBonus: 'Bet $5 Get $150',
    bonusValue: '$150 in Bonus Bets',
    pros: ['User-friendly app', 'Same-game parlays', 'Quick deposits'],
    cons: ['US only', 'Odds can vary'],
    url: '#',
    featured: false
  },
  {
    id: '6',
    name: 'Unibet',
    logo: '/bookmakers/unibet.svg',
    rating: 4.4,
    welcomeBonus: 'Risk-Free First Bet',
    bonusValue: 'Up to $500',
    pros: ['Wide sports coverage', 'Good for soccer', 'Reliable platform'],
    cons: ['Interface dated', 'Bonus wagering high'],
    url: '#',
    featured: false
  }
]

// Helper functions
export function getTeamById(id: string): Team | undefined {
  return teams.find(team => team.id === id)
}

export function getMatchBySlug(slug: string): Match | undefined {
  return matches.find(match => match.slug === slug)
}

export function getFeaturedMatches(): Match[] {
  return matches.filter(match => match.isFeatured)
}

export function getTrendingMatches(): Match[] {
  return matches.filter(match => match.isTrending)
}

export function getTodayMatches(): Match[] {
  const today = new Date().toISOString().split('T')[0]
  return matches.filter(match => match.date === today)
}

export function getBlogPostBySlug
