import AntDesign from "react-native-vector-icons/AntDesign";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

function SelectCategory() {
     const navigation = useNavigation()
     return (
          <View style={{backgroundColor: "white"}}>
               <View style={styles.container}>
                    <View style={styles.back}>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="arrowleft" size={27} color="black"/>
                         </TouchableOpacity>
                         <Text style={styles.cHeader}>Select Category</Text>
                    </View>
               </View>
               <View>
                    <TouchableOpacity style={styles.categories}>
                         <View style={styles.cbox}>
                              <View style={styles.box}></View>
                              <View>
                                   <Text style={styles.cTexts}>CHW Category</Text>
                                   <Text style={styles.cTexts}>20 min</Text>
                              </View>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </TouchableOpacity>
               </View>
               <View>
                    <TouchableOpacity style={styles.categories}>
                         <View style={styles.cbox}>
                              <View style={styles.box}></View>
                              <View>
                                   <Text style={styles.cTexts}>CHW Category</Text>
                                   <Text style={styles.cTexts}>20 min</Text>
                              </View>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </TouchableOpacity>
               </View>
               <View>
                    <TouchableOpacity style={styles.categories}>
                         <View style={styles.cbox}>
                              <View style={styles.box}></View>
                              <View>
                                   <Text style={styles.cTexts}>CHW Category</Text>
                                   <Text style={styles.cTexts}>20 min</Text>
                              </View>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </TouchableOpacity>
               </View>
               <View style={styles.address}>
                    <View style={styles.addressContainer}>
                         <View>
                              <Text style={styles.addressT}>Your address</Text>
                              <Text style={styles.texts}>House,Town,Near Landmark</Text>
                         </View>
                         <Image
                              source={require("../assets/pen.png")}
                              style={styles.pen}
                         />
                    </View>
               </View>
               <View style={styles.scheduledTime}>
                    <Text>Schedule for 14th of June 2022</Text>
                    <Text>5PM</Text>
               </View>
               <View style={styles.proctn}>
                    <TouchableOpacity
                         style={styles.selectTime}
                         onPress={() => navigation.navigate("requesting")}
                    >
                         <Text style={styles.btnProc}>Proceed</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
}
const styles = StyleSheet.create({
     container: {
          backgroundColor: "white",
          // paddingTop: 20,
          // alignItems: "center",
          paddingTop: 40,
     },
     proctn: {
          justifyContent: "center",
          paddingTop: 30,
          paddingBottom: "100%",
     },
     back: {
          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
     },
     cHeader: {
          fontSize: 20,
          fontWeight: "600",
          // fontFamily: "sans-serif",
     },
     categories: {
          flexDirection: "row",
          paddingTop: 20,
          justifyContent: "space-evenly",
     },
     box: {
          height: 36,
          width: 43,
          backgroundColor: "#D9D9D9",
          borderRadius: 8,
     },
     cbox: {
          flexDirection: "row",
          justifyContent: "space-between",
     },
     cTexts: {
          fontSize: 14,
          paddingLeft: 30,
          fontWeight: "600",
          fontStyle: "normal",
          // fontFamily: "sans-serif",
     },

     address: {
          paddingTop: "20%",
          padding: 20,
     },
     addressT: {
          fontWeight: "600",
          fontSize: 12,
          alignItems: "center",
     },
     pen: {
          alignItems: "center",
          paddingRight: 20,
     },
     addressContainer: {
          backgroundColor: "#D9D9D9",
          borderRadius: 8,
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 80,
     },
     texts: {
          fontSize: 12,
          fontWeight: "400",
     },
     button: {
          backgroundColor: "#00DF59",
          justifyContent: "center",
          alignItems: "center",
          height: 42,
          width: 297,
          borderRadius: 6,
          marginTop: 20,
     },
     request: {
          justifyContent: "center",
          alignItems: "center",
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
});

export default SelectCategory
