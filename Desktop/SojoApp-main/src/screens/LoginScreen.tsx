import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {View, SafeAreaView, StyleSheet, TextInput,
     Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import User from "../models/User";
import showToast from "../util/showToast";
import BASE_URL from "../util/BaseURL";
import {Actions} from "../reduxStore/actions";
import Geolocation from "@react-native-community/geolocation";
import Screens from "../util/Screens";
import messaging from "@react-native-firebase/messaging"
import {GREEN_COLOR} from "../util/designUtil";



type RequestBody = {
     email:string,
     password:string,
     token:string
}
type Response = {
     msg:string,
     success:boolean,
     token:string,
     user:User
}

function LoginScreen() {
     const navigation = useNavigation()
     const [email, onChangeEmail] = React.useState<string>("");
     const [password, onChangePassword] = React.useState<string>("");
     const [isLoading,setIsLoading] = React.useState<boolean>(false);
     const dispatch = useDispatch()

     const loginUser = async () => {
          if (email ==="" || password === ""){
               showToast("Please fill in all the fields")
               return
          }
          try{
               setIsLoading(true)
               const token  = await messaging().getToken()
               const reqbody:RequestBody = { email, password,token }
               const response = await fetch(`${BASE_URL}/user/login`,{
                    method:"POST",
                    body:JSON.stringify(reqbody),
                    headers: {
                         'Content-Type': 'application/json'
                    },
               })
               const res:Response = await response.json()
               console.log(res)
               setIsLoading(false)
               if (res.success){
                    showToast(res.msg)
                    const user = res.user
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    dispatch({
                         type:Actions.LOGIN_USER,
                         payload:user
                    })
                    Geolocation.getCurrentPosition(
                         (position) => {
                              dispatch({
                                   type:Actions.SET_LOCATION,
                                   payload:{
                                        latitude:position.coords.latitude,
                                        longitude:position.coords.longitude
                                   }
                              })
                              navigation.navigate(Screens.DASHBOARD_SCREEN)
                         },
                         (error) => {
                              showToast(error.message)

                         },
                    )
               }else {
                    showToast(res.msg)
               }
          }catch (e:any) {
               setIsLoading(false)
               console.log(e)
               showToast(e.message)
          }
     }
     return (
          <SafeAreaView style={styles.body}>
               <ActivityIndicator style={styles.loading} animating={isLoading} color="#00AB30" size="large"/>
                    
                            
               <View style={styles.view}>
                    <Text style={styles.header}>Sojo App</Text>
                    <Text style={[styles.header]}>Welcome Back !</Text>
                    <Text style={[styles.header, styles.subHeader]}>
                         Login to continue
                    </Text>
                    <Text
                         style={{
                              color: "red",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingLeft: 25,
                         }}
                    >

                    </Text>
                    <TextInput
                         style={styles.input}
                         onChangeText={onChangeEmail}
                         value={email}
                         placeholder="Email Address"
                         keyboardType="default"
                         placeholderTextColor="#00CC9B" 
                    />
                   
                    <TextInput
                         style={styles.input}
                         onChangeText={onChangePassword}
                         value={password}
                         secureTextEntry={true}
                         placeholder="Password"
                         keyboardType="default"
                         placeholderTextColor="#00CC9B" 

                         
                    />
        
                    
                    
                    <TouchableOpacity style={styles.button} onPress={loginUser}>
                         <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                         style={[styles.button, styles.createBtn]}
                         onPress={() => {
                              setIsLoading(false);
                              navigation.navigate(Screens.SIGN_UP_SCREEN);
                         }}
                    >
                         <Text style={[styles.buttonText, styles.createBtnTxt]}>
                              Create Account
                         </Text>
                    </TouchableOpacity>
               </View>
          </SafeAreaView>
     );
}

const styles = StyleSheet.create({
     body: {
          backgroundColor: "#ffffff",
          height: "100%",
     },
     input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 12,
          borderColor: "#d5d5d5",
          color:"#000000"
     },
     view: {
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
          height: "100%",
     },
     header: {
          textAlign: "center",
          padding: 5,
          fontSize: 30,
          fontWeight: "bold",
          color:"black"
     },
     subHeader: {
          fontSize: 20,
          fontWeight: "normal",
     },
     bodyTxt: {
          textAlign: "left",
          fontSize: 14,
          marginLeft: 25,
          color: "#00AB30",
     },
     button: {

          alignItems: "center",
          backgroundColor: GREEN_COLOR,
          padding: 15,
          margin: 50,
          borderRadius: 12,
     },
     buttonText: {
          color: "#ffffff",
          fontSize: 15,
          fontWeight: "bold",
     },
     createBtnTxt: {
          color: GREEN_COLOR,
     },
     image: {
          width: 150,
          height: 150,
          alignSelf: "center",
          margin: 10,
     },
     createBtn: {
          marginTop: 0,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: GREEN_COLOR,
     },
     loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     }
});

export default LoginScreen;
