import {Actions} from "./actions";
import HealthWorker from "../models/HealthWorker";
import DistanceInfo from "../models/DistanceInfo";


const MatchedHealthWorkerReducer = (
     state = {
          healthCareWorker:null,
          distanceInfo:null
     }, action:any) => {
     switch (action.type) {
          case Actions.SET_MATCHED_HEALTH_CARE_WORKER:
               return {
                    ...state,
                    healthCareWorker: action.payload,
               }
          case Actions.UN_SET_HEALTH_CARE_WORKER:
               return {
                    ...state,
                    healthCareWorker: null,
               }
          case Actions.SET_MATCHED_HEALTH_CARE_WORKER_DISTANCE_INFO:
               return {
                    ...state,
                    distanceInfo: action.payload,
               }
          case Actions.UN_SET_MATCHED_HEALTH_CARE_WORKER_DISTANCE_INFO:
               return {
                    ...state,
                    distanceInfo: null,
               }
          default:
               return state
     }

}
export const SelectMatchedHealthCareWorker = (state:any) => state.healthCareWorker.healthCareWorker
export const SelectMatchedHealthCareWorkerDistanceInfo = (state:any) => state.healthCareWorker.distanceInfo
export default MatchedHealthWorkerReducer
