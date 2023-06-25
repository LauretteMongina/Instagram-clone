import {AntDesign} from "react-native-vector-icons";
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../util/Screens";

const DataView = () => {
     const navigation = useNavigation()
     return (
          <View>
               <View style={{paddingTop: 32, paddingLeft: 20}}>
                    <TouchableOpacity onPress={() => navigation.navigate(Screens.MY_DATA_SCREEN)}>
                         <AntDesign name="arrowleft" size={26} color="black"/>
                    </TouchableOpacity>
               </View>
               <View style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontSize: 18}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10, fontSize: 15}}>Munene Pheneas</Text>

                    <View
                         style={{
                              marginTop: 20,
                              marginRight: 30,
                              height: 60,
                              borderColor: "black",
                              borderWidth: 0.6,
                              width: "95%",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              borderRadius: 10,
                         }}
                    >
                         <Text style={{paddingLeft: 10}}>Blood Pressure</Text>
                         <Text style={{paddingRight: 10}}>120/60hhmg</Text>
                    </View>
                    <View
                         style={{
                              marginTop: 20,
                              marginRight: 30,
                              height: 60,
                              borderColor: "black",
                              borderWidth: 0.6,
                              width: "95%",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              borderRadius: 10,
                         }}
                    >
                         <Text style={{paddingLeft: 10}}>Temperaturee</Text>
                         <Text style={{paddingRight: 10}}>39C</Text>
                    </View>
                    <View
                         style={{
                              marginTop: 20,
                              marginRight: 30,
                              height: 60,
                              borderColor: "black",
                              borderWidth: 0.6,
                              width: "95%",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              borderRadius: 10,
                         }}
                    >
                         <Text style={{paddingLeft: 10}}>Heart rate</Text>
                         <Text style={{paddingRight: 10}}>68bpm</Text>
                    </View>
               </View>
               <View style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text>Symptoms</Text>
               </View>
               <View
                    style={{
                         height: 2,
                         width: "90%",
                         marginTop: 20,
                         marginLeft: 20,
                         backgroundColor: "grey",
                         borderWidth: 0.2,
                    }}
               ></View>
               <Text style={{marginTop: 20, marginLeft: 20}}>Headache</Text>
               <View
                    style={{
                         height: 2,
                         width: "90%",
                         marginTop: 20,
                         marginLeft: 20,
                         backgroundColor: "grey",
                         borderWidth: 0.2,
                    }}
               ></View>
               <Text style={{marginTop: 20, marginLeft: 20}}>Arm Strains</Text>
               <View
                    style={{
                         height: 2,
                         width: "90%",
                         marginTop: 20,
                         marginLeft: 20,
                         backgroundColor: "grey",
                         borderWidth: 0.2,
                    }}
               ></View>
               <Text style={{marginTop: 20, marginLeft: 20}}>Arm Strains</Text>
               <View
                    style={{
                         height: 2,
                         width: "90%",
                         marginTop: 20,
                         marginLeft: 20,
                         backgroundColor: "grey",
                         borderWidth: 0.2,
                    }}
               ></View>
          </View>
     );
};
export default DataView;
