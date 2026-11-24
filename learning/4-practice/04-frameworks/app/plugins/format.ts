export default defineNuxtPlugin(() => ({
  provide: { formatCategory: (value: string) => value.toUpperCase() },
}))
