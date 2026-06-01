// Sample data for GoalOracle AI - FIFA World Cup Predictions

export interface Team {
  id: string
  name: string
  code: string
  flag: string
  group: string
  ranking: number
  stats: {
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
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

// Teams Data
export const teams: Team[] = [
  {
    id: 'france',
    name: 'France',
    code: 'FRA',
    flag: '🇫🇷',
    group: 'D',
    ranking: 2,
    stats: { wins: 8, draws: 1, losses: 1, goalsFor: 24, goalsAgainst: 8 },
    form: ['W', 'W', 'D', 'W', 'W'],
    strengths: ['World-class attacking depth', 'Strong defensive organization', 'Tournament experience'],
    weaknesses: ['Occasional defensive lapses', 'Squad harmony concerns'],
    starPlayers: [
      { name: 'Kylian Mbappé', position: 'Forward', rating: 94 },
      { name: 'Antoine Griezmann', position: 'Forward', rating: 88 },
      { name: 'Aurélien Tchouaméni', position: 'Midfielder', rating: 86 }
    ],
    tournamentProbability: 18.5,
    description: 'The defending champions enter as one of the favorites with a perfect blend of experience and youth.'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    code: 'BRA',
    flag: '🇧🇷',
    group: 'G',
    ranking: 3,
    stats: { wins: 9, draws: 0, losses: 1, goalsFor: 28, goalsAgainst: 5 },
    form: ['W', 'W', 'W', 'L', 'W'],
    strengths: ['Elite attacking talent', 'Technical superiority', 'Strong squad depth'],
    weaknesses: ['Defensive vulnerabilities against pace', 'Pressure in knockouts'],
    starPlayers: [
      { name: 'Vinícius Jr.', position: 'Forward', rating: 93 },
      { name: 'Rodrygo', position: 'Forward', rating: 88 },
      { name: 'Casemiro', position: 'Midfielder', rating: 87 }
    ],
    tournamentProbability: 16.2,
    description: 'Seeking their sixth World Cup title, Brazil brings flair and firepower.'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    code: 'ARG',
    flag: '🇦🇷',
    group: 'C',
    ranking: 1,
    stats: { wins: 10, draws: 0, losses: 0, goalsFor: 32, goalsAgainst: 4 },
    form: ['W', 'W', 'W', 'W', 'W'],
    strengths: ['Messi magic', 'Team unity', 'Winning mentality'],
    weaknesses: ['Aging key players', 'Reliance on Messi'],
    starPlayers: [
      { name: 'Lionel Messi', position: 'Forward', rating: 93 },
      { name: 'Julián Álvarez', position: 'Forward', rating: 86 },
      { name: 'Enzo Fernández', position: 'Midfielder', rating: 87 }
    ],
    tournamentProbability: 20.1,
    description: 'The reigning champions and Copa America winners are on an incredible run.'
  },
  {
    id: 'england',
    name: 'England',
    code: 'ENG',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'B',
    ranking: 4,
    stats: { wins: 7, draws: 2, losses: 1, goalsFor: 22, goalsAgainst: 6 },
    form: ['W', 'D', 'W', 'W', 'D'],
    strengths: ['Premier League quality', 'Strong midfield', 'Set-piece threat'],
    weaknesses: ['Knockout pressure', 'Left-back concerns'],
    starPlayers: [
      { name: 'Jude Bellingham', position: 'Midfielder', rating: 91 },
      { name: 'Harry Kane', position: 'Forward', rating: 90 },
      { name: 'Phil Foden', position: 'Midfielder', rating: 89 }
    ],
    tournamentProbability: 12.8,
    description: 'England continues their quest to end decades of hurt with a golden generation.'
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'GER',
    flag: '🇩🇪',
    group: 'A',
    ranking: 12,
    stats: { wins: 6, draws: 2, losses: 2, goalsFor: 18, goalsAgainst: 10 },
    form: ['W', 'L', 'W', 'D', 'W'],
    strengths: ['Tournament hosts advantage', 'Young emerging talent', 'Tactical flexibility'],
    weaknesses: ['Recent poor tournament form', 'Defensive issues'],
    starPlayers: [
      { name: 'Florian Wirtz', position: 'Midfielder', rating: 88 },
      { name: 'Jamal Musiala', position: 'Midfielder', rating: 89 },
      { name: 'Kai Havertz', position: 'Forward', rating: 85 }
    ],
    tournamentProbability: 8.5,
    description: 'Die Mannschaft look to reignite their World Cup passion on home soil.'
  }
]

// Matches Data
export const matches: Match[] = [
  {
    id: '1',
    slug: 'france-vs-brazil',
    homeTeam: 'france',
    awayTeam: 'brazil',
    date: '2026-06-20',
    time: '20:00',
    venue: 'MetLife Stadium, New Jersey',
    stage: 'Quarter-Final',
    prediction: {
      winner: 'home',
      confidence: 62,
      predictedScore: { home: 2, away: 1 },
      analysis: 'France\'s defensive solidity and counter-attacking prowess give them the edge against Brazil\'s high line. Mbappé\'s pace will be crucial against an aging Brazilian defense.',
      keyFactors: [
        'France unbeaten in last 8 matches',
        'Brazil struggling against European opposition',
        'Mbappé in career-best form',
        'French midfield control expected'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.40, draw: 3.20, away: 2.90 },
      { bookmaker: 'William Hill', home: 2.35, draw: 3.25, away: 2.95 },
      { bookmaker: 'Betfair', home: 2.42, draw: 3.18, away: 2.88 }
    ],
    headToHead: {
      homeWins: 6,
      draws: 4,
      awayWins: 5,
      lastMatches: [
        { date: '2023-03-26', score: '2-3', winner: 'Brazil' },
        { date: '2022-12-18', score: '4-2', winner: 'France' },
        { date: '2018-06-27', score: '2-0', winner: 'France' }
      ]
    },
    injuries: [
      { team: 'France', player: 'Lucas Hernández', status: 'Doubtful' },
      { team: 'Brazil', player: 'Neymar', status: 'Out' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'France Win', odds: 2.40, confidence: 62 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.70, confidence: 78 },
      { type: 'Total Goals', selection: 'Over 2.5', odds: 1.85, confidence: 71 }
    ],
    isFeatured: true,
    isTrending: true
  },
  {
    id: '2',
    slug: 'argentina-vs-england',
    homeTeam: 'argentina',
    awayTeam: 'england',
    date: '2026-06-21',
    time: '18:00',
    venue: 'AT&T Stadium, Dallas',
    stage: 'Quarter-Final',
    prediction: {
      winner: 'home',
      confidence: 58,
      predictedScore: { home: 2, away: 1 },
      analysis: 'A historic rivalry renewed. Argentina\'s winning mentality and Messi\'s tournament form give them a slight edge, but England\'s midfield quality makes this incredibly tight.',
      keyFactors: [
        'Argentina\'s 15-match unbeaten run',
        'England\'s knockout stage struggles',
        'Messi vs Bellingham battle',
        'High-pressure environment'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.20, draw: 3.40, away: 3.10 },
      { bookmaker: 'William Hill', home: 2.15, draw: 3.45, away: 3.15 },
      { bookmaker: 'Betfair', home: 2.22, draw: 3.38, away: 3.08 }
    ],
    headToHead: {
      homeWins: 9,
      draws: 5,
      awayWins: 6,
      lastMatches: [
        { date: '2022-11-27', score: '0-0', winner: 'Draw' },
        { date: '2005-11-12', score: '3-2', winner: 'Argentina' },
        { date: '2002-06-07', score: '1-0', winner: 'England' }
      ]
    },
    injuries: [
      { team: 'Argentina', player: 'Cristian Romero', status: 'Fit' },
      { team: 'England', player: 'Luke Shaw', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Argentina Win', odds: 2.20, confidence: 58 },
      { type: 'Correct Score', selection: '2-1', odds: 8.50, confidence: 35 },
      { type: 'First Goalscorer', selection: 'Messi', odds: 5.00, confidence: 42 }
    ],
    isFeatured: true,
    isTrending: true
  },
  {
    id: '3',
    slug: 'germany-vs-spain',
    homeTeam: 'germany',
    awayTeam: 'spain',
    date: '2026-06-19',
    time: '21:00',
    venue: 'Azteca Stadium, Mexico City',
    stage: 'Round of 16',
    prediction: {
      winner: 'away',
      confidence: 55,
      predictedScore: { home: 1, away: 2 },
      analysis: 'Spain\'s midfield dominance through Pedri and Gavi should control this match. Germany\'s young talents are exciting but Spain\'s experience in big games tips the balance.',
      keyFactors: [
        'Spain\'s midfield superiority',
        'Germany\'s home crowd advantage',
        'Spanish tournament pedigree',
        'Young German talents emerging'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.80, draw: 3.20, away: 2.50 },
      { bookmaker: 'William Hill', home: 2.75, draw: 3.25, away: 2.55 },
      { bookmaker: 'Betfair', home: 2.82, draw: 3.18, away: 2.48 }
    ],
    headToHead: {
      homeWins: 8,
      draws: 5,
      awayWins: 9,
      lastMatches: [
        { date: '2022-11-27', score: '1-1', winner: 'Draw' },
        { date: '2020-11-17', score: '6-0', winner: 'Spain' },
        { date: '2020-09-03', score: '1-1', winner: 'Draw' }
      ]
    },
    injuries: [
      { team: 'Germany', player: 'Leroy Sané', status: 'Fit' },
      { team: 'Spain', player: 'Gavi', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Spain Win', odds: 2.50, confidence: 55 },
      { type: 'Total Goals', selection: 'Under 2.5', odds: 1.90, confidence: 52 },
      { type: 'Draw No Bet', selection: 'Spain', odds: 1.72, confidence: 65 }
    ],
    isFeatured: false,
    isTrending: true
  },
  {
    id: '4',
    slug: 'portugal-vs-netherlands',
    homeTeam: 'portugal',
    awayTeam: 'netherlands',
    date: '2026-06-22',
    time: '18:00',
    venue: 'Rose Bowl, Los Angeles',
    stage: 'Round of 16',
    prediction: {
      winner: 'home',
      confidence: 54,
      predictedScore: { home: 2, away: 1 },
      analysis: 'Portugal\'s attacking firepower led by a rejuvenated squad should edge past the Netherlands. Dutch defensive frailties could be exposed by Portuguese pace.',
      keyFactors: [
        'Portuguese attacking depth',
        'Dutch defensive vulnerabilities',
        'Ronaldo\'s potential farewell tournament',
        'Both teams prefer possession'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.30, draw: 3.30, away: 3.00 },
      { bookmaker: 'William Hill', home: 2.25, draw: 3.35, away: 3.05 },
      { bookmaker: 'Betfair', home: 2.32, draw: 3.28, away: 2.98 }
    ],
    headToHead: {
      homeWins: 4,
      draws: 3,
      awayWins: 5,
      lastMatches: [
        { date: '2023-03-23', score: '0-3', winner: 'Netherlands' },
        { date: '2022-06-09', score: '1-0', winner: 'Portugal' },
        { date: '2019-06-09', score: '1-0', winner: 'Portugal' }
      ]
    },
    injuries: [
      { team: 'Portugal', player: 'Diogo Jota', status: 'Out' },
      { team: 'Netherlands', player: 'Frenkie de Jong', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Portugal Win', odds: 2.30, confidence: 54 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.80, confidence: 68 },
      { type: 'Anytime Goalscorer', selection: 'Leão', odds: 3.20, confidence: 48 }
    ],
    isFeatured: false,
    isTrending: false
  },
  {
    id: '5',
    slug: 'belgium-vs-italy',
    homeTeam: 'belgium',
    awayTeam: 'italy',
    date: '2026-06-23',
    time: '20:00',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    stage: 'Round of 16',
    prediction: {
      winner: 'draw',
      confidence: 48,
      predictedScore: { home: 1, away: 1 },
      analysis: 'Two aging golden generations meet in what could be a tactical chess match. Both teams have defensive solidity but lack the cutting edge of previous years.',
      keyFactors: [
        'Both teams in transition',
        'Tactical masterclasses expected',
        'Key players past their prime',
        'Low-scoring affair likely'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.70, draw: 3.10, away: 2.70 },
      { bookmaker: 'William Hill', home: 2.65, draw: 3.15, away: 2.75 },
      { bookmaker: 'Betfair', home: 2.72, draw: 3.08, away: 2.68 }
    ],
    headToHead: {
      homeWins: 3,
      draws: 4,
      awayWins: 5,
      lastMatches: [
        { date: '2021-07-02', score: '1-2', winner: 'Italy' },
        { date: '2021-10-10', score: '2-1', winner: 'Belgium' },
        { date: '2016-06-13', score: '0-2', winner: 'Italy' }
      ]
    },
    injuries: [
      { team: 'Belgium', player: 'Kevin De Bruyne', status: 'Fit' },
      { team: 'Italy', player: 'Federico Chiesa', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Draw', odds: 3.10, confidence: 48 },
      { type: 'Total Goals', selection: 'Under 2.5', odds: 1.75, confidence: 62 },
      { type: 'Half-Time Result', selection: 'Draw', odds: 2.00, confidence: 55 }
    ],
    isFeatured: false,
    isTrending: false
  },
  {
    id: '6',
    slug: 'usa-vs-mexico',
    homeTeam: 'usa',
    awayTeam: 'mexico',
    date: '2026-06-18',
    time: '19:00',
    venue: 'SoFi Stadium, Los Angeles',
    stage: 'Group Stage',
    prediction: {
      winner: 'home',
      confidence: 56,
      predictedScore: { home: 2, away: 1 },
      analysis: 'CONCACAF rivalry at its peak on home soil. USA\'s young European-based players give them an edge, plus the massive home crowd advantage.',
      keyFactors: [
        'USA home advantage',
        'Mexican struggles against USA recently',
        'Young US talent peaking',
        'Intense rivalry atmosphere'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.10, draw: 3.40, away: 3.50 },
      { bookmaker: 'William Hill', home: 2.05, draw: 3.45, away: 3.55 },
      { bookmaker: 'Betfair', home: 2.12, draw: 3.38, away: 3.48 }
    ],
    headToHead: {
      homeWins: 10,
      draws: 3,
      awayWins: 8,
      lastMatches: [
        { date: '2024-03-24', score: '2-0', winner: 'USA' },
        { date: '2023-11-15', score: '3-0', winner: 'USA' },
        { date: '2022-11-21', score: '1-0', winner: 'Mexico' }
      ]
    },
    injuries: [
      { team: 'USA', player: 'Christian Pulisic', status: 'Fit' },
      { team: 'Mexico', player: 'Raúl Jiménez', status: 'Doubtful' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'USA Win', odds: 2.10, confidence: 56 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.85, confidence: 64 },
      { type: 'Total Goals', selection: 'Over 2.5', odds: 1.95, confidence: 58 }
    ],
    isFeatured: true,
    isTrending: true
  },
  {
    id: '7',
    slug: 'croatia-vs-morocco',
    homeTeam: 'croatia',
    awayTeam: 'morocco',
    date: '2026-06-24',
    time: '16:00',
    venue: 'Hard Rock Stadium, Miami',
    stage: 'Group Stage',
    prediction: {
      winner: 'draw',
      confidence: 52,
      predictedScore: { home: 1, away: 1 },
      analysis: 'A rematch of the 2022 third-place playoff. Both teams are evenly matched with strong midfields and organized defenses. Expect another tight encounter.',
      keyFactors: [
        'Rematch of 2022 bronze medal match',
        'Both teams defensively solid',
        'Modrić vs Amrabat midfield battle',
        'Neither team will take risks early'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.60, draw: 3.00, away: 2.90 },
      { bookmaker: 'William Hill', home: 2.55, draw: 3.05, away: 2.95 },
      { bookmaker: 'Betfair', home: 2.62, draw: 2.98, away: 2.88 }
    ],
    headToHead: {
      homeWins: 2,
      draws: 2,
      awayWins: 1,
      lastMatches: [
        { date: '2022-12-17', score: '2-1', winner: 'Croatia' },
        { date: '2022-11-23', score: '0-0', winner: 'Draw' }
      ]
    },
    injuries: [
      { team: 'Croatia', player: 'Ivan Perišić', status: 'Doubtful' },
      { team: 'Morocco', player: 'Achraf Hakimi', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Draw', odds: 3.00, confidence: 52 },
      { type: 'Total Goals', selection: 'Under 2.5', odds: 1.65, confidence: 68 },
      { type: 'Double Chance', selection: 'Croatia or Draw', odds: 1.50, confidence: 72 }
    ],
    isFeatured: false,
    isTrending: false
  },
  {
    id: '8',
    slug: 'japan-vs-south-korea',
    homeTeam: 'japan',
    awayTeam: 'south-korea',
    date: '2026-06-25',
    time: '14:00',
    venue: 'BC Place, Vancouver',
    stage: 'Group Stage',
    prediction: {
      winner: 'home',
      confidence: 51,
      predictedScore: { home: 2, away: 1 },
      analysis: 'Asian giants clash in a historic rivalry. Japan\'s recent European success gives them a slight edge, but South Korea\'s fighting spirit cannot be underestimated.',
      keyFactors: [
        'Historic Asian rivalry',
        'Japan\'s European contingent',
        'South Korea\'s warrior mentality',
        'Tactical battle expected'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.50, draw: 3.20, away: 2.80 },
      { bookmaker: 'William Hill', home: 2.45, draw: 3.25, away: 2.85 },
      { bookmaker: 'Betfair', home: 2.52, draw: 3.18, away: 2.78 }
    ],
    headToHead: {
      homeWins: 15,
      draws: 23,
      awayWins: 41,
      lastMatches: [
        { date: '2024-01-30', score: '2-1', winner: 'Japan' },
        { date: '2022-07-27', score: '3-0', winner: 'South Korea' },
        { date: '2021-03-25', score: '3-0', winner: 'Japan' }
      ]
    },
    injuries: [
      { team: 'Japan', player: 'Takefusa Kubo', status: 'Fit' },
      { team: 'South Korea', player: 'Son Heung-min', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Japan Win', odds: 2.50, confidence: 51 },
      { type: 'Both Teams to Score', selection: 'Yes', odds: 1.75, confidence: 72 },
      { type: 'Total Goals', selection: 'Over 2.5', odds: 2.00, confidence: 55 }
    ],
    isFeatured: false,
    isTrending: true
  },
  {
    id: '9',
    slug: 'senegal-vs-cameroon',
    homeTeam: 'senegal',
    awayTeam: 'cameroon',
    date: '2026-06-26',
    time: '17:00',
    venue: 'Estadio Akron, Guadalajara',
    stage: 'Group Stage',
    prediction: {
      winner: 'home',
      confidence: 54,
      predictedScore: { home: 2, away: 0 },
      analysis: 'African powerhouses meet with Senegal\'s AFCON pedigree giving them the advantage. Their defensive organization should nullify Cameroon\'s attacking threats.',
      keyFactors: [
        'Senegal\'s AFCON success',
        'Strong Senegalese defense',
        'Cameroon\'s inconsistency',
        'Physical battle expected'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 2.20, draw: 3.20, away: 3.30 },
      { bookmaker: 'William Hill', home: 2.15, draw: 3.25, away: 3.35 },
      { bookmaker: 'Betfair', home: 2.22, draw: 3.18, away: 3.28 }
    ],
    headToHead: {
      homeWins: 7,
      draws: 5,
      awayWins: 8,
      lastMatches: [
        { date: '2024-02-02', score: '0-0', winner: 'Draw' },
        { date: '2022-02-02', score: '3-1', winner: 'Senegal' }
      ]
    },
    injuries: [
      { team: 'Senegal', player: 'Sadio Mané', status: 'Fit' },
      { team: 'Cameroon', player: 'Eric Maxim Choupo-Moting', status: 'Fit' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Senegal Win', odds: 2.20, confidence: 54 },
      { type: 'Clean Sheet', selection: 'Senegal', odds: 2.40, confidence: 48 },
      { type: 'Total Goals', selection: 'Under 2.5', odds: 1.80, confidence: 58 }
    ],
    isFeatured: false,
    isTrending: false
  },
  {
    id: '10',
    slug: 'canada-vs-australia',
    homeTeam: 'canada',
    awayTeam: 'australia',
    date: '2026-06-27',
    time: '15:00',
    venue: 'BMO Field, Toronto',
    stage: 'Group Stage',
    prediction: {
      winner: 'home',
      confidence: 58,
      predictedScore: { home: 2, away: 0 },
      analysis: 'Canada\'s first World Cup on home soil adds extra motivation. Their Davies-led attack should prove too much for Australia\'s rebuilt squad.',
      keyFactors: [
        'Canada home advantage',
        'Alphonso Davies threat',
        'Australian rebuilding phase',
        'Passionate Toronto crowd'
      ]
    },
    odds: [
      { bookmaker: 'Bet365', home: 1.95, draw: 3.40, away: 3.80 },
      { bookmaker: 'William Hill', home: 1.90, draw: 3.45, away: 3.85 },
      { bookmaker: 'Betfair', home: 1.97, draw: 3.38, away: 3.78 }
    ],
    headToHead: {
      homeWins: 3,
      draws: 2,
      awayWins: 4,
      lastMatches: [
        { date: '2022-11-15', score: '0-2', winner: 'Australia' },
        { date: '2017-06-13', score: '4-0', winner: 'Canada' }
      ]
    },
    injuries: [
      { team: 'Canada', player: 'Alphonso Davies', status: 'Fit' },
      { team: 'Australia', player: 'Aaron Mooy', status: 'Retired' }
    ],
    suggestedBets: [
      { type: 'Match Result', selection: 'Canada Win', odds: 1.95, confidence: 58 },
      { type: 'Asian Handicap', selection: 'Canada -1', odds: 2.60, confidence: 45 },
      { type: 'First Half Result', selection: 'Canada', odds: 2.80, confidence: 42 }
    ],
    isFeatured: true,
    isTrending: false
  }
]

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'world-cup-2026-ultimate-betting-guide',
    title: 'World Cup 2026: The Ultimate Betting Guide',
    excerpt: 'Everything you need to know about betting on the FIFA World Cup 2026 - from odds analysis to expert tips.',
    content: 'Full article content here...',
    category: 'betting-tips',
    author: 'Marcus Webb',
    date: '2026-05-15',
    readTime: 12,
    image: '/blog/betting-guide.jpg',
    tags: ['World Cup', 'Betting Guide', 'Tips']
  },
  {
    id: '2',
    slug: 'argentina-world-cup-defense-analysis',
    title: 'Can Argentina Defend Their World Cup Crown?',
    excerpt: 'A deep dive into Argentina\'s chances of becoming back-to-back World Cup champions.',
    content: 'Full article content here...',
    category: 'analysis',
    author: 'Sophie Martinez',
    date: '2026-05-20',
    readTime: 8,
    image: '/blog/argentina-analysis.jpg',
    tags: ['Argentina', 'Analysis', 'Champions']
  },
  {
    id: '3',
    slug: 'how-to-watch-world-cup-2026-free',
    title: 'How to Watch World Cup 2026 for Free: Complete Guide',
    excerpt: 'Your comprehensive guide to streaming every World Cup match legally and for free.',
    content: 'Full article content here...',
    category: 'streaming',
    author: 'Tech Team',
    date: '2026-05-22',
    readTime: 6,
    image: '/blog/streaming-guide.jpg',
    tags: ['Streaming', 'Free', 'How To']
  },
  {
    id: '4',
    slug: 'mbappe-vs-haaland-who-will-shine',
    title: 'Mbappé vs Haaland: Who Will Shine at the World Cup?',
    excerpt: 'The ultimate showdown between two generational talents. Who will define this World Cup?',
    content: 'Full article content here...',
    category: 'analysis',
    author: 'James Foster',
    date: '2026-05-25',
    readTime: 10,
    image: '/blog/mbappe-haaland.jpg',
    tags: ['Mbappé', 'Haaland', 'Analysis']
  },
  {
    id: '5',
    slug: 'dark-horses-world-cup-2026',
    title: '5 Dark Horses That Could Shock the World Cup 2026',
    excerpt: 'Look beyond the favorites - these teams could be this tournament\'s surprise packages.',
    content: 'Full article content here...',
    category: 'predictions',
    author: 'Marcus Webb',
    date: '2026-05-28',
    readTime: 9,
    image: '/blog/dark-horses.jpg',
    tags: ['Dark Horses', 'Predictions', 'Upsets']
  },
  {
    id: '6',
    slug: 'best-accumulators-world-cup-2026',
    title: 'Best Accumulator Bets for World Cup 2026',
    excerpt: 'Our AI-powered accumulator picks that offer the best value for group stage matches.',
    content: 'Full article content here...',
    category: 'betting-tips',
    author: 'AI Analysis Team',
    date: '2026-06-01',
    readTime: 7,
    image: '/blog/accumulators.jpg',
    tags: ['Accumulators', 'Betting', 'Value Bets']
  },
  {
    id: '7',
    slug: 'usa-home-advantage-analysis',
    title: 'USA\'s Home Advantage: How Far Can They Go?',
    excerpt: 'Analyzing the impact of home soil advantage for the USMNT at World Cup 2026.',
    content: 'Full article content here...',
    category: 'analysis',
    author: 'Sarah Johnson',
    date: '2026-06-03',
    readTime: 8,
    image: '/blog/usa-home.jpg',
    tags: ['USA', 'Home Advantage', 'Analysis']
  },
  {
    id: '8',
    slug: 'world-cup-var-rule-changes',
    title: 'VAR and Rule Changes for World Cup 2026 Explained',
    excerpt: 'New VAR protocols and rule modifications that will impact betting at the World Cup.',
    content: 'Full article content here...',
    category: 'news',
    author: 'Rules Expert',
    date: '2026-06-05',
    readTime: 5,
    image: '/blog/var-rules.jpg',
    tags: ['VAR', 'Rules', 'FIFA']
  },
  {
    id: '9',
    slug: 'group-stage-predictions-all-groups',
    title: 'World Cup 2026 Group Stage: Complete Predictions',
    excerpt: 'Our AI analyzes every group and predicts which teams will advance.',
    content: 'Full article content here...',
    category: 'predictions',
    author: 'AI Analysis Team',
    date: '2026-06-08',
    readTime: 15,
    image: '/blog/group-predictions.jpg',
    tags: ['Groups', 'Predictions', 'Qualification']
  },
  {
    id: '10',
    slug: 'world-cup-betting-strategies',
    title: 'Proven Betting Strategies for World Cup Success',
    excerpt: 'Data-driven strategies that have historically performed well at World Cups.',
    content: 'Full article content here...',
    category: 'betting-tips',
    author: 'Analytics Team',
    date: '2026-06-10',
    readTime: 11,
    image: '/blog/strategies.jpg',
    tags: ['Strategies', 'Data', 'Success']
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

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}

export function getFeaturedBookmakers(): Bookmaker[] {
  return bookmakers.filter(bm => bm.featured)
}

export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= 65) return 'high'
  if (confidence >= 50) return 'medium'
  return 'low'
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2)
}
