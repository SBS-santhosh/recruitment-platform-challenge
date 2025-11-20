// store/candidateSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Load initial state from localStorage
const loadState = () => {
  if (typeof window === 'undefined') {
    return {
      candidates: [],
      loading: false,
    };
  }
  
  try {
    const serializedState = localStorage.getItem('candidatesState');
    if (serializedState === null) {
      return {
        candidates: [],
        loading: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return {
      candidates: [],
      loading: false,
    };
  }
};

const initialState = loadState();

export const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      const newCandidate = {
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...action.payload,
      };
      state.candidates.push(newCandidate);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('candidatesState', JSON.stringify(state));
          console.log('Candidate saved to localStorage:', newCandidate);
        } catch (err) {
          console.error('Error saving to localStorage:', err);
        }
      }
    },
    acceptCandidate: (state, action) => {
      const candidate = state.candidates.find(c => c.id === action.payload)
      if (candidate) {
        candidate.status = 'accepted'
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('candidatesState', JSON.stringify(state));
      }
    },
    rejectCandidate: (state, action) => {
      state.candidates = state.candidates.filter(c => c.id !== action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('candidatesState', JSON.stringify(state));
      }
    },
    updateCandidate: (state, action) => {
      const index = state.candidates.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.candidates[index] = { ...state.candidates[index], ...action.payload }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('candidatesState', JSON.stringify(state));
      }
    },
    clearCandidates: (state) => {
      state.candidates = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('candidatesState');
      }
    }
  },
})

export const { 
  addCandidate, 
  acceptCandidate, 
  rejectCandidate, 
  updateCandidate,
  clearCandidates 
} = candidateSlice.actions

export const selectCandidates = (state) => state.candidates.candidates
export const selectPendingCandidates = (state) => 
  state.candidates.candidates.filter(c => c.status === 'pending')
export const selectAcceptedCandidates = (state) => 
  state.candidates.candidates.filter(c => c.status === 'accepted')

export default candidateSlice.reducer