import AsyncStorage from "@react-native-async-storage/async-storage";
import HealthWorker from "../models/HealthWorker";



const KEY :string = "matchedHealthWorker"
async function setMatchedHealthWorker(healthWorker:HealthWorker){
     try {
          await AsyncStorage.setItem(KEY,JSON.stringify(healthWorker))
          return {
               success:true
          }
     }catch (e){
          console.log("Error setting matched health worker ",e)
          return {
               success:false
          }
     }

}

async function getMatchedHealthWorker(){
     try {
          const healthWorkerString = await AsyncStorage.getItem(KEY);
          if (healthWorkerString === null){
               return {
                    success:true,
                    isFound:false,
               }
          }else {
               const healthWorker = JSON.parse(healthWorkerString)
               return {
                    success:true,
                    isFound:true,
                    healthWorker
               }
          }

     }catch (e){
          console.log("Error getting matched health worker",e)
          return {
               success:false,
               patient:null,
               isFound:false
          }
     }

}

async function unsetMatchedHealthWorker(){
     try {
          await AsyncStorage.removeItem(KEY)
     }catch (e){
          console.log("Error unsetting matched health worker")
          return {
               success:false
          }
     }

}
export {
     setMatchedHealthWorker,
     unsetMatchedHealthWorker,
     getMatchedHealthWorker
}
