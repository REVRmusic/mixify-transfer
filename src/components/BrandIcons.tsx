import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const MixifyLogoMark: React.FC<IconProps> = ({ className = "w-7 h-7" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-emerald-500/20">
      <div className="flex items-center gap-0.5 h-3.5">
        <span className="w-0.5 bg-[#08090E] rounded-full h-2 animate-wave-pulse-1" />
        <span className="w-0.5 bg-[#08090E] rounded-full h-3.5 animate-wave-pulse-2" />
        <span className="w-0.5 bg-[#08090E] rounded-full h-1.5 animate-wave-pulse-3" />
        <span className="w-0.5 bg-[#08090E] rounded-full h-3 animate-wave-pulse-4" />
      </div>
    </div>
  </div>
);

export const StudioEqualizer: React.FC<{ active?: boolean; className?: string }> = ({ active = true, className = "h-4" }) => (
  <div className={`flex items-end gap-1 ${className}`}>
    <span className={`w-1 rounded-full bg-[#00F5A0] ${active ? 'animate-wave-pulse-1 h-3' : 'h-1.5'}`} />
    <span className={`w-1 rounded-full bg-[#00D9F5] ${active ? 'animate-wave-pulse-2 h-5' : 'h-3'}`} />
    <span className={`w-1 rounded-full bg-[#3B82F6] ${active ? 'animate-wave-pulse-3 h-2.5' : 'h-1.5'}`} />
    <span className={`w-1 rounded-full bg-[#00F5A0] ${active ? 'animate-wave-pulse-4 h-4' : 'h-2'}`} />
  </div>
);

export const SpotifyIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.502 9.722 1.114.294.18.386.563.207.856zm1.224-2.72c-.226.368-.71.485-1.077.26-2.69-1.654-6.79-2.134-9.97-1.168-.413.125-.85-.109-.975-.521-.125-.413.109-.85.521-.975 3.633-1.103 8.163-.566 11.24 1.328.368.226.486.71.261 1.076zm.106-2.827C14.693 8.94 9.38 8.764 6.3 9.7c-.496.15-1.02-.132-1.17-.628-.151-.496.132-1.02.628-1.17 3.535-1.072 9.404-.863 13.115 1.338.446.265.59.845.326 1.29-.264.447-.845.59-1.283.327z"/>
  </svg>
);

export const DeezerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 6.5h3.6V10H18.8zM18.8 11h3.6v3.5H18.8zM18.8 15.5h3.6V19H18.8zM14.6 11h3.6v3.5H14.6zM14.6 15.5h3.6V19H14.6zM10.4 11h3.6v3.5H10.4zM10.4 15.5h3.6V19H10.4zM6.2 11h3.6v3.5H6.2zM6.2 15.5h3.6V19H6.2zM2 15.5h3.6V19H2z"/>
  </svg>
);

export const AppleMusicIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.57-.69.96-1.66.86-2.63-.83.03-1.84.55-2.43 1.25-.52.6-.98 1.57-.86 2.51.93.07 1.86-.44 2.43-1.13"/>
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const TidalIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 3.992L8.008 7.996l4.004 4.004 4.004-4.004-4.004-4.004zm-8.016 8.016L0 16.012l4.004 4.004 4.004-4.004-4.012-4.004zm8.016 0l-4.004 4.004 4.004 4.004 4.004-4.004-4.004-4.004zm8.008 0l-4.004 4.004 4.004 4.004 4.004-4.004-4.004-4.004z"/>
  </svg>
);

export const AmazonMusicIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.42 16.48c-3.15 1.58-7.38 2.05-10.74.57-.49-.22-.72-.78-.45-1.24.26-.45.83-.58 1.34-.36 2.87 1.25 6.54.85 9.27-.52.54-.27 1.13.06 1.27.63.14.56-.21 1.05-.69 1.19v-.27zm.99-2.31c-3.8 2.08-9.03 2.5-12.87.53-.59-.3-.83-.98-.49-1.53.33-.53 1.05-.67 1.66-.36 3.32 1.69 7.91 1.32 11.23-.49.64-.35 1.37.03 1.55.72.18.68-.26 1.28-.88 1.45l-.2-.32zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>
);

export const SoundCloudIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.175 12.225c-.092 0-.166.074-.175.166l-.166 2.658.166 2.625c.009.092.083.166.175.166.092 0 .167-.074.175-.166l.192-2.625-.192-2.658c-.008-.092-.083-.166-.175-.166zm1.4 0c-.092 0-.166.074-.175.166l-.166 2.658.166 2.625c.009.092.083.166.175.166.092 0 .167-.074.175-.166l.2-2.625-.2-2.658c-.008-.092-.083-.166-.175-.166zm19.642 1.008c-.283 0-.558.05-.808.15a3.842 3.842 0 0 0-3.6-2.508c-.467 0-.908.083-1.325.233-.217-2.733-2.508-4.875-5.308-4.875-.658 0-1.283.125-1.858.358-.158.067-.225.25-.15.408l.183.417c.067.15.242.217.4.15.458-.192.95-.292 1.458-.292 2.142 0 3.892 1.633 4.05 3.733.017.183.158.325.342.342.192.017.35-.1.383-.292.083-.458.283-.875.583-1.208a2.533 2.533 0 0 1 1.892-.808c1.35 0 2.458 1.05 2.533 2.392.008.192.158.342.35.342h.167c1.3 0 2.358 1.058 2.358 2.358 0 1.3-1.058 2.358-2.358 2.358h-7.85c-.208 0-.375-.167-.375-.375v-6.75c0-.208-.167-.375-.375-.375h-.75c-.208 0-.375.167-.375.375v6.75c0 .208-.167.375-.375.375h-.75c-.208 0-.375-.167-.375-.375v-5.75c0-.208-.167-.375-.375-.375h-.75c-.208 0-.375.167-.375.375v5.75c0 .208-.167.375-.375.375H4.25c-.208 0-.375-.167-.375-.375v-4.5c0-.208-.167-.375-.375-.375H2.75c-.208 0-.375.167-.375.375v4.5c0 .208-.167.375-.375.375h-.825c-.208 0-.375-.167-.375-.375v-3c0-.208-.167-.375-.375-.375H.425C.217 14.35.05 14.517.05 14.725v3c0 .208.167.375.375.375h21.792c2.067 0 3.75-1.683 3.75-3.75s-1.683-3.75-3.75-3.75z"/>
  </svg>
);

export const QobuzIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
  </svg>
);

export const BeatportIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 11.2c-.3-1.6-1.5-2.8-3.1-3.1-.3 0-.6 0-.9.1V4h-3.6v8.4c-.4-.3-.9-.4-1.4-.4-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2v-1.1c.3.1.6.1.9.1 1.6.3 2.8 1.5 3.1 3.1h1.8c-.3-2.5-2.3-4.5-4.8-4.8 2.5-.3 4.5-2.3 4.8-4.8h-1.8z"/>
  </svg>
);
