import {AntDesign} from "react-native-vector-icons";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Image, StyleSheet, Text, View,TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Screens from "../util/Screens";
import {getMatchedHealthWorker, unsetMatchedHealthWorker} from "../asyncStorage/setMatchedHealthWorker";
import {unsetDistanceInfo} from "../asyncStorage/setDistanceInfo";
import HealthWorker from "../models/HealthWorker";
import {useDispatch} from "react-redux";
import {Actions} from "../reduxStore/actions";


export default function RatingAndReviewsScreen() {
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
               dispatch({
                    type:Actions.GO_TO_STEP,
                    payload:0,
               })
               navigation.navigate(Screens.DASHBOARD_SCREEN)

          }catch (e){
               console.log(e)

          }

     }
     return (
          <View style={styles.container}>
               <View style={styles.reviewBody}>
                    <View style={styles.body}>
                         <Text style={styles.texts}>How was {matchedHealthWorker?.fullName}</Text>
                         <Text style={styles.text2}>
                              Leave a review to help us serve you better
                         </Text>
                         <View style={styles.ratings}>
                              <Image source={require("../assets/star.png")}/>
                              <Image source={require("../assets/star.png")}/>
                              <Image source={require("../assets/star.png")}/>
                              <Image source={require("../assets/star.png")}/>
                              <Image source={require("../assets/star.png")}/>

                         </View>
                    </View>
                    <TouchableOpacity
                         style={styles.submitBtn}
                         disabled={false}
                         onPress={submitReview}
                    >
                         <Text>Submit</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
}
const styles = StyleSheet.create({
     container: {
          flex:1,
          alignItems:"center",
          justifyContent:"center"
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
     },
     ratings: {
          height: 139,
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
});
