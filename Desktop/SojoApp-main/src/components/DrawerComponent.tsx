import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image,StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screens from "../util/Screens";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { SelectUser } from "../reduxStore/UserReducer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import Share from 'react-native-share';
import files from "../assets/fileBase64";




const DrawerComponent:React.FC = ({ props } :any) =>  {
     
     const navigation = useNavigation()
     const user = useSelector(SelectUser)
     const dispatch = useDispatch()

     const ICON_SIZE = 25
     const myCustomshare = async() =>{
          const shareOptions = {
               message:'Hail a healthcare provider using SojoAPP from the comfort of your home. We have very professional and accredited medics.',
               url: files.sojoLogos
     
          }
          try {
               const ShareResponse = await Share.open(shareOptions);
          
               
          } catch (error) {
               console.log('Error =>', error);
     
               
          }
     
     
          };

     return (
          <View style={{ flex:1 }}>
               <DrawerContentScrollView {...props} contentContainerStyle={{}}>
                    <TouchableOpacity
                         style={styles.profileHeader}
                         onPress={() => navigation.navigate(Screens.ACCOUNT_SCREEN)}>
                         <Image source={{uri:user.imageUrl}} style={styles.image}/>
                         <View style={styles.profileInfo}>
                              <Text style={styles.username}>{user.fullName}</Text>
                              <Text style={styles.accountText}>Manage Account</Text>
                         </View>
                    </TouchableOpacity>

                    <View style={styles.container}>
                         <View>
                              <TouchableOpacity
                                   onPress={() => navigation.navigate(Screens.HOME_SCREEN)}
                                   style={styles.menu}
                              >
                                   <View style={styles.menuIcons}>
                                        <Entypo name="home" size={ICON_SIZE} color="black"/>
                                   </View>
                                   <Text style={styles.menuTxt}>Home</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                   onPress={() => navigation.navigate(Screens.MY_REQUESTS_SCREEN)}
                                   style={styles.menu}
                              >
                                   <View style={styles.menuIcons}>
                                        <Octicons name="arrow-switch" size={ICON_SIZE} color="black"/>
                                   </View>
                                   <Text style={styles.menuTxt}>My Requests</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => navigation.navigate(Screens.MY_PAYMENTS_SCREEN)}
                                   style={styles.menu}
                              >
                                   <View style={styles.menuIcons}>
                                        <AntDesign name="creditcard" size={ICON_SIZE} color="black"/>
                                   </View>
                                   <Text style={styles.menuTxt}>Payments</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                   onPress={() => navigation.navigate(Screens.SUPPORT_SCREEN)}
                                   style={styles.menu}
                              >
                                   <View style={styles.menuIcons}>
                                        <MaterialIcons name="contact-support" size={ICON_SIZE} color="black"/>
                                   </View>
                                   <Text style={styles.menuTxt}>Support</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={myCustomshare}
                                   // onPress={() => navigation.navigate(Screens.SHARE_SCREEN)}
                                   style={styles.menu}
                              >
                                   <View style={styles.menuIcons}>
                                        <FontAwesome5 name="share-square" size={ICON_SIZE} color="black"/>
                                   </View>
                                   <Text style={styles.menuTxt}>Tell a friend</Text>
                              </TouchableOpacity>

                         </View>
                    </View>
               </DrawerContentScrollView>
          </View>


     );
}
export default DrawerComponent;
const styles = StyleSheet.create({
     container: {
          paddingTop: 5,
     },
     profileHeader:{
          marginTop:25,
          paddingHorizontal:10,
          paddingVertical:5,
          flexDirection:"row",
          justifyContent:"flex-start",
          alignItems:"center",
          borderBottomColor:"#EDEDED",
          borderBottomWidth:1,


     },
     profileInfo:{
          marginLeft:10,
          alignItems:"center",
          justifyContent:"center",
          width:"70%",
     },
     username:{
          fontSize: 18,
          fontWeight:"600",
          fontFamily: 'Roboto-Medium',
          marginBottom: 5,
          width:"100%",
          textAlign:"left",
          color:"black",
     },
     accountText:{
          fontSize: 12,
          fontWeight:"400",
          fontFamily: 'Roboto-Medium',
          marginBottom: 5,
          lineHeight:16,
          width:"100%",
          textAlign:"left"
     },
     image:{
          height: 44,
          width: 44,
          borderRadius: 22,
          marginBottom: 10
     },
     profile: {
          height: 42,
          width: 42,
          backgroundColor: "#D9D9D9",
          borderRadius: 50,
          marginLeft: 10,
     },
     profileDetails: {
          flexDirection: "row",
          alignItems: "center",
     },
     profileTexts: {
          margin: 10,
     },
     userName: {
          fontSize: 19,
          // fontFamily: "sans-serif",
          fontWeight: "600",
          paddingBottom: 5,
     },
     viewProfile: {
          color: "grey",
          fontWeight: "600",
          paddingTop: 5,
     },
     icon: {
          // flexDirection: "row",
          top: "23.52%",
          left: "5.07%",
          right: "91.83%",
          position: "absolute",
          // bottom: "74.51%",
     },
     menuTxt: {
          width:"75%",
          fontSize: 18,
          textAlign:"left",
          paddingLeft:10,
          color:"black",


     },
     menuIcons:{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
     },
     menu: {
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          padding:15,
     },
});
