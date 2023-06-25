import AntDesign from "react-native-vector-icons/AntDesign";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function RequestAccepted({navigation}: any) {
     return (
          <View>
               <View style={styles.container}>
                    <View style={styles.connection}>
                         <View style={{flexDirection: "row", paddingBottom: 20}}>
                              <TouchableOpacity
                                   style={{right: 120}}
                                   onPress={() => navigation.goBack()}
                              >
                                   <AntDesign name="arrowleft" size={27}/>
                              </TouchableOpacity>
                              <View style={{left: 120}}>
                                   <TouchableOpacity
                                        style={{
                                             height: 28,
                                             width: 65,
                                             backgroundColor: " #D9D9D9",

                                             borderRadius: 20,
                                             justifyContent: "center",
                                             alignItems: "center",
                                        }}
                                   >
                                        <Text style={{fontSize: 16}}>Support</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                         <Text style={styles.textBold1}>Judy Accepted your Request</Text>
                         <View style={styles.img}>
                              <Image
                                   source={require("../assets/doctorwoman.jpg")}
                                   style={styles.image}
                              />
                         </View>
                         <Text style={styles.textBold1}>6 Min away</Text>
                         <View style={styles.separator}></View>
                         <View>
                              <Text>Relax Judy is on your way</Text>
                         </View>

                         <View style={{paddingBottom: "100%", paddingTop: 40}}>
                              <View style={styles.call}>
                                   <TouchableOpacity style={styles.callbtn}>
                                        <Text style={styles.callText}>Call Judy</Text>
                                   </TouchableOpacity>
                              </View>
                              <View style={styles.separator}></View>
                              <View style={styles.addrContainer}>
                                   <View>
                                        <Text style={{left: 17, fontWeight: "200", top: 5}}>
                                             Schedule set for 14th June 2022,5PM
                                        </Text>
                                        <Text style={{left: 17, fontWeight: "200", top: 10}}>
                                             House,Town,Near Landmark
                                        </Text>
                                   </View>
                                   <View style={{right: 10, top: 10}}>
                                        <Image source={require("../assets/pen.png")}/>
                                   </View>
                              </View>
                         </View>
                    </View>
               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: "20%",
     },
     connection: {
          paddingTop: 10,
          // justifyContent: "center",
          padding: 20,
          alignItems: "center",
     },
     image: {
          height: 82,
          width: 88,
          borderRadius: 50,
          borderWidth: 0.5,
          // position: "absolute",
     },
     img: {
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
     },
     callbtn: {
          width: 343,
          height: 45,
          justifyContent: "center",
          borderRadius: 21,
          backgroundColor: "#FFFFF",
          borderColor: "#EDEDED",
          borderWidth: 0.5,
          top: 25,
     },
     separator: {
          height: 30,
     },
     textBold: {
          fontWeight: "700",
          fontSize: 18,
          left: 32,
     },
     textBold1: {
          fontWeight: "700",
          fontSize: 18,
     },
     addrContainer: {
          height: 71,
          width: 343,
          top: 20,
          borderRadius: 12,
          borderColor: "#EDEDED",
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
     },
     call: {
          alignItems: "center",
     },
     callText: {
          alignItems: "center",
          paddingLeft: "40%",
          fontWeight: "700",
     },
     green: {
          height: 12,
          width: 15,
          backgroundColor: "#05D859",
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
});
