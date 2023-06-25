import React, {useEffect, useLayoutEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import * as Progress from 'react-native-progress';
import {GREEN_COLOR} from "../util/designUtil";
import {useSelector} from "react-redux";
import {
     SelectCustomLatitude, SelectCustomLongitude,
     SelectLatitude,
     SelectLocationAddress,
     SelectLongitude
} from "../reduxStore/LocationReducer";
import {SelectUser} from "../reduxStore/UserReducer";
import {socket} from "../util/BaseURL";
import webSocketConstants from "../util/webSocketConstants";
import messaging from "@react-native-firebase/messaging";
import messageTypes from "../util/messageTypes";
import showToast from "../util/showToast";
import Screens from "../util/Screens";
import LocationStatus from "../util/locationSettingStatus";

const RequestSchedulingScreen = () => {
     const latitude = useSelector(SelectLatitude)
     const longitude = useSelector(SelectLongitude)
     const customLatitude = useSelector(SelectCustomLatitude)
     const customLongitude = useSelector(SelectCustomLongitude)
     const user = useSelector(SelectUser)
     const route = useRoute()
     const navigation = useNavigation()
     const locationAddress = useSelector(SelectLocationAddress)
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Requesting...."
          })
     },[]);
     useEffect(() => {
          if (route?.params?.locationSetting === LocationStatus.MY_LOCATION){
               socket.emit(webSocketConstants.REQUEST_APPOINTMENT_REQUEST,{
                    user,latitude,longitude,appointmentInfo:{ date:route.params.date,time:route.params.time } })
          }else {
               socket.emit(webSocketConstants.REQUEST_APPOINTMENT_REQUEST,{
                    user,
                    latitude:customLatitude,
                    longitude:customLongitude,
                    appointmentInfo:{ date:route?.params?.date,time:route?.params?.time }
               })
          }


     },[]);
     async function onMessageReceived(remoteMessage) {
          try {
               const messageType = remoteMessage.data.messageType

               if(messageType === messageTypes.HEALTH_WORKER_APPOINTMENT_NOT_FOUND){
                    Alert.alert(
                         "No Appointment could be made",
                         "All of our health workers appear to be busy.. Please try again later",
                         [
                              {
                                   text: "Ok",
                              
                                   style:"cancel",
                                   onPress:()=> {
                                        navigation.navigate(Screens.HOME_SCREEN)
                                   }
                              }
                         ]
                    );


               }
               else if (messageType===messageTypes.PATIENT_ERROR){
                    console.warn("patient error")

               }
               else if (messageType=== messageTypes.HEALTH_WORKER_APPROVE_APPOINTMENT_MATCHING){
                    const doctor = JSON.parse(remoteMessage.data.doctor as string)
                    const requestId = remoteMessage.data.requestId
                    console.warn("Request Id",requestId)
                    navigation.navigate(Screens.ACCEPTED_APPOINTMENT_SCREEN,{
                         appointmentInfo:{ date:route.params.date,time:route.params.time },
                         doctor,
                         requestId:requestId,
                    })



               }
          }catch (e){

          }
     }
     useEffect(() => {
          messaging().onMessage(onMessageReceived)
     }, []);

     useEffect(() => {
          messaging().onNotificationOpenedApp(onMessageReceived)
     }, []);

     useEffect(() => {
          messaging().setBackgroundMessageHandler(onMessageReceived)
     }, []);






     return (
          <View style={styles.container}>
               <View style={styles.headerContainer}>
                    <Text style={styles.cHeader}>Requesting....</Text>
                    <Text style={styles.description}>Searching for a slot on {route.params.date} for {route.params.time}</Text>
                    <Progress.Bar
                         color={GREEN_COLOR}
                         width={340}
                         height={3}
                         useNativeDriver={true}
                         borderRadius={5}
                         indeterminate={true}
                    />
               </View>
               <View style={styles.addrContainer}>
                    <Text style={{fontWeight: "500", left: 32, top: 10, color: "black"}}>
                         {locationAddress}
                    </Text>
               </View> 
               <View style={styles.bottomContainer}>
                    <Text style={styles.bottomContainerText}>We will notify you when your request is accepted!</Text>
               </View>

          </View>
     );
};
const styles = StyleSheet.create({
     container:{
          flex:1,
          padding:10,
          backgroundColor:"white"
     },
     headerContainer:{
          width:"100%",
          height:100,
          alignItems:"center",
          justifyContent:"flex-start"
     },
     cHeader: {
          width:"100%",
          fontSize: 18,
          lineHeight:24,
          fontWeight: "700",
          color:"black",
          textAlign:"left",

          // fontFamily: "sans-serif",
     },
     description:{
          width:"100%",
          lineHeight:19,
          fontWeight:"600",
          fontSize:14,
          marginBottom:20,
     },
     addrContainer: {
          height: 78,
          width: 340,
          top: 20,
          borderColor:"#EDEDED",
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          borderWidth: 0.9,
     },
     bottomContainer:{

          flex:1,
          justifyContent:"flex-end",
          padding:10,
          alignItems:"center",
     },
     bottomContainerText:{
          fontWeight:"400",
          color:"black",
          fontSize:14,
     }

})
export default RequestSchedulingScreen;
