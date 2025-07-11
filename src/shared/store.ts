import {create} from 'zustand';

import type {NumberType} from '@/@types/types.dto';

interface NumberInputState {
  type: NumberType | '';
  number: string | number;
  isRandom: boolean;
}

interface NumberInputActions {
  updateType: (type: NumberInputState['type']) => void;
  updateNumber: (type: NumberInputState['number']) => void;
  updateIsRandom: (type: NumberInputState['isRandom']) => void;
}

export const useNumberInputStore = create<
  NumberInputState & NumberInputActions
>((set) => ({
  type: '',
  number: 0,
  isRandom: false,
  updateType: (type) => set(() => ({type})),
  updateNumber: (number) => set(() => ({number})),
  updateIsRandom: (isRandom) => set(() => ({isRandom})),
}));
