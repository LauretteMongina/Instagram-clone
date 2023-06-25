import {Alert, Image, ScrollView, StyleSheet, Text, View,Linking} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import generateAvatarURL from "../../util/avatarUtil";
import showToast from "../../util/showToast";
import {socket} from "../../util/BaseURL";
import webSocketConstants from "../../util/webSocketConstants";
import {SelectUser} from "../../reduxStore/UserReducer";
import HealthWorker from "../../models/HealthWorker";
import DistanceInfo from "../../models/DistanceInfo";
import {getMatchedHealthWorker, unsetMatchedHealthWorker} from "../../asyncStorage/setMatchedHealthWorker";
import {getDistanceInfo} from "../../asyncStorage/setDistanceInfo";
import * as Progress from 'react-native-progress';
import messaging from "@react-native-firebase/messaging";
import messageTypes from "../../util/messageTypes";


type Props = {
     onProceed:() => void,
     onCancel:(index:number) => void,

}

export default function ConnectedToProfessional({ onProceed,onCancel }: Props) {
     const statusTypes = {
          PENDING:"PENDING",
          APPROVED:"APPROVED",
          REJECTED:"REJECTED"
     }
     const dispatch = useDispatch()
     const user = useSelector(SelectUser)
     const [healthWorker,setHealthWorker] = useState<HealthWorker | null>(null)
     const [distanceInfo,setDistanceInfo] = useState<DistanceInfo | null>(null)
     const [approvalStatus,setApprovalStatus] = useState<string>(statusTypes.PENDING)

     useEffect(() => {
          messaging().onMessage(async (remoteMessage) => {
               const messageType = remoteMessage.data.messageType
               if (messageType === messageTypes.HEALTH_WORKER_APPROVE_LIVE_REQUEST_MATCHING){
                    setApprovalStatus(statusTypes.APPROVED)
               }else if (messageType === messageTypes.HEALTH_WORKER_REJECT_LIVE_REQUEST_MATCHING){
                    setApprovalStatus(statusTypes.REJECTED)
                    Alert.alert(
                         "Your request was cancelled",
                         "Sorry the health worker was not able to attend to your request",
                         [
                              {
                                   text: "Ok",
                                   style:"cancel",
                              }
                         ]
                    );
               }

          })
     }, []);

     useEffect(() => {
          messaging().onNotificationOpenedApp(async (remoteMessage) => {
               const messageType = remoteMessage.data.messageType
               if (messageType === messageTypes.HEALTH_WORKER_APPROVE_LIVE_REQUEST_MATCHING){
                    setApprovalStatus(statusTypes.APPROVED)
               }else if (messageType === messageTypes.HEALTH_WORKER_REJECT_LIVE_REQUEST_MATCHING){
                    setApprovalStatus(statusTypes.REJECTED)
                    Alert.alert(
                         "Your request was cancelled",
                         "Sorry the health worker was not able to attend to your request",
                         [
                              {
                                   text: "Ok",
                                   style:"cancel",
                              }
                         ]
                    );
               }

          })
     }, []);




     useEffect(() => {
          getMatchedHealthWorker().then((result) => {
               if (result.isFound){
                    setHealthWorker(result.healthWorker)
               }
          })
          .catch((err) => {
               console.log("Error getting health worker info",err)
          })
          getDistanceInfo().then((result) => {
               if (result.isFound){
                    setDistanceInfo(result.distanceInfo)
               }
          })
          .catch((err) => {
               console.log("Error getting distance Info",err)
          })
          return () => {
               setHealthWorker(null)


          };
     }, []);



     const callProfessional = async () => {
          try {
               await Linking.openURL(`tel:${healthWorker?.phoneNumber}`)
          }catch (e){
               console.log(e)
               showToast("Could not call")
          }

     }

     const cancelMeeting = async () => {
          socket.emit(webSocketConstants.PATIENT_CANCEL_MATCHING,{ user,doctor:healthWorker })
          onCancel(0)
          await unsetMatchedHealthWorker()


     }
     return (
          <View style={styles.page}>
               <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.connection}>
                         {
                              healthWorker !== null && (
                                   <>
                                        <Text style={styles.textBold1}>Connected to {healthWorker?.fullName}</Text>
                                        <View style={styles.img}>
                                             <Image
                                                  source={{
                                                       uri:generateAvatarURL(healthWorker?.fullName)
                                                  }}
                                                  style={styles.image}
                                             />
                                        </View>
                                        <Text style={styles.textBold1}>{distanceInfo?.distanceText} away</Text>
                                        {/* <Text style={styles.textBold1}>ETA :{distanceInfo?.durationText}</Text> */}
                                        <View style={styles.separator}></View>
                                        <View>
                                             {/* <Text style={styles.approvalText}>Your request has been approved</Text> */}
                                        </View>
                                        <View>
                                             <Text style ={{ color:"#000000B2", marginBottom: 27}}> Relax {healthWorker?.fullName} is on their way to your place </Text>
                                        </View>
                                        <View style={styles.lineGreen}>
                                             <View style={styles.green}></View>
                                             <View style={styles.line}></View>
                                             <View style={styles.green}></View>
                                        </View>

                                   </>
                              )
                         }
                         <View style={{ flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
                              <View style={styles.call}>
                                   <TouchableOpacity
                                        style={styles.callbtn}
                                        onPress={callProfessional}
                                   >
                                        <Text style={styles.callText}>Call {healthWorker?.fullName}</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity
                                        style={styles.callbtn}
                                        onPress={cancelMeeting}
                                   >
                                        <Text style={styles.callText}>Cancel </Text>
                                   </TouchableOpacity>
                              </View>
                              <View style={styles.separator}></View>
                              <View style={styles.addrContainer}>
                                   <Text style={{fontWeight: "500", left: 32, top: 10, color:"#000000"}}>
                                        {healthWorker?.address}
                                   </Text>
                              </View>
                         </View>

                    </View>
               </ScrollView>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {

          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal:10,
     },
     connection: {
          paddingTop: 5,
          justifyContent: "center",
          padding: 20,
          alignItems: "center",
     },
     image: {
          height: 60,
          width: 60,
          borderRadius: 30,
          borderWidth: 0.2,
          // position: "absolute",
     },
     img: {
          alignItems: "center",
          justifyContent: "center",
     },
     callbtn: {
          width: 343,
          height: 45,
          justifyContent: "center",
          alignItems:"center",
          borderRadius: 15,
          marginVertical:5,
          backgroundColor: "whitesmoke",
          borderColor: "#EDEDED",
          borderWidth: 0.5,
          top: 25,
     },
     separator: {
          height: 10,
     },
     textBold: {
          fontWeight: "700",
          fontSize: 18,
          left: 32,
     },
     textBold1: {
          fontWeight: "700",
          fontSize: 18,
          paddingBottom:5,
          color: '#000000'
     },
     addrContainer: {
          height: 71,
          width: 343,
          top: 20,
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          borderWidth: 0.9,
          borderColor:'#EDEDED'
     },
     call: {
          alignItems: "center",
     },
     callText: {
          alignItems: "center",
          justifyContent:"center",
          fontWeight: "700",
          color: "grey"
     },
     green: {
          height: 12,
          width: 15,
          backgroundColor: "#00CC9B",
     },
     lineGreen: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: 20,
     },
     line: {
          height: 4,
          width: 330,
          backgroundColor: "#EDEDED",
     },
     page: {
          padding:10
     },
     rejectionText:{
          fontWeight:"bold",
          color:"red",
          fontSize:16
     },
     approvalText:{
          fontWeight:"bold",
          color:"#000000",
          fontSize:16,
          marginBottom: 22

     }
});
