import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../util/Screens";

export default function MyData() {
     const navigation = useNavigation()
     return (
          <View>
               <View
                    style={{
                         paddingTop: 30,
                         margin: 10,
                         justifyContent: "space-between",
                         flexDirection: "row",
                    }}
               >
                    <TouchableOpacity
                         onPress={() => navigation.openDrawer()}
                         style={{left: 10}}
                    >
                         <AntDesign name="arrowleft" size={26} color="black"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}>My Requests</Text>
                    <Image
                         source={require("../../assets/search.png")}
                         style={{height: 20}}
                    />
               </View>
               <TouchableOpacity
                    style={{paddingLeft: 20, paddingTop: 20}}
                    onPress={() => navigation.navigate(Screens.DATA_VIEW_SCREEN)}
               >
                    <Text style={{fontSize: 16}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10}}>Munene Phineus</Text>
                    <View
                         style={{
                              width: "96%",
                              height: 2,
                              backgroundColor: "grey",
                              marginTop: 20,
                         }}
                    ></View>
               </TouchableOpacity>
               <TouchableOpacity style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontSize: 16}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10}}>Munene Phineus</Text>
                    <View
                         style={{
                              width: "96%",
                              height: 2,
                              backgroundColor: "grey",
                              marginTop: 20,
                         }}
                    ></View>
               </TouchableOpacity>
               <TouchableOpacity style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontSize: 16}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10}}>Munene Phineus</Text>
                    <View
                         style={{
                              width: "96%",
                              height: 2,
                              backgroundColor: "grey",
                              marginTop: 20,
                         }}
                    ></View>
               </TouchableOpacity>
               <TouchableOpacity style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontSize: 16}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10}}>Munene Phineus</Text>
                    <View
                         style={{
                              width: "96%",
                              height: 2,
                              backgroundColor: "grey",
                              marginTop: 20,
                         }}
                    ></View>
               </TouchableOpacity>
               <TouchableOpacity style={{paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontSize: 16}}>Sojo visit on 30/10/2022</Text>
                    <Text style={{paddingTop: 10}}>Munene Phineus</Text>
                    <View
                         style={{
                              width: "96%",
                              height: 2,
                              backgroundColor: "grey",
                              marginTop: 20,
                         }}
                    ></View>
               </TouchableOpacity>
          </View>
     );
}
