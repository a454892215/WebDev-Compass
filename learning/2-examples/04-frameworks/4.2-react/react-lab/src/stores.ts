import { createStore } from 'zustand/vanilla'
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { QueryClient } from '@tanstack/react-query'
export function makeSelectionStore() {
  return createStore<{ selected: string | null; select: (id: string) => void }>(
    (set) => ({ selected: null, select: (id) => set({ selected: id }) }),
  )
}
export const fetchTitle = createAsyncThunk(
  'title/load',
  async (input: { fail: boolean }) => {
    if (input.fail) throw new Error('fixture failure')
    return 'Vue入门'
  },
)
const titleSlice = createSlice({
  name: 'title',
  initialState: { value: '', status: 'idle' },
  reducers: {
    clear(state) {
      state.value = ''
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTitle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTitle.fulfilled, (state, action) => {
        state.value = action.payload
        state.status = 'success'
      })
      .addCase(fetchTitle.rejected, (state) => {
        state.status = 'error'
      })
  },
})
export function makeReduxStore() {
  return configureStore({ reducer: { title: titleSlice.reducer } })
}
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 1000, gcTime: 60_000 },
    },
  })
}

export async function optimisticAppend(
  client: QueryClient,
  key: readonly string[],
  value: string,
  save: () => Promise<void>,
) {
  await client.cancelQueries({ queryKey: key })
  const previous = client.getQueryData<string[]>(key)
  client.setQueryData(key, [...(previous ?? []), value])
  try {
    await save()
  } catch (error: unknown) {
    if (previous === undefined)
      client.removeQueries({ queryKey: key, exact: true })
    else client.setQueryData(key, previous)
    throw error
  } finally {
    await client.invalidateQueries({ queryKey: key, exact: true })
  }
}
