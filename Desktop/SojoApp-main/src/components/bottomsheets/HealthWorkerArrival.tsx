import {StyleSheet, Text, View,TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import HealthWorker from "../../models/HealthWorker";
import {getMatchedHealthWorker} from "../../asyncStorage/setMatchedHealthWorker";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../util/Screens";
import {useSelector} from "react-redux";
import {SelectLocationAddress} from "../../reduxStore/LocationReducer";

type Props = {
     onProceed:() => void,
     onCancel:(index:number) => void,

}

export default function HealthWorkerArrival({ onProceed } : Props) {
     const navigation = useNavigation()
     const locationAddress = useSelector(SelectLocationAddress)
     const [matchedHealthWorker,setMatchedHealthWorker] = useState<HealthWorker | null>(null)
     useEffect(() => {
          getMatchedHealthWorker().then((result) => {
               if (result.isFound){
                    setMatchedHealthWorker(result.healthWorker)
               }
          })
          .catch((err) => {
               console.log("Error getting health Worker",err)
          })
     }, []);


     // callbacks
     const handlePayments = () => {
          onProceed()

     }
     return (
          <View style={styles.container}>
               <View style={styles.header}>
                    <Text style={styles.title}>{matchedHealthWorker?.fullName} Has Arrived</Text>
                    <View style={styles.tips}>
                         <Text style={styles.tipsTitle}> Tips </Text>
                         <Text style={styles.tTexts}>
                              Let {matchedHealthWorker?.fullName} know how you are feeling
                         </Text>
                         <Text style={styles.tTexts}>Provide confirmation codes</Text>
                         <Text style={styles.tTexts}>Provide correct information</Text>
                         <Text style={styles.tTexts}>You deserve the best treatment</Text>
                    </View>
               </View>
               <View style={styles.secondDiv}>
                    <View>
                         <TouchableOpacity style={styles.payment} onPress={handlePayments}>
                              <Text style={{color:"#000000"}}> Make A Payment(KES 20,000) </Text>
                         </TouchableOpacity>
                    </View>
               </View>
               <View style={styles.thirdDiv}>
                    <View style={styles.Div}>
                         <Text style={{ color:"#000000"}}>{locationAddress}</Text>
                    </View>
               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          justifyContent: "center",
          padding: 10,

     },
     header: {
          borderColor: "grey",
          padding: 10,
     },
     title: {
          fontSize: 20,
          fontWeight: "bold",
     },
     tips: {
          padding: 5,
     },
     tipsTitle: {
          lineHeight: 21,
          paddingBottom: 10,
          fontSize: 16,
          fontWeight: "600",
          color:"#000000B2"
     },
     payment: {
          width: 343,
          height: 45,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderRadius: 21,
          borderColor: "#EDEDED",
          alignItems: "center",
          justifyContent: "center",
     },
     secondDiv: {
          marginVertical:10,
          alignItems: "center",
     },
     thirdDiv: {
          marginVertical:10,
          justifyContent: "center",
          alignItems: "center",
     },
     Div: {
          width: 343,
          height: 76,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          padding: 20,
          paddingTop: 10,
          borderColor: "#EDEDED",
          borderRadius: 12,
     },
     tTexts: {
          color: "#000000B2",
          fontWeight: "400",
          fontSize: 15,
          margin: 6,
     },
});
