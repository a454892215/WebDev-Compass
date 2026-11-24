import type { InjectionKey, Ref } from "vue";
export interface LabTheme {
  value: Readonly<Ref<"light" | "dark">>;
  toggle: () => void;
}
export const themeKey: InjectionKey<LabTheme> = Symbol("lab-theme");
