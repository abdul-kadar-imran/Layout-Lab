
import React, { useState, useEffect } from 'react';
import { DeviceConfig, Orientation, PreviewMode } from '../types';
import { IconRotate } from './Icons';

interface DeviceFrameProps {
  device: DeviceConfig;
  url: string;
  zoom: number;
  orientation: Orientation;
  onToggleOrientation: () => void;
  refreshKey: number;
  previewMode: PreviewMode;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  url,
  zoom,
  orientation,
  onToggleOrientation,
  refreshKey,
  previewMode
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isLandscape = orientation === 'landscape';
  const displayWidth = isLandscape ? device.height : device.width;
  const displayHeight = isLandscape ? device.width : device.height;

  const baseScale = zoom;

  // Reset loading state on URL or orientation change
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [url, orientation, refreshKey]);

  // Server-side snapshot URL (Using Microlink as a robust SSR fallback)
  const snapshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&viewport.width=${displayWidth}&viewport.height=${displayHeight}&viewport.isMobile=${device.id === 'mobile'}&viewport.hasTouch=${device.id === 'mobile' || device.id === 'tablet'}&viewport.deviceScaleFactor=2`;
  
  return (
    <div className="flex flex-col items-center group">
      {/* Device Header */}
      <div 
        className="flex items-center justify-between w-full px-5 py-3 bg-slate-800/80 backdrop-blur-md border-x border-t border-slate-700/50 z-10 relative rounded-t-3xl shadow-lg"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-slate-100 uppercase tracking-widest leading-none">{device.name}</span>
            <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter transition-colors duration-300 ${
              previewMode === 'live' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {previewMode === 'live' ? 'Live' : 'Snapshot'}
            </span>
          </div>
          <span className="text-[10px] mono text-slate-500 font-medium">
            {displayWidth}px × {displayHeight}px {isLandscape ? '(Landscape)' : ''}
          </span>
        </div>
        
        {device.canRotate && (
          <button 
            onClick={onToggleOrientation}
            type="button"
            className="p-2 hover:bg-indigo-500/20 rounded-xl text-slate-400 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/30 active:scale-90"
            title="Toggle Orientation"
          >
            <IconRotate className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Frame Container */}
      <div 
        className="relative bg-slate-900 border border-slate-700/50 overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 rounded-b-3xl"
        style={{
          width: displayWidth * baseScale,
          height: displayHeight * baseScale,
        }}
      >
        <div 
          className="absolute origin-top-left bg-white"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `scale(${baseScale})`,
            borderRadius: '0 0 32px 32px'
          }}
        >
          {previewMode === 'live' ? (
            <iframe
              key={`${device.id}-${refreshKey}`}
              src={url}
              title={device.name}
              className="w-full h-full border-none pointer-events-auto"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
              {/* Skeleton Loader */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-slate-800 animate-pulse flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Generating Snapshot...</span>
                </div>
              )}

              <img 
                key={`${device.id}-${refreshKey}`}
                src={imageError ? `https://placehold.co/${displayWidth}x${displayHeight}/020617/indigo?text=Snapshot+Unavailable` : snapshotUrl} 
                alt={`${device.name} Viewport`}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              
              {imageLoaded && !imageError && (
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_indigo] animate-pulse"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative reflection */}
      <div className="w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-md mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default DeviceFrame;
