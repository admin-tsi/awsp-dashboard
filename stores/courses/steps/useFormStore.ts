// stores/useFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  formData: { [key: string]: any };
  setFormData: (id: string, data: { [key: string]: any }) => void;
  clearFormData: (id: string) => void;
  mergeFormData: (id: string, data: { [key: string]: any }) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (id, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [id]: { ...state.formData[id], ...data },
          },
        })),
      clearFormData: (id) =>
        set((state) => ({
          formData: { ...state.formData, [id]: {} },
        })),
      mergeFormData: (id, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [id]: { ...data, ...state.formData[id] },
          },
        })),
    }),
    {
      name: "form-storage",
      partialize: (state) => ({
        formData: Object.keys(state.formData).reduce(
          (acc, id) => {
            acc[id] = {
              ...state.formData[id],
              thumbnail: undefined,
            };
            return acc;
          },
          {} as { [key: string]: any },
        ),
      }),
    },
  ),
);
