import { ReactNode } from 'react';
import { ControllerInputs, type Layers } from '../../types';
import { atom, selector } from 'recoil';

export const CanvasState = atom({
	key: 'CanvasState',
	default: {
		width: 592,
		height: 512,
	}
});

export const defaultControllerState = {
	x: 0,
	y: 0,
	width: 160,
	height: 48,
	spacing: 0,
};

export const ControllerState = atom<ControllerInputs>({
	key: 'ControllerState',
	default: defaultControllerState,
});

export const LayerRenderingBoxesState = atom<{ id: string; element: ReactNode }[]>({
  key: 'LayerRenderingBoxesState',
	default: [],
});

export const LayersState = atom<Layers>({
	key: 'LayersState',
	default: [],
});
