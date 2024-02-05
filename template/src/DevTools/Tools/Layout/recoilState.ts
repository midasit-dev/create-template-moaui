import { ReactNode } from 'react';
import { type Layers } from '../../types';
import { atom } from 'recoil';

export const CanvasState = atom({
	key: 'CanvasState',
	default: {
		width: 592,
		height: 512,
	}
});

export const LayerRenderingBoxesState = atom<{ id: string; element: ReactNode }[]>({
  key: 'LayerRenderingBoxesState',
	default: [],
});

export const LayersState = atom<Layers>({
	key: 'LayersState',
	default: [],
});