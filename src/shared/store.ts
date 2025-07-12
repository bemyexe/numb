import {create} from 'zustand';

export interface NumberInputState {
  type: string;
  number: string;
  isRandom: boolean;
  error?: {
    type?: string;
    number?: string;
  };
}

interface NumberInputActions {
  updateType: (type: NumberInputState['type']) => void;
  updateNumber: (type: NumberInputState['number']) => void;
  updateIsRandom: (type: NumberInputState['isRandom']) => void;
  validate: () => boolean;
  reset: () => void;
}

const INITIAL_STATE: NumberInputState = {
  type: '',
  number: '',
  isRandom: false,
  error: undefined,
};

export const useNumberInputStore = create<
  NumberInputState & NumberInputActions
>((set, get) => ({
  ...INITIAL_STATE,
  updateType: (type) =>
    set((state) => ({
      type,
      error: {...state.error, type: undefined},
    })),
  updateNumber: (number) =>
    set((state) => ({
      number,
      error: {...state.error, number: undefined},
    })),
  updateIsRandom: (isRandom) =>
    set((state) => ({isRandom, error: {...state.error, number: undefined}})),
  validate: () => {
    const {type, number, isRandom} = get();
    let valid = true;
    const errors: {type?: string; number?: string} = {};

    if (!type) {
      errors.type = 'Select at least one type';
      valid = false;
    }

    if (!isRandom && !number) {
      errors.number = 'Enter a number or choose a random';
      valid = false;
    }
    set({
      error: {
        type: errors.type,
        number: errors.number,
      },
    });
    return valid;
  },
  reset: () => set(INITIAL_STATE),
}));
