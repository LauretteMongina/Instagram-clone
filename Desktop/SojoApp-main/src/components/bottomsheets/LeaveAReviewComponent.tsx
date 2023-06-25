import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View,TouchableOpacity} from "react-native";
import HealthWorker from "../../models/HealthWorker";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {getMatchedHealthWorker, unsetMatchedHealthWorker} from "../../asyncStorage/setMatchedHealthWorker";
import {unsetDistanceInfo} from "../../asyncStorage/setDistanceInfo";
import {unsetAppointmentInfo} from "../../asyncStorage/setScheduledRequestInfo";

type Props = {
     onProceed:() => void,
     onFinish:(index:number) => void,
}


const LeaveAReviewComponent = ({ onProceed,onFinish }: Props) => {
     const [matchedHealthWorker,setMatchedHealthWorker] = useState<HealthWorker | null>(null)
     const navigation = useNavigation()
     const dispatch = useDispatch()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Leave A Review"
          })
     },[]);
     useEffect(() => {
          getMatchedHealthWorker().then((res) => {
               if (res.isFound){
                    setMatchedHealthWorker(res.healthWorker)
               }else {

               }
          })
     }, []);

     const submitReview = async () => {
          try {
               await unsetMatchedHealthWorker()
               await unsetDistanceInfo()
               await unsetAppointmentInfo()
               onFinish(0)
               //navigation.navigate(Screens.DASHBOARD_SCREEN)

          }catch (e){
               console.log(e)

          }

     }
     return (
          <View style={styles.container}>
               <View style={styles.reviewBody}>
                    <View style={styles.body}>
                         <Text style={styles.texts}> How was {matchedHealthWorker?.fullName} ? </Text>
                         <Text style={styles.text2}>
                               Leave a review to help us serve you better </Text>
                         <View style={styles.ratings}>
                              <Image source={require("../../assets/star.png")}/>
                              <Image source={require("../../assets/star.png")}/>
                              <Image source={require("../../assets/star.png")}/>
                              <Image source={require("../../assets/star.png")}/>
                              <Image source={require("../../assets/star.png")}/>


                         </View>
                    </View>
                    <TouchableOpacity style={styles.reviewBtn} onPress={submitReview} >
                         <Text style={{color:"#000000"}} > Submit </Text>
                    </TouchableOpacity>

               </View>
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex:1,
          alignItems:"center",
          justifyContent:"center",
     },
     reviewBody: {
          flex:1,
          alignItems:"center",
          justifyContent:"center",
          height: "100%",
          borderRadius: 10,
     },
     body: {
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
     },
     texts: {
          fontSize: 18,
          fontWeight: "700",
          color: "#000000"
     },
     ratings: {
          height: 149,
          width: 343,
          borderWidth: 1,
          borderRadius: 12,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: 4,
          borderColor: "#EDEDED",
     },
     submitBtn: {
          height: 47,
          width: 344,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#DBDADA",
     },
     text2: {
          color: "grey",
          paddingTop: 30,
          paddingBottom: 20,
     },
     reviewBtn:{
          borderColor:'grey',
          borderWidth:1,
          width:343,
          height:45,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:15,
          borderColor: "#EDEDED"

     }
});
export default LeaveAReviewComponent;
