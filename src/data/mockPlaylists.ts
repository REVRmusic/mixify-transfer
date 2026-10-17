import { Playlist } from '../types';

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'mixify-70s',
    title: "Mixify — 70's Club Classics",
    trackCount: 21,
    selectedCount: 21,
    durationStr: '1h 28min',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 't1', title: 'September', artist: 'Earth, Wind & Fire', album: 'The Best of Earth, Wind & Fire, Vol. 1', duration: '3:35', status: 'pending' },
      { id: 't2', title: 'Stayin Alive', artist: 'Bee Gees', album: 'Saturday Night Fever', duration: '4:45', status: 'pending' },
      { id: 't3', title: 'Le Freak', artist: 'CHIC', album: 'C\'est Chic', duration: '5:28', status: 'pending' },
      { id: 't4', title: 'Don\'t Stop \'Til You Get Enough', artist: 'Michael Jackson', album: 'Off The Wall', duration: '6:05', status: 'pending' },
      { id: 't5', title: 'Dancing Queen', artist: 'ABBA', album: 'Arrival', duration: '3:50', status: 'pending' },
      { id: 't6', title: 'Disco Inferno', artist: 'The Trammps', album: 'Disco Inferno', duration: '3:35', status: 'pending' },
      { id: 't7', title: 'Boogie Wonderland', artist: 'Earth, Wind & Fire ft. The Emotions', album: 'I Am', duration: '4:48', status: 'pending' },
      { id: 't8', title: 'Hot Stuff', artist: 'Donna Summer', album: 'Bad Girls', duration: '5:14', status: 'pending' },
      { id: 't9', title: 'Good Times', artist: 'CHIC', album: 'Risqué', duration: '8:08', status: 'pending' },
      { id: 't10', title: 'You Should Be Dancing', artist: 'Bee Gees', album: 'Children of the World', duration: '4:16', status: 'pending' },
      { id: 't11', title: 'I Will Survive', artist: 'Gloria Gaynor', album: 'Love Tracks', duration: '3:17', status: 'pending' },
      { id: 't12', title: 'Celebration', artist: 'Kool & The Gang', album: 'Celebrate!', duration: '3:40', status: 'pending' },
      { id: 't13', title: 'Rasputin', artist: 'Boney M.', album: 'Nightflight to Venus', duration: '4:42', status: 'pending' },
      { id: 't14', title: 'Daddy Cool', artist: 'Boney M.', album: 'Take the Heat off Me', duration: '3:27', status: 'pending' },
      { id: 't15', title: 'Superstition', artist: 'Stevie Wonder', album: 'Talking Book', duration: '4:26', status: 'pending' },
      { id: 't16', title: 'Play That Funky Music', artist: 'Wild Cherry', album: 'Wild Cherry', duration: '5:00', status: 'pending' },
      { id: 't17', title: 'Heart of Glass', artist: 'Blondie', album: 'Parallel Lines', duration: '4:35', status: 'pending' },
      { id: 't18', title: 'Rock with You', artist: 'Michael Jackson', album: 'Off The Wall', duration: '3:40', status: 'pending' },
      { id: 't19', title: 'Ain\'t No Mountain High Enough', artist: 'Diana Ross', album: 'Diana Ross', duration: '6:18', status: 'pending' },
      { id: 't20', title: 'Y.M.C.A.', artist: 'Village People', album: 'Cruisin\'', duration: '4:47', status: 'pending' },
      { id: 't21', title: 'Born to Be Alive', artist: 'Patrick Hernandez', album: 'Born to Be Alive', duration: '3:05', status: 'pending' },
    ]
  },
  {
    id: 'mixify-80s',
    title: "Mixify — 80's Synth & Pop",
    trackCount: 39,
    selectedCount: 39,
    durationStr: '2h 34min',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: '80-1', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54', status: 'pending' },
      { id: '80-2', title: 'Sweet Dreams (Are Made of This)', artist: 'Eurythmics', album: 'Sweet Dreams', duration: '3:36', status: 'pending' },
      { id: '80-3', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', duration: '3:45', status: 'pending' },
      { id: '80-4', title: 'Blue Monday', artist: 'New Order', album: 'Power, Corruption & Lies', duration: '7:29', status: 'pending' },
      { id: '80-5', title: 'Never Gonna Give You Up', artist: 'Rick Astley', album: 'Whenever You Need Somebody', duration: '3:33', status: 'pending' },
    ]
  },
  {
    id: 'mixify-2000s',
    title: "Mixify — 2000's Club Hits",
    trackCount: 120,
    selectedCount: 120,
    durationStr: '7h 12min',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: '00-1', title: 'One More Time', artist: 'Daft Punk', album: 'Discovery', duration: '5:20', status: 'pending' },
      { id: '00-2', title: 'Love Don\'t Let Me Go', artist: 'David Guetta', album: 'Just a Little More Love', duration: '3:39', status: 'pending' },
      { id: '00-3', title: 'Crazy in Love', artist: 'Beyoncé ft. Jay-Z', album: 'Dangerously in Love', duration: '3:56', status: 'pending' },
      { id: '00-4', title: 'Yeah!', artist: 'Usher ft. Lil Jon, Ludacris', album: 'Confessions', duration: '4:10', status: 'pending' },
    ]
  },
  {
    id: 'mixify-girly',
    title: 'Mixify — Girly Night Out',
    trackCount: 45,
    selectedCount: 45,
    durationStr: '2h 48min',
    coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'gn-1', title: 'Wannabe', artist: 'Spice Girls', duration: '2:52', status: 'pending' },
      { id: 'gn-2', title: 'Single Ladies', artist: 'Beyoncé', duration: '3:13', status: 'pending' },
      { id: 'gn-3', title: 'Toxic', artist: 'Britney Spears', duration: '3:18', status: 'pending' },
    ]
  },
  {
    id: 'mixify-latino',
    title: 'Mixify — Latino Club Fuego',
    trackCount: 54,
    selectedCount: 54,
    durationStr: '3h 15min',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'lat-1', title: 'Danza Kuduro', artist: 'Don Omar, Lucenzo', duration: '3:19', status: 'pending' },
      { id: 'lat-2', title: 'Gasolina', artist: 'Daddy Yankee', duration: '3:12', status: 'pending' },
      { id: 'lat-3', title: 'Bailando', artist: 'Enrique Iglesias', duration: '4:03', status: 'pending' },
    ]
  },
  {
    id: 'mixify-afropop',
    title: 'Mixify — Lounge Afropop',
    trackCount: 87,
    selectedCount: 87,
    durationStr: '4h 50min',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'afr-1', title: 'Calm Down', artist: 'Rema', duration: '3:39', status: 'pending' },
      { id: 'afr-2', title: 'Last Last', artist: 'Burna Boy', duration: '2:52', status: 'pending' },
      { id: 'afr-3', title: 'Essence', artist: 'Wizkid ft. Tems', duration: '4:08', status: 'pending' },
    ]
  },
  {
    id: 'mixify-goodvibes',
    title: 'Mixify — Sunset Chill & Deep Vibes',
    trackCount: 39,
    selectedCount: 39,
    durationStr: '2h 20min',
    coverUrl: 'https://images.unsplash.com/photo-1445985543469-753ec9c0e7a4?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'gv-1', title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:57', status: 'pending' },
      { id: 'gv-2', title: 'Fade Out Lines', artist: 'The Avener', duration: '3:14', status: 'pending' },
    ]
  },
  {
    id: 'mixify-shatta',
    title: 'Mixify — Shatta & Dancehall',
    trackCount: 34,
    selectedCount: 34,
    durationStr: '1h 55min',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'sh-1', title: 'Tchoupinambour', artist: 'DJ Fly', duration: '2:40', status: 'pending' },
      { id: 'sh-2', title: 'Plikita', artist: 'Koba LaD', duration: '3:05', status: 'pending' },
    ]
  },
  {
    id: 'mixify-malia',
    title: 'Mixify — Best of Pop Hits 🌟',
    trackCount: 217,
    selectedCount: 217,
    durationStr: '12h 40min',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80',
    selected: true,
    tracks: [
      { id: 'm-1', title: 'Flowers', artist: 'Miley Cyrus', duration: '3:20', status: 'pending' },
      { id: 'm-2', title: 'As It Was', artist: 'Harry Styles', duration: '2:47', status: 'pending' },
      { id: 'm-3', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', status: 'pending' },
    ]
  }
];
