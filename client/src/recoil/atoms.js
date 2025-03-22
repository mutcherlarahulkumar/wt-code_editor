import { atom } from 'recoil';

export const code = atom({
  key: 'code', // Unique ID (must be unique across all atoms/selectors)
  default: '',      // Initial value
});

export const terminaltext = atom({
    key: 'terminaltext', // Unique ID (must be unique across all atoms/selectors)
    default: '',      // Initial value
  });