import { ICourse } from '../../types/course'
import {
  AppActions,
  DELETE_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  REGISTER_COURSE_SUCCESS,
} from '../../types/actions'

const courseReducerDefaultState: ICourse[] = []

const courseReducer = (
  state = courseReducerDefaultState,
  action: AppActions,
): ICourse[] => {
  switch (action.type) {
    case REGISTER_COURSE_SUCCESS:
      return [...state, { ...action.course }]
    case EDIT_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course,
      )
    case LOAD_COURSES_SUCCESS:
      return action.courses
    case DELETE_COURSE_SUCCESS:
      return state.filter((course) => course.id !== action.course.id)
    default:
      return state
  }
}

export { courseReducer }
