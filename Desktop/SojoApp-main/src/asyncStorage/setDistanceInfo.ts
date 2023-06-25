import DistanceInfo from "../models/DistanceInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";



const KEY :string = "distanceInfo"
async function setDistanceInfo(distanceInfo:DistanceInfo){
     try {
          await AsyncStorage.setItem(KEY,JSON.stringify(distanceInfo))
          return {
               success:true
          }
     }catch (e){
          console.log("Error setting matched distanceInfo",e)
          return {
               success:false
          }
     }

}

async function getDistanceInfo(){
     try {
          const distanceInfoString = await AsyncStorage.getItem(KEY);
          if (distanceInfoString === null){
               return {
                    success:true,
                    isFound:false,
               }
          }else {
               const distanceInfo:DistanceInfo = JSON.parse(distanceInfoString)
               return {
                    success:true,
                    isFound:true,
                    distanceInfo,
               }
          }

     }catch (e){
          console.log("Error getting distanceInfo",e)
          return {
               success:false,
               patient:null,
               isFound:false
          }
     }

}

async function unsetDistanceInfo(){
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
     setDistanceInfo,
     unsetDistanceInfo,
     getDistanceInfo
}
