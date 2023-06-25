import AntDesign from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

export default function ScheduleScreen() {
     const navigation = useNavigation()
     return (
          <>
               <View>



               </View>
          </>
     );
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: "white",
          paddingTop: 60,
     },

     back: {
          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
     },
     dateHead: {
          paddingLeft: 10,
          fontWeight: "600",
          fontSize: 20,
     },
     pickedDate: {
          backgroundColor: "#CECECE",
          borderRadius: 8,
          width: 56,
          height: 25,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
     },
     dates: {
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: 10,
     },
     selectweeks: {
          borderRadius: 8,
          width: 73,
          justifyContent: "center",
          alignItems: "center",
          height: 25,
          margin: 5,
          backgroundColor: "#F0F0F0",
     },
     weeks: {
          flexDirection: "row",
          margin: 6,
          paddingTop: 20,
          justifyContent: "space-between",
          alignItems: "center",
          // marginLeft: 10,
          padding: 10,
     },
     days: {
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#EDEDED",
          alignItems: "center",
          padding: 10,
     },
     selectDates: {
          borderRadius: 12,
          width: 59,
          backgroundColor: "#CECECE",
          height: 58,
          marginLeft: 10,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
     },
     hours: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
          paddingTop: 50,
     },
     selectHours: {
          borderRadius: 12,
          padding: 7,
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          height: 35,
          width: 72,
          flexWrap: "wrap",
     },
     scheduledTime: {
          alignItems: "center",
          paddingTop: 25,
          paddingBottom: 26,
     },
     selectTime: {
          alignItems: "center",
          backgroundColor: "#00DF59",
          width: 297,
          justifyContent: "center",
          height: 42,
          marginLeft: 35,

          borderRadius: 6,
     },
     btnProc: {
          color: "black",
          fontSize: 18,
     },
     proctn: {
          justifyContent: "center",
          marginTop: 10,
          paddingBottom: "100%",
     },
     hrtexts: {
          paddingLeft: 15,
     },
});
