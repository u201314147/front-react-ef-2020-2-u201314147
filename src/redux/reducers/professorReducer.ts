import { IProfessor } from '../../types/professor'
import { AppActions, LOAD_PROFESSORS_SUCCESS } from '../../types/actions'

const professorReducerDefaultState: IProfessor[] = []

const professorReducer = (
  state = professorReducerDefaultState,
  action: AppActions,
): IProfessor[] => {
  switch (action.type) {
    case LOAD_PROFESSORS_SUCCESS:
      return action.professors
    default:
      return state
  }
}

export { professorReducer }
