import * as professorService from '../../services/professorService'
import { StatusCodes } from 'http-status-codes'
import { IProfessor } from '../../types/professor'
import { AppActions, LOAD_PROFESSORS_SUCCESS } from '../../types/actions'
import { Dispatch } from 'redux'
import { apiCallError, beginApiCall } from './apiStatusActions'

export const loadProfessorSuccess = (professors: IProfessor[]): AppActions => ({
  type: LOAD_PROFESSORS_SUCCESS,
  professors,
})

export function loadProfessors() {
  return async function (dispatch: Dispatch<AppActions>) {
    dispatch(beginApiCall())
    const response: Response = await professorService.getProfessors()
    if (response.status === StatusCodes.OK) {
      const professors: IProfessor[] = await response.json()
      dispatch(loadProfessorSuccess(professors))
      return ''
    }
    dispatch(apiCallError())
    return 'Loading professors failed'
  }
}
