import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FILTER_USERS, REMOVE_USER, RESET } from './actions'
import { UserState } from './userType'

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: UserState;
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

interface FilterUsersAction {
  type: typeof FILTER_USERS;
  payload: string; 
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
  payload: number; 
}

interface ResetAction {
  type: typeof RESET;
}

export type UserActionTypes = FetchUsersRequestAction | FetchUsersSuccessAction | FetchUsersFailureAction | FilterUsersAction | RemoveUserAction | ResetAction;