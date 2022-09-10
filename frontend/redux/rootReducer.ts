import { AnyAction, CombinedState, combineReducers } from 'redux'
import locationsReducer, { Locations } from './reducers/locationsReducer'

interface ReducerState {
  locations: Locations
}

const rootReducer = (
  state: ReducerState | undefined,
  action: AnyAction
): CombinedState<ReducerState> => {
  const combinedReducer = combineReducers({
    locations: locationsReducer,
  })
  return combinedReducer(state, action)
}

export default rootReducer
