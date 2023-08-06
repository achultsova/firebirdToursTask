import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FILTER_USERS, REMOVE_USER, RESET } from '../../types/actions'
import { UserActionTypes } from '../../types/UserActionTypes'
import { AppState, UserState } from '../../types/userType'

const initialState: AppState = {
    loading: false,
    error: '',
    filter: '',
    filteredData: [],
}

let fetchedUsers: UserState = []

const usersReducer = (state = initialState, action: UserActionTypes): AppState => {
    switch (action.type) {
    case FETCH_USERS_REQUEST:
        return { ...state, loading: true }

    case FETCH_USERS_SUCCESS:
        fetchedUsers = action.payload // keep a reference to the original data
        return { ...state, loading: false, filteredData: action.payload }

    case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload }

    case FILTER_USERS: {
        const filteredData = fetchedUsers.filter((user) =>
            [user.name, user.username, user.email].some((value) =>
                value.toLowerCase().includes(action.payload.toLowerCase())
            )
        )
        return { ...state, filteredData, filter: action.payload }
    }

    case REMOVE_USER:
        fetchedUsers = fetchedUsers.filter((user) => user.id !== action.payload)
        return {
            ...state,
            filteredData: state.filteredData.filter((user) => user.id !== action.payload),
        }

    case RESET:
        return { ...state, filter: '', filteredData: [] }
    default:
        return state
    }
}

export default usersReducer