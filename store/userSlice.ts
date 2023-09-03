import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: 'hello',
  reducers: {},
})

export default userSlice.reducer
