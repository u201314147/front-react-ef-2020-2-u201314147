import { AppActions, BEGIN_API_CALL, API_CALL_ERROR } from '../../types/actions'

function actionTypeEndsInSuccess(type: string) {
  return type.substring(type.length - 8) === '_SUCCESS'
}

const apiStatusReducerDefaultState: number = 0

const apiStatusReducer = (
  state = apiStatusReducerDefaultState,
  action: AppActions,
): number => {
  if (action.type === BEGIN_API_CALL) {
    return state + 1
  } else if (
    action.type === API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1
  }
  return state
}

export { apiStatusReducer }
