
import { DeviceConfig } from './types';

export const DEVICES: DeviceConfig[] = [
  {
    id: 'mobile',
    name: 'Mobile (iPhone 14)',
    width: 390,
    height: 844,
    canRotate: true
  },
  {
    id: 'tablet',
    name: 'Tablet (Standard)',
    width: 768,
    height: 1024,
    canRotate: true
  },
  {
    id: 'laptop',
    name: 'Laptop (Standard)',
    width: 1366,
    height: 768,
    canRotate: false
  },
  {
    id: 'desktop',
    name: 'Desktop (Ultra-Wide)',
    width: 1920,
    height: 1080,
    canRotate: false
  }
];

export const DEFAULT_ZOOM = 0.35;
