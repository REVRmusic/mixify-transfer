import React, { useState } from 'react';
import { Platform, Playlist, TransferStep, ImportMethod } from './types';
import { PLATFORMS } from './data/platforms';
import { INITIAL_PLAYLISTS } from './data/mockPlaylists';

import { Header } from './components/Header';
import { Step1SelectSource } from './components/Step1SelectSource';
import { Step2SourceMethod } from './components/Step2SourceMethod';
import { Step3SelectPlaylists } from './components/Step3SelectPlaylists';
import { Step4SelectDestination } from './components/Step4SelectDestination';
import { Step5TransferProgress } from './components/Step5TransferProgress';
import { FooterHelp } from './components/FooterHelp';

import { FaqModal } from './components/FaqModal';
import { ContactModal } from './components/ContactModal';
import { TrackInspectorModal } from './components/TrackInspectorModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransferStep>(1);
  const [sourcePlatform, setSourcePlatform] = useState<Platform | null>(null);
  const [destinationPlatform, setDestinationPlatform] = useState<Platform | null>(null);
  const [importMethod, setImportMethod] = useState<ImportMethod>('account');
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS.slice(0, 1));
  const [inspectingPlaylist, setInspectingPlaylist] = useState<Playlist | null>(null);

  // Modals
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Step 1: Select Source
  const handleSelectSource = (platform: Platform) => {
    setSourcePlatform(platform);
    if (platform.id === 'spotify') {
      setDestinationPlatform(PLATFORMS.find(p => p.id === 'deezer') || null);
    } else if (platform.id === 'deezer') {
      setDestinationPlatform(PLATFORMS.find(p => p.id === 'spotify') || null);
    } else {
      setDestinationPlatform(null);
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 handlers
  const handleContinueWithAccount = () => {
    setImportMethod('account');
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueWithUrl = (url: string, customPlaylist?: Playlist) => {
    setImportMethod('url');
    if (customPlaylist) {
      setPlaylists([customPlaylist, ...INITIAL_PLAYLISTS]);
      setSelectedPlaylists([customPlaylist]);
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueWithFile = (customPlaylist: Playlist) => {
    setImportMethod('file');
    setPlaylists([customPlaylist, ...INITIAL_PLAYLISTS]);
    setSelectedPlaylists([customPlaylist]);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueWithText = (customPlaylist: Playlist) => {
    setImportMethod('text');
    setPlaylists([customPlaylist, ...INITIAL_PLAYLISTS]);
    setSelectedPlaylists([customPlaylist]);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 handlers
  const handleConfirmPlaylistSelection = (selected: Playlist[]) => {
    setSelectedPlaylists(selected);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectPlaylist = (playlist: Playlist) => {
    setInspectingPlaylist(playlist);
  };

  const handleUpdatePlaylist = (updated: Playlist) => {
    setPlaylists(prev => prev.map(p => p.id === updated.id ? updated : p));
    setSelectedPlaylists(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Step 4 handlers
  const handleSelectDestination = (platform: Platform) => {
    setDestinationPlatform(platform);
  };

  const handleStartTransfer = () => {
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global navigation
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as TransferStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSourcePlatform(null);
    setDestinationPlatform(null);
    setSelectedPlaylists(INITIAL_PLAYLISTS.slice(0, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090E] bg-ambient-glow text-[#F3F4F8] selection:bg-[#00F5A0] selection:text-[#08090E]">
      {/* Studio Navigation Header */}
      <Header
        currentStep={currentStep}
        onBack={handleBack}
        onReset={handleReset}
        onOpenFaq={() => setIsFaqOpen(true)}
      />

      {/* Main Flow */}
      <main className="flex-1 flex flex-col relative z-10">
        {currentStep === 1 && (
          <Step1SelectSource onSelectSource={handleSelectSource} />
        )}

        {currentStep === 2 && sourcePlatform && (
          <Step2SourceMethod
            sourcePlatform={sourcePlatform}
            onBack={handleBack}
            onContinueWithAccount={handleContinueWithAccount}
            onContinueWithUrl={handleContinueWithUrl}
            onContinueWithFile={handleContinueWithFile}
            onContinueWithText={handleContinueWithText}
          />
        )}

        {currentStep === 3 && sourcePlatform && (
          <Step3SelectPlaylists
            sourcePlatform={sourcePlatform}
            playlists={playlists}
            onBack={handleBack}
            onConfirmSelection={handleConfirmPlaylistSelection}
            onInspectPlaylist={handleInspectPlaylist}
            onSwitchAccount={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && sourcePlatform && (
          <Step4SelectDestination
            sourcePlatform={sourcePlatform}
            destinationPlatform={destinationPlatform}
            selectedPlaylists={selectedPlaylists}
            onBack={handleBack}
            onSelectDestination={handleSelectDestination}
            onStartTransfer={handleStartTransfer}
            onEditPlaylist={handleInspectPlaylist}
          />
        )}

        {currentStep === 5 && sourcePlatform && destinationPlatform && (
          <Step5TransferProgress
            sourcePlatform={sourcePlatform}
            destinationPlatform={destinationPlatform}
            playlists={selectedPlaylists}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Community Footer */}
      {currentStep < 5 && (
        <FooterHelp
          onOpenFaq={() => setIsFaqOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
      )}

      {/* Modals */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <TrackInspectorModal
        playlist={inspectingPlaylist}
        isOpen={!!inspectingPlaylist}
        onClose={() => setInspectingPlaylist(null)}
        onUpdatePlaylist={handleUpdatePlaylist}
      />
    </div>
  );
};

export default App;
