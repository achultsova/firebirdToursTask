import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { AppState } from '../types/userType'

// Custom hook to dispatch actions
export function useAppDispatch() {
    return useDispatch<ThunkDispatch<AppState, unknown, AnyAction>>()
}