import { ICourse } from './course'
import { IProfessor } from './professor'

export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS'
export const REGISTER_COURSE_SUCCESS = 'REGISTER_COURSE_SUCCESS'
export const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS'
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS'
export const LOAD_PROFESSORS_SUCCESS = 'LOAD_PROFESSORS_SUCCESS'
export const BEGIN_API_CALL = 'BEGIN_API_CALL'
export const API_CALL_ERROR = 'API_CALL_ERROR'

export interface LoadCoursesSuccessAction {
  type: typeof LOAD_COURSES_SUCCESS
  courses: ICourse[]
}

export interface RegisterCourseSuccessAction {
  type: typeof REGISTER_COURSE_SUCCESS
  course: ICourse
}

export interface EditCourseSuccessAction {
  type: typeof EDIT_COURSE_SUCCESS
  course: ICourse
}

export interface DeleteCourseSuccessAction {
  type: typeof DELETE_COURSE_SUCCESS
  course: ICourse
}

export interface LoadProfessorsSuccessAction {
  type: typeof LOAD_PROFESSORS_SUCCESS
  professors: IProfessor[]
}

export interface BeginApiCallAction {
  type: typeof BEGIN_API_CALL
}

export interface ApiCallErrorAction {
  type: typeof API_CALL_ERROR
}

export type ActionTypes =
  | LoadCoursesSuccessAction
  | RegisterCourseSuccessAction
  | EditCourseSuccessAction
  | DeleteCourseSuccessAction
  | LoadProfessorsSuccessAction
  | BeginApiCallAction
  | ApiCallErrorAction

export type AppActions = ActionTypes
