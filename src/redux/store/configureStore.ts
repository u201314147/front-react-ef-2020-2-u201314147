import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from '../../types/actions'
import { apiStatusReducer } from '../reducers/apiStatusReducer'
import { courseReducer } from '../reducers/courseReducer'
import { professorReducer } from '../reducers/professorReducer'

export const rootReducer = combineReducers({
  courses: courseReducer,
  professors: professorReducer,
  apiCallsInProgress: apiStatusReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
)
