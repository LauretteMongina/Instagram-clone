import React, {useEffect} from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useNavigation} from "@react-navigation/native";
import {socket} from "../../util/BaseURL";
import webSocketConstants from "../../util/webSocketConstants";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../reduxStore/UserReducer";
import messaging from "@react-native-firebase/messaging";
import {Actions} from "../../reduxStore/actions";
import showToast from "../../util/showToast";
import * as Progress from 'react-native-progress';
import { GREEN_COLOR } from "../../util/designUtil";



type Props = {
     onProceed:() => void,
     onCancel:(index:number) => void,
}

export default function RequestingProfessionalComponent({ onProceed,onCancel }: Props) {
     const user = useSelector(SelectUser)
     const navigation =useNavigation()
     const dispatch = useDispatch()
     const [location, setLocation]: any = React.useState(null);
     const [loading, setLoading] = React.useState<boolean>(true);

     const cancelSearchingProfessional = () => {
          socket.emit(webSocketConstants.CANCEL_SEARCHING_HEALTH_CARE_WORKERS,{ user,latitude:null,longitude:null })
          onCancel(0)
     }
     return (
          <View style={{ flex:1 }}>
               <View style={styles.container}>
                    <Text style={styles.req}> Requesting... </Text>
                    <View>
                         <TouchableOpacity
                              style={styles.cancelBtn}
                              onPress={cancelSearchingProfessional}
                         >
                              <Text style={styles.cancelTxt}> Cancel </Text>
                         </TouchableOpacity>
                    </View>
               </View>
               <View style={{marginTop: 22, width: 342, height: 4, alignItems: "center", marginLeft: 10}}>
               <Progress.Bar
                         color={GREEN_COLOR}
                         width={340}
                         height={3}
                         useNativeDriver={true}
                         borderRadius={5}
                         indeterminate={true}
                         style={{ width: 342, height: 4}}
                    />
               </View>
               <View style={styles.div2}>
                    <Text style={styles.progressTxt}>
                         Wait while we connect you to the nearby HC....
                    </Text>
               </View>
               <View style={styles.div3container}>
                    <View style={styles.div3}>
                         <Text style={styles.heading}> HC Professional </Text>
                         <Text style={styles.heading}>{user.fullName}</Text>
                         <Text>{location}</Text>
                    </View>
               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          paddingTop: 30,
          padding: 20,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
     },
     req: {
          fontSize: 20,
          fontWeight: "600",
          color:'black'

     },
     cancelBtn: {
          backgroundColor: "#D9D9D9",
          padding:10,
          borderRadius: 12,
          height: 35,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
     },
     cancelTxt: {
          fontSize: 15,
          // color: "red",
          color:'black'
     },
     progressBar: {
          height: 15,
          backgroundColor: "whitesmoke",
          borderRadius: 20,
     },
     progress: {
          backgroundColor: "green",
          height: 10,
          borderRadius: 10,
          width: "70%",
     },
     div2: {
          padding: 10,
          borderColor: '#EDEDED',
          marginTop: 24,
        
     },
     progressTxt: {
          paddingTop: 20,
          fontSize: 14,
          left: 17,
          color:'black',
          
     },
     div3: {
          height: 106,
          width: 343,
          backgroundColor: "whitesmoke",
          borderRadius: 10,
          borderWidth: 0.2,
          padding:5,
          justifyContent: "center",
          width: 343,
          height: 67,
     },
     div3container: {
          alignItems: "center",
          justifyContent: "center",
          color:'black',
          left: 10,
          borderColor: '#EDEDED',
          marginTop: 24,
          
          


     },
     heading: {
          fontSize: 14,
          fontWeight: "700",
          // paddingBottom: 20,
          color:'black',
          marginTop: 10
 
     },
});
