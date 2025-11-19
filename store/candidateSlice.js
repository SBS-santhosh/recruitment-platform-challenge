import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  candidates: [],
  loading: false,
}

export const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      state.candidates.push({
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...action.payload,
      })
    },
    acceptCandidate: (state, action) => {
      const candidate = state.candidates.find(c => c.id === action.payload)
      if (candidate) {
        candidate.status = 'accepted'
      }
    },
    rejectCandidate: (state, action) => {
      state.candidates = state.candidates.filter(c => c.id !== action.payload)
    },
    updateCandidate: (state, action) => {
      const index = state.candidates.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.candidates[index] = { ...state.candidates[index], ...action.payload }
      }
    },
  },
})

export const { 
  addCandidate, 
  acceptCandidate, 
  rejectCandidate, 
  updateCandidate 
} = candidateSlice.actions

export const selectCandidates = (state) => state.candidates.candidates
export const selectPendingCandidates = (state) => 
  state.candidates.candidates.filter(c => c.status === 'pending')
export const selectAcceptedCandidates = (state) => 
  state.candidates.candidates.filter(c => c.status === 'accepted')

export default candidateSlice.reducer