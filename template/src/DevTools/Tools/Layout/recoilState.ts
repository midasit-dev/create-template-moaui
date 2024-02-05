import { ReactNode } from 'react';
import { type LayoutSchemas } from '../../types';
import { atom } from 'recoil';

export const LayoutBoxState = atom<{ id: string; element: ReactNode }[]>({
  key: 'LayoutBoxState',
	default: [],
});

export const LayoutSchemaState = atom<LayoutSchemas>({
	key: 'LayoutSchemaState',
	default: [],
});