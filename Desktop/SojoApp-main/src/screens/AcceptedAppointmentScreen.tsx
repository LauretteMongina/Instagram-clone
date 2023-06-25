import React, {useEffect, useLayoutEffect} from 'react';
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import showToast from "../util/showToast";
import {useSelector} from "react-redux";
import {SelectLocationAddress} from "../reduxStore/LocationReducer";
import Screens from "../util/Screens";
import BASE_URL from "../util/BaseURL";
import {setAppointmentInfo} from "../asyncStorage/setScheduledRequestInfo";

const AcceptedAppointmentScreen = () => {
     const navigation = useNavigation()
     const locationAddress = useSelector(SelectLocationAddress)
     const route = useRoute()
     const { appointmentInfo,doctor,requestId } = route.params

     useEffect(() => {
          console.warn("Request Id",requestId)
          if (requestId !== undefined || null){
               getRequestById()
                    .then((res) => {
                         showToast("Appointment saved successfully")
                    })
                    .catch((err) => {
                         console.log(err)
                         showToast("Appointment failed to be saved")
                    })
          }

     }, []);

     async function getRequestById () {
          try {
               const response = await fetch(`${BASE_URL}/request/user/single/${requestId}`)

               const res = await response.json()
               if (res.success){
                    console.log("Appointment info",res.request)
                    await setAppointmentInfo(res.request)
               }else {
                    showToast("No request found")
               }
          }catch (e){
               console.warn(e)
          }
     }

     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Accepted Appointment",

          })
     },[]);
     const callProfessional = async () => {
          try {
               await Linking.openURL(`tel:${doctor?.phoneNumber}`)
          }catch (e){
               console.log(e)
               showToast("Could not call")
          }

     }

     return (
          <View style={styles.container}>
               <Text style={styles.headerTitle}>{doctor.fullName} accepted your request</Text>
               <Image source={{uri:doctor.imageUrl}} style={styles.image}/>

               <TouchableOpacity
                    style={styles.callbtn}
                    onPress={callProfessional}
               >
                    <Text style={styles.callText}>Call {doctor.fullName}</Text>
               </TouchableOpacity>

               <View style={styles.addressContainer}>
                    <Text style={styles.scheduleText}>Schedule set for {appointmentInfo.date} at {appointmentInfo.time}</Text>
                    <Text style={styles.locationAddress}>{locationAddress}</Text>

               </View>

               <TouchableOpacity
                    style={styles.callbtn}
                    onPress={() => navigation.navigate(Screens.HOME_SCREEN)}
               >
                    <Text style={styles.callText}>Go Back Home</Text>
               </TouchableOpacity>
          </View>
     );
};
const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center",
          justifyContent:"center",
          padding:10,
          backgroundColor:"white"
     },
     headerTitle:{
          fontSize:18,
          lineHeight:24,
          fontWeight:"700",
          color:"black",

     },
     image:{
          height: 88,
          width: 88,
          borderRadius: 44,
          marginVertical: 10
     },
     callbtn: {
          width: 343,
          height: 45,
          justifyContent: "center",
          alignItems:"center",
          borderRadius: 15,
          marginVertical:5,
          backgroundColor: "white",
          borderColor: "#EDEDED",
          borderWidth: 1,
          top: 25,
     },
     callText: {
          alignItems: "center",
          justifyContent:"center",
          fontWeight: "700",
     },
     addressContainer: {
          backgroundColor: "whitesmoke",
          borderRadius: 8,
          padding: 5,
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: 70,
          width:"100%",
          marginTop:50,
          borderColor:"#EDEDED",
          borderWidth:1,

     },
     scheduleText:{
          fontSize:12,
          fontWeight:"500",
          lineHeight:16,
          color:"black"
     },
     locationAddress:{
          fontWeight:"400",
          lineHeight:16,
          fontSize:12,
     }

})
export default AcceptedAppointmentScreen;
