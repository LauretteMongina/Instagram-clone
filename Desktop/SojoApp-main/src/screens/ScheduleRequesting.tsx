import AntDesign from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function ScheduleRequesting({navigation}: any) {
     return (
          <View style={{backgroundColor: "white", paddingTop: 78}}>
               <View style={styles.container}>
                    <View>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="arrowleft" size={27} color="black"/>
                         </TouchableOpacity>
                    </View>
                    <View>
                         <TouchableOpacity
                              style={styles.cancelBtn}
                              onPress={() => navigation.navigate("accepted")}
                         >
                              <Text style={styles.cancelTxt}> Cancel </Text>
                         </TouchableOpacity>
                    </View>
               </View>
               <Text style={styles.req}>Requesting....</Text>
               <View style={styles.div2}>
                    <Text style={styles.progressTxt}>
                         Wait while we connect you to the nearby HC....
                    </Text>
               </View>
               <View style={styles.div3container}>
                    <View style={styles.div3}>
                         <Text style={styles.heading}>HC Professional</Text>
                         <Text style={{color: 'black'}}>Your address</Text>
                         <Text style={{color: 'black'}}>House,Town,Near Landmark</Text>
                    </View>
               </View>
               <View style={{paddingBottom: "100%", left: 17}}>
                    <Text style={{fontSize: 15}}>
                         We will notify you when your request is accepted
                    </Text>
               </View>
          </View>
     );
}
const styles = StyleSheet.create({
     container: {
          padding: 20,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
     },
     req: {
          fontSize: 20,
          fontWeight: "400",
          left: 17,
     },
     cancelBtn: {
          backgroundColor: "#D9D9D9",
          borderRadius: 14,
          height: 28,
          width: 65,
          alignItems: "center",
          justifyContent: "center",
     },
     cancelTxt: {
          fontSize: 14,
     },
     progressBar: {
          height: 15,
          // backgroundColor: "whitesmoke",
          borderRadius: 20,
     },

     div2: {
          padding: 10,
     },
     progressTxt: {
          paddingTop: 20,
          fontSize: 16,
          left: 11,
     },
     div3: {
          height: 106,
          width: 343,
          backgroundColor: "whitesmoke",
          borderRadius: 12,
          borderWidth: 0.2,
          // alignItems: "center",
          justifyContent: "center",
     },
     div3container: {
          alignItems: "center",
          justifyContent: "center",
          // left: 13,
          top: 40,
          paddingBottom: "55%",
     },
     heading: {
          fontSize: 14,
          fontWeight: "700",
          paddingBottom: 20,
          color: 'black'
     },
});
