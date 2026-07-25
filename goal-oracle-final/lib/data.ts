// Sample data for GoalOracle AI - European Football Leagues

export interface Team {
  id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  league: string;
  ranking: number;
  powerRating: number;
  overallRating: number;
  aiRating: number;
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
    goalDifference: number;
  };
  form: ('W' | 'D' | 'L')[];
  strengths: string[];
  weaknesses: string[];
  starPlayers: {
    name: string;
    position: string;
    rating: number;
  }[];
  tournamentProbability: number;
  description: string;
  formation: string;
  playingStyle: string;
  attackFocus: string;
  defensiveStyle: string;
  injuries: {
    player: string;
    status: string;
    returnDate?: string;
  }[];
  topScorers: {
    name: string;
    goals: number;
    assists: number;
  }[];
  h2hWins: number;
  h2hDraws: number;
  h2hLosses: number;
  h2hGoalsScored: number;
}

export interface Match {
  id: string;
  slug: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  stage: string;
  result?: 'W' | 'D' | 'L';
  homeScore?: number;
  awayScore?: number;
  prediction: {
    winner: 'home' | 'away' | 'draw';
    confidence: number;
    predictedScore: {
      home: number;
      away: number;
    };
    analysis: string;
    keyFactors: string[];
  };
  odds: {
    bookmaker: string;
    home: number;
    draw: number;
    away: number;
  }[];
  headToHead: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: {
      date: string;
      score: string;
      winner: string;
    }[];
  };
  injuries: {
    team: string;
    player: string;
    status: string;
  }[];
  suggestedBets: {
    type: string;
    selection: string;
    odds: number;
    confidence: number;
  }[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'predictions' | 'betting-tips' | 'streaming' | 'analysis' | 'news';
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

export interface Bookmaker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  welcomeBonus: string;
  bonusValue: string;
  pros: string[];
  cons: string[];
  url: string;
  featured?: boolean;
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
    code: 'BAY',
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
  }
];

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
  }
];

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
  }
];

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
  }
];

// Helper functions - FIXED
export function getTeamById(id: string): Team | undefined {
  return teams.find(team => team.id === id);
}

export function getMatchBySlug(slug: string): Match | undefined {
  return matches.find(match => match.slug === slug);
}

export function getFeaturedMatches(): Match[] {
  return matches.filter(match => match.isFeatured);
}

export function getTrendingMatches(): Match[] {
  return matches.filter(match => match.isTrending);
}

export function getTodayMatches(): Match[] {
  const today = new Date().toISOString().split('T')[0];
  return matches.filter(match => match.date === today);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getFeaturedBookmakers(): Bookmaker[] {
  return bookmakers.filter(bm => bm.featured);
}

export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= 65) return 'high';
  if (confidence >= 50) return 'medium';
  return 'low';
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}
