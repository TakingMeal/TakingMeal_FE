import { AnyAction, CombinedState, combineReducers } from "redux";
import locationsReducer, { Locations } from "./reducers/locationsReducer";
import myDietReducer, { MyDiets } from "./reducers/myDietReducer";

interface ReducerState {
  locations: Locations;
  myDiets: MyDiets;
}

const rootReducer = (
  state: ReducerState | undefined,
  action: AnyAction
): CombinedState<ReducerState> => {
  const combinedReducer = combineReducers({
    locations: locationsReducer,
    myDiets: myDietReducer,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
