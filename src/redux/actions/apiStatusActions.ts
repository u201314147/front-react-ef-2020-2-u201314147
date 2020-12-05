import { API_CALL_ERROR, AppActions, BEGIN_API_CALL } from '../../types/actions'

export const beginApiCall = (): AppActions => ({
  type: BEGIN_API_CALL,
})

export const apiCallError = (): AppActions => ({
  type: API_CALL_ERROR,
})
