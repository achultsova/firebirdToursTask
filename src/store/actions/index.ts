import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FILTER_USERS, REMOVE_USER, RESET } from '../../types/actions';
import { UserActionTypes } from '../../types/UserActionTypes';
import { User, AppState } from '../../types/userType';

export const fetchUsersRequest = (): UserActionTypes => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: User[]): UserActionTypes => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string): UserActionTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = (): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
  dispatch(fetchUsersRequest());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    dispatch(fetchUsersSuccess(data));
  } catch (error: any) {
    if (error instanceof Error) {
      dispatch(fetchUsersFailure(error.message));
    } else {
      dispatch(fetchUsersFailure('An unknown error occurred.'));
    }
  }
}

export const filterUsers = (searchTerm: string): UserActionTypes => ({
  type: FILTER_USERS,
  payload: searchTerm,
});

export const removeUser = (id: number): UserActionTypes => ({
  type: REMOVE_USER,
  payload: id,
});

export const reset = (): UserActionTypes => ({
  type: RESET,
});