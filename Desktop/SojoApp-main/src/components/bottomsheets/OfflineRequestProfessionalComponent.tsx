import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {socket} from "../../util/BaseURL";
import webSocketConstants from "../../util/webSocketConstants";
import {useSelector} from "react-redux";
import {SelectUser} from "../../reduxStore/UserReducer";
import {SelectLatitude, SelectLongitude} from "../../reduxStore/LocationReducer";
import {GREEN_COLOR} from "../../util/designUtil";
import Screens from "../../util/Screens";
import {getAppointmentInfo} from "../../asyncStorage/setScheduledRequestInfo";


type Props = {
     onRequest:() => void,
     onNavigate: (index:number) => void

}
const OfflineRequestProfessionalComponent = ({ onRequest,onNavigate } : Props) => {
     const latitude = useSelector(SelectLatitude)
     const longitude = useSelector(SelectLongitude)
     const user = useSelector(SelectUser)
     const navigation = useNavigation()

     const requestProfessional = () => {
          onRequest()
     }
     const scheduleAppointment = async () => {
          const appointmentInfo = await getAppointmentInfo()
          console.warn(appointmentInfo)
          if (!appointmentInfo.isFound){
               navigation.navigate(Screens.SELECT_DATE_AND_TIME_SCREEN)
          }else {
               onNavigate(6)
          }


     }
     return (
          <View style={styles.contentContainer}>
               <View>
                    <View style={{alignItems: "center"}}>
                         <Text
                              style={styles.requestHeaderText}
                         >
                              Request a HC Professional
                         </Text>
                    </View>
                    <View>
                         <TouchableOpacity
                              // disabled={latitude !==0 && longitude !==0}
                              style={styles.requestBtn}
                              onPress={requestProfessional}

                         >
                              <Text style={{ color:"white" }}>Request Now</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.scheduleBtn}
                              onPress={scheduleAppointment}
                         >
                              <Text style={{color: "#E50F0F"}}>Schedule </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,
          paddingTop: 30,
          backgroundColor: "whitesmoke",
     },
     contentContainer: {
          flex: 1,
          alignItems: "center",
     },
     map: {
          height: Dimensions.get("window").height,
          marginTop: 10,
     },
     requestBtn:{
          backgroundColor: '#E50F0F',
          justifyContent: "center",
          alignItems: "center",
          height: 42,
          marginTop: 30,
          width: 297,
          borderRadius: 6,
     },
     scheduleBtn:{
          justifyContent: "center",
          borderWidth: 1,
          alignItems: "center",
          height: 42,
          width: 297,
          marginTop: 20,
          borderRadius: 6,
          borderColor: '#E50F0F',
     },
     requestHeaderText:{
          fontSize: 20,
          fontWeight: "600",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          color:"black",
     }
});

export default OfflineRequestProfessionalComponent;
