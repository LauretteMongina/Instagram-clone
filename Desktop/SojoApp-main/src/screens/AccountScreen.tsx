import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../reduxStore/UserReducer";
import generateAvatarURL from "../util/avatarUtil";
import User from "../models/User";
import messaging from "@react-native-firebase/messaging";
import BASE_URL from "../util/BaseURL";
import {Actions} from "../reduxStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../util/showToast";

const AccountScreen = () => {
     const user: User = useSelector(SelectUser)
     const navigation = useNavigation()
     const dispatch = useDispatch()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"My Account",
          })

     },[]);
     const signOut = async () => {
          try {
               const token = await messaging().getToken()
               const response = await fetch(`${BASE_URL}/user/logout`,{
                    method:"POST",
                    body:JSON.stringify({ email:user.email,token }),
                    headers: {
                         'Content-Type': 'application/json'
                    },
               })
               const res = await response.json()
               if (res.success){
                    dispatch({
                         type:Actions.LOGOUT_USER
                    })
                    await AsyncStorage.removeItem("user")
               }else {
                    showToast("Log Out Failed")
               }
          }catch (e){
               console.log("err logout ",e)
               showToast("An unexpected error occurred trying to log out")
          }
     }

     return (
          <View style={styles.container}>
               <View style={styles.userInfo}>
                    <Image
                         source={{ uri:user.imageUrl }}
                         style={styles.image}
                    />
                    <Text style={styles.fullName}>{user.fullName}</Text>
                    <Text style={styles.fullName}>{user.phoneNumber}</Text>
                    <Text style={styles.fullName}>{user.email}</Text>
               </View>
               <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                         <Text style={styles.logoutButtonText}>Sign Out</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center",
          padding:10,
     },
     userInfo:{
          flex:1,
          alignItems:"center",
          padding:10,
     },
     bottomContainer:{
          width:"100%",
          alignItems:"center",
     },
     image:{
          height: 80,
          width: 80,
          borderRadius: 40,
          marginBottom: 10
     },
     fullName:{
          fontSize: 18,
          fontFamily: 'Roboto-Medium',
          paddingVertical:5,
          color:"#000000"

     },
     logoutButton:{
          alignItems:"center",
          justifyContent:"center",
          margin:10,
          borderRadius:15,
          width:"80%",
          height:50,
          backgroundColor:"red",

     },
     logoutButtonText:{
          color:"white",
          textAlign:"center",
          fontSize:20,
          fontWeight:"bold",
     }

})
export default AccountScreen;
