import AsyncStorage from "@react-native-async-storage/async-storage";
import { Request } from "../models/Request";


const KEY :string = "latestAppointment"
async function setAppointmentInfo(appointmentInfo:Request){
     try {
          await AsyncStorage.setItem(KEY,JSON.stringify(appointmentInfo))
          return {
               success:true
          }
     }catch (e){
          console.log("Error setting matched appointmentInfo",e)
          return {
               success:false
          }
     }

}

async function getAppointmentInfo(){
     try {
          const appointmentInfoString = await AsyncStorage.getItem(KEY);
          if (appointmentInfoString === null){
               return {
                    success:true,
                    isFound:false,
               }
          }else {
               const appointmentInfo:Request = JSON.parse(appointmentInfoString)
               if (appointmentInfo === null){
                    return {
                         success:true,
                         isFound:false,

                    }
               }else {
                    return {
                         success:true,
                         isFound:true,
                         appointmentInfo,
                    }
               }

          }

     }catch (e){
          console.log("Error getting appointmentInfo",e)
          return {
               success:false,
               appointmentInfo:null,
               isFound:false
          }
     }

}

async function unsetAppointmentInfo(){
     try {
          await AsyncStorage.removeItem(KEY)
     }catch (e){
          console.log("Error unsetting matched DISTANCE INFO")
          return {
               success:false
          }
     }

}
export {
     setAppointmentInfo,
     unsetAppointmentInfo,
     getAppointmentInfo,
}
