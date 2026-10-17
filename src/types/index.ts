export type PlatformId = 
  | 'spotify'
  | 'apple-music'
  | 'youtube-music'
  | 'youtube'
  | 'deezer'
  | 'tidal'
  | 'amazon-music'
  | 'soundcloud'
  | 'yandex-music'
  | 'qobuz'
  | 'beatport'
  | 'itunes'
  | 'pandora'
  | 'anghami'
  | 'kkbox'
  | 'lastfm'
  | 'soundmachine'
  | 'boomplay'
  | 'audiomack'
  | 'text'
  | 'file'
  | 'url';

export type PlatformCategory = 'all' | 'popular' | 'dj' | 'files';

export interface Platform {
  id: PlatformId;
  name: string;
  category: 'popular' | 'dj' | 'files';
  tag: string;
  color: string;
  notice?: string;
  supportsAccount: boolean;
  supportsUrl: boolean;
  urlPlaceholder?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  isrc?: string;
  coverUrl?: string;
  matchedTitle?: string;
  matchedArtist?: string;
  matchScore?: number;
  status: 'pending' | 'transferring' | 'matched' | 'unmatched';
}

export interface Playlist {
  id: string;
  title: string;
  trackCount: number;
  selectedCount: number;
  durationStr?: string;
  coverUrl: string;
  tracks: Track[];
  selected: boolean;
}

export type TransferStep = 1 | 2 | 3 | 4 | 5;

export type ImportMethod = 'account' | 'url' | 'file' | 'text';

export interface TransferPreferences {
  autoMatchExactOnly: boolean;
  removeDuplicates: boolean;
  isPrivatePlaylist: boolean;
}
