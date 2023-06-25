import {Actions} from "./actions";
import UserReducer from "./UserReducer";

type State = {
     latitude:number,
     longitude:number,
     locationAddress:string,
     customLatitude:number,
     customLongitude:number,
}

const LocationReducer = (state:State = {
     latitude: 0,
     longitude:0,
     locationAddress:"",
     customLatitude:0,
     customLongitude:0,
}, action:any) => {
     switch (action.type) {
          case Actions.SET_LOCATION:
               return {
                    ...state,
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    customLatitude:action.payload.latitude,
                    customLongitude:action.payload.longitude,
               }
          case Actions.SET_ADDRESS:
               return {
                    ...state,
                    locationAddress:action.payload,
               }
          case Actions.SET_CUSTOM_LOCATION:
               return {
                    ...state,
                    customLatitude:action.payload.latitude,
                    customLongitude:action.payload.longitude,
               }
          default:
               return state
     }

}
export const SelectLatitude = (state:any) => state.location.latitude
export const SelectLongitude = (state:any) => state.location.longitude
export const SelectLocationAddress =(state:any) => state.location.locationAddress
export const SelectCustomLatitude =(state:any) => state.location.customLatitude
export const SelectCustomLongitude =(state:any) => state.location.customLongitude
export default LocationReducer;
