import { configureStore} from "@reduxjs/toolkit"
import UserReducer from "./UserReducer";
import LocationReducer from "./LocationReducer";
import StepReducer from "./StepReducer";
import MatchedHealthWorkerReducer from "./MatchedHealthWorkerReducer";
import {  } from "redux"
import thunk from "redux-thunk";

const middleware = [thunk]
const store = configureStore({
	reducer:{
		user: UserReducer,
		location:LocationReducer,
		step:StepReducer,
		healthCareWorker:MatchedHealthWorkerReducer
	},
})
export default store;
