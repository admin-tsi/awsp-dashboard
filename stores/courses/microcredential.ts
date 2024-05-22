import { create } from "zustand";
import { Microcredential } from "@/lib/types";

interface MicrocredentialsState {
  microcredentials: Microcredential[];
  setMicrocredentials: (microcredentials: Microcredential[]) => void;
}

export const useMicrocredentialsStore = create<MicrocredentialsState>(
  (set) => ({
    microcredentials: [],
    setMicrocredentials: (microcredentials: Microcredential[]) =>
      set({ microcredentials }),
  }),
);
