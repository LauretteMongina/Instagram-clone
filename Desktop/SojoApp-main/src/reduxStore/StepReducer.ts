import {Actions} from "./actions";
import UserReducer from "./UserReducer";

const StepReducer = (state = {step: 0}, action:any) => {
     switch (action.type) {
          case Actions.NEXT_STEP:
               return {
                    step: state.step + 1,
               }
          case Actions.PREVIOUS_STEP:
               return {
                    step: state.step !==0 ?  state.step - 1 : state.step,
               }
          case Actions.GO_TO_STEP:
               return {
                    step:action.payload,
               }

          default:
               return state
     }

}

export const SelectStep = state => state.step.step
export default StepReducer;
