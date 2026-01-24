
export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export type PreviewMode = 'live' | 'snapshot';

export interface ViewportSize {
  width: number;
  height: number;
}

export interface DeviceConfig {
  id: DeviceType;
  name: string;
  width: number;
  height: number;
  canRotate: boolean;
}

export type Orientation = 'portrait' | 'landscape';

export interface AppState {
  url: string;
  zoom: number;
  orientations: Record<string, Orientation>;
  previewMode: PreviewMode;
  isChecking: boolean;
}
