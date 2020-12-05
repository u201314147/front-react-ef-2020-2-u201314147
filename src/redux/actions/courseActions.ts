import * as courseService from '../../services/courseService'
import { StatusCodes } from 'http-status-codes'
import { ICourse } from '../../types/course'
import {
  AppActions,
  DELETE_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  REGISTER_COURSE_SUCCESS,
} from '../../types/actions'
import { Dispatch } from 'redux'
import { apiCallError, beginApiCall } from './apiStatusActions'

export const loadCoursesSuccess = (courses: ICourse[]): AppActions => ({
  type: LOAD_COURSES_SUCCESS,
  courses,
})

export const registerCourseSuccess = (course: ICourse): AppActions => ({
  type: REGISTER_COURSE_SUCCESS,
  course,
})

export const editCourseSuccess = (course: ICourse): AppActions => ({
  type: EDIT_COURSE_SUCCESS,
  course,
})

export const deleteCourseSuccess = (course: ICourse): AppActions => ({
  type: DELETE_COURSE_SUCCESS,
  course,
})

export const loadCourses = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(beginApiCall())
    const response: Response = await courseService.getCourses()
    if (response.status === StatusCodes.OK) {
      const courses: ICourse[] = await response.json()
      dispatch(loadCoursesSuccess(courses))
      return ''
    }
    dispatch(apiCallError())
    return 'Loading courses failed.'
  }
}

export const registerCourse = (course: ICourse) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(beginApiCall())
    const response: Response = await courseService.registerCourse(course)
    if (response.status === StatusCodes.CREATED) {
      const registeredCourse: ICourse = await response.json()
      dispatch(registerCourseSuccess(registeredCourse))
      return ''
    }
    dispatch(apiCallError())
    return 'Register course failed.'
  }
}

export function editCourse(course: ICourse) {
  return async function (dispatch: Dispatch<AppActions>) {
    dispatch(beginApiCall())
    const response: Response = await courseService.editCourse(course)
    if (response.status === StatusCodes.OK) {
      const editedCourse: ICourse = await response.json()
      dispatch(editCourseSuccess(editedCourse))
      return ''
    }
    dispatch(apiCallError())
    return 'Edit course failed.'
  }
}

export function deleteCourse(course: ICourse) {
  return async function (dispatch: Dispatch<AppActions>) {
    dispatch(beginApiCall())
    const response: Response = await courseService.deleteCourse(course.id)
    if (response.status === StatusCodes.OK) {
      dispatch(deleteCourseSuccess(course))
      return ''
    }
    dispatch(apiCallError())
    return 'Delete course failed.'
  }
}
