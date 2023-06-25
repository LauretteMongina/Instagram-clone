import {Actions} from "./actions";


const UserReducer = (state = {user: null}, action:any) => {
     switch (action.type) {
          case Actions.LOGIN_USER:
               return {
                    user: action.payload,
               }
          case Actions.LOGOUT_USER:
               return {

                    user: null,
               }

          default:
               return state
     }

}
export const SelectUser = state => state.user.user
export default UserReducer;
