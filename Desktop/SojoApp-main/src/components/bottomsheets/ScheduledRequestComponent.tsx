import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reduxStore/actions";
import {SelectLocationAddress} from "../../reduxStore/LocationReducer";
import generateAvatarURL from "../../util/avatarUtil";
import {GREEN_COLOR} from "../../util/designUtil";
import {getAppointmentInfo} from "../../asyncStorage/setScheduledRequestInfo";
import { Request } from "../../models/Request";

type Props = {
     onNavigate:(index:number) => void
}
const ScheduledRequest = ({ onNavigate } :Props) => {
     const locationAddress = useSelector(SelectLocationAddress)
     const [appointmentInfo,setAppointmentInfo] = useState<Request | null>(null)
     useEffect(() => {
          getAppointmentInfo().then((res) => {
               if (res.isFound){
                    console.warn(res.appointmentInfo._id)
                    setAppointmentInfo(res.appointmentInfo as Request)
               }else {
                    setAppointmentInfo(null)
               }
          })
          .catch((err) => {
               console.log("Error getting appointment in scheduled component",err)
          })
     }, []);
     const onProceed = () => {
          onNavigate(7)
     }
     const dispatch = useDispatch()
     const back = () => {
          dispatch({
               type:Actions.GO_TO_STEP,
               payload:0
          })
     }
     const matchedHealthWorker = appointmentInfo?.potentialHealthWorkers.find((healthWorker) => healthWorker.isAssigned)
     return (
          <View style={styles.container}>
               <Text style={styles.title}>Scheduled Request</Text>
               <View style={styles.appointmentInfoView}>
                    <View style={styles.appointmentInfoViewLeft}>
                         <Text style={styles.title}>{matchedHealthWorker?.healthWorker?.fullName}</Text>
                         <Text style={styles.scheduleText}>Schedule set for {appointmentInfo?.appointmentDate}  at {appointmentInfo?.appointmentTime}</Text>
                         <Text style={styles.locationAddress}>{locationAddress}</Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={styles.appointmentInfoViewRight}>
                         <Image source={{uri:generateAvatarURL(matchedHealthWorker?.healthWorker?.fullName || "JOHN DOE")}} style={styles.image}/>
                    </View>
               </View>
               <TouchableOpacity style={styles.requestBtn} onPress={onProceed}>
                    <Text style={{ color:"white" }}>Proceed</Text>
               </TouchableOpacity>

          </View>
     );
};

const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center"
     },
     title:{
          paddingVertical:5,
          color:"black",
          fontSize:18,
          fontWeight:"600",
          lineHeight:24,

     },
     cancelBtn: {
          backgroundColor: "#D9D9D9",
          padding:10,
          borderRadius: 10,
          height: 40,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
     },
     cancelTxt: {
          fontSize: 15,
          // color: "red",
     },
     appointmentInfoView:{
          width:"100%",
          height:"45%",
          padding:25,
          flexDirection:"row"
     },
     appointmentInfoViewLeft:{
          width:"70%",
          alignItems:"flex-start",
          justifyContent:"center",
     },
     appointmentInfoViewRight:{
          width:"30%",
          alignItems:"center",
          justifyContent:"center",

     },
     locationAddress:{
          fontWeight:"400",
          lineHeight:16,
          fontSize:12,
     },
     scheduleText:{
          fontSize:12,
          fontWeight:"500",
          lineHeight:16,
          color:"black"
     },
     image:{
          height: 48,
          width: 48,
          borderRadius: 24,
          marginVertical: 10
     },
     requestBtn:{
          backgroundColor: GREEN_COLOR,
          justifyContent: "center",
          alignItems: "center",
          height: 42,
          marginTop: 30,
          width: 297,
          borderRadius: 6,
     },
     verticalLine: {
          height: '100%',
          width: 4,
          backgroundColor: GREEN_COLOR,
          marginVertical:5
     },


})
export default ScheduledRequest;
