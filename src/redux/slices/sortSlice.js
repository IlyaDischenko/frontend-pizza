import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeSort: 0,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (state, i) => {
      state.activeSort = i.payload
    }
  },
})

export const { setActiveSort } = sortSlice.actions

export default sortSlice.reducer