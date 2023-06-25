import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import BASE_URL from "../util/BaseURL";
import showToast from "../util/showToast";
import { Request } from "../models/Request";
import { black, green500 } from 'react-native-paper/lib/typescript/styles/colors';


const SingleVisitScreen = ({ route }) => {
     const navigation = useNavigation()
     const [request,setRequest] = useState<Request | null>(null)
     const [isLoading,setIsLoading] = useState(true)
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Sojo Visit",

          })

     },[]);
     const { requestId } = route.params
     const matchedWorker = request?.potentialHealthWorkers.find((worker) => worker.isAssigned)

     async function getRequestById () {
          try {
               const response = await fetch(`${BASE_URL}/request/user/single/${requestId}`)

               const res = await response.json()
               if (res.success){
                    console.log(res.request)
                    setRequest(res.request)
                    setIsLoading(false)
               }else {
                    showToast("No request found")
               }
          }catch (e){
               console.warn(e)
          }
     }

     useEffect(() => {
          getRequestById().then(() => {

          })
          .catch((err) => {

          })
     }, []);



     return (
          <ScrollView>
               <View style={styles.container}>
                    {
                         isLoading ? (
                              <View style={{ flex:1 }}>
                                   <ActivityIndicator style={styles.loading} animating={isLoading} color="green" size="large"/>
                              </View>
                         ):(
                              <View style={styles.innerContainer}>
                                   <View style={styles.headerCard}>
                                        {
                                             request !== null &&(
                                                  <Text style={styles.header}>{ "Sojo Visit on " + new Date(request?.createdAt).getDate()}/{new Date(request.createdAt).getUTCMonth() + 1}/{new Date(request.createdAt).getFullYear()}
                                                       {" at " + new Date(request?.createdAt).getHours()}:{new Date(request?.createdAt).getMinutes()}</Text>
                                             )
                                        }
                                        <Text style={styles.doctorName}>{matchedWorker?.healthWorker.fullName}</Text>
                                   </View>

                                   <View style={styles.rectContainer}>
                                        <Text style={styles.symptomTitle}> Blood Pressure </Text>
                                        <Text>{request?.examination?.bloodPressure}</Text>
                                   </View>
                                   <View style={styles.rectContainer}>
                                        <Text style={styles.symptomTitle}> Temperature </Text>
                                        <Text>{request?.examination?.temperature}</Text>
                                   </View>
                                   <View style={styles.rectContainer}>
                                        <Text style={styles.symptomTitle}> Heart Rate </Text>
                                        <Text>{request?.examination?.heartRate}</Text>
                                   </View>
                                  

                                   <Text style={styles.title}> Symptoms </Text>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Are you active In Sports ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.activeInSports}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Is Your Diet Balanced ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.isDietBalanced}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Are you on any medication ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.currentMedication}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Your Activities </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.activities.join(",")}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Have you exercised in the last 7 days ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.exerciseInTheLast7days}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> What food/beverages don't you eat? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.dietaryExclusions}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> What food/beverages do you eat? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.dietaryInclusions.join(",")}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> When was your last visit to a Nutritionist ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.lastVisitToANutritionist}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> What's your main mode of transport ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.mainModeOfTransport}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> When did you start experiencing these symptoms ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.startOfTheSymptoms}</Text>
                                   </View>
                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> Your Symptoms </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.patientSymptomInclusions.join(",")}</Text>
                                   </View>

                                   <View style={styles.examinationInfoCard}>
                                        <Text style={styles.examinationInfoTitle}> What's your current Job ? </Text>
                                        <Text style={styles.examinationInfoDetails}>{request?.examination?.patientJob}</Text>
                                   </View>


                              </View>
                         )
                    }

 
               </View>
          </ScrollView>

     );
};
const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center",
          justifyContent:"center",

     },
     innerContainer:{
          flex:1,
          width:"100%",
          padding:10,
     },
     loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     },
     rectContainer: {
          borderRadius: 8,
          padding: 5,
          flexDirection: "row",
          alignItems:"center",
          justifyContent: "space-around",
          height: 50,
          borderColor:"#D9D9D9",
          borderWidth:1,
          marginBottom: 16,
     },
     symptomTitle:{
          fontSize:16,
          color:"#000000B2"
     },
     title:{
         fontSize:18,
         fontWeight:"bold",
         color:"#000000",
         marginTop: 62,
         marginBottom: 23

     },
     header:{
          fontSize:17,
          fontWeight:"bold",
          color:"#000000"


          
     },
     doctorName:{
          fontSize:15,
          color:"#000000"

          
     },
     headerCard:{
          paddingVertical:10,
          color:"#000000"


     },
     examinationInfoCard:{
          borderBottomColor:"black",
          borderBottomWidth:1,
          padding:10,
          color:"#000000"



     },
     examinationInfoTitle:{
          fontSize:17,
          fontWeight:"bold",
          color:"#000000"


     },
     examinationInfoDetails:{
          fontSize:15,
          color:"#00000080"

     }
})
export default SingleVisitScreen;
