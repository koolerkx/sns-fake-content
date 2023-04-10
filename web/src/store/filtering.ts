// write me a zustand store that contains the following state:
// - label: "true" | "false" | null
// - year: number | null

import { create } from "zustand";

// write me a type that describes the state of the store
type FilteringState = {
    label: "true" | "false" | null;
    year: number | null;
    setLabel: (label: "true" | "false" | null) => void;
    setYear: (year: number | null) => void;
};

export const useFiltering = create<FilteringState>()((set) => ({
    label: null as "true" | "false" | null,
    year: null as number | null,
    setLabel: (label: "true" | "false" | null) => set({ label }),
    setYear: (year: number | null) => set({ year }),
}));
