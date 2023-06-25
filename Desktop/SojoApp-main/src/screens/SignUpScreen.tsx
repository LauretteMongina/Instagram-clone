import * as React from "react";
import {View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {useNavigation} from "@react-navigation/native";
import showToast from "../util/showToast";
import BASE_URL from "../util/BaseURL";
import Screens from "../util/Screens";
import {GREEN_COLOR} from "../util/designUtil";


type RequestBody = {
     fullName:string,
     email:string,
     password:string,
     phoneNumber:string
}
function SignUpScreen() {
     const navigation = useNavigation()
     const [fullName, setFullName] = React.useState<string>("");
     const [email, setEmail] = React.useState<string>("");
     const [phoneNumber, setPhoneNumber] = React.useState<string>("");
     const [password, setPassword] = React.useState<string>("");
     const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");

     const [isLoading,setIsLoading] = React.useState<boolean>(false)

     const createAccount = async () =>  {
          if (passwordConfirm !== password){
               showToast("Passwords don't match")
               return
          }

          try{
               setIsLoading(true)
               const reqbody:RequestBody = { fullName,email, password,phoneNumber }
               console.log(reqbody)
               const response = await fetch(`${BASE_URL}/user/register`,{
                    method:"POST",
                    body:JSON.stringify(reqbody),
                    headers: {
                         'Content-Type': 'application/json'
                    },
               })
               const res = await response.json()
               console.log(res)
               setIsLoading(false)
               if (res.success){
                    showToast(res.msg)
                    navigation.navigate(Screens.LOGIN_SCREEN)

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
                    <Text style={[styles.header]}>Welcome !</Text>
                    <Text style={[styles.header, styles.subHeader]}>
                         Create New Account
                    </Text>
                    {/* <Image style={styles.image} source={require("../assets/home.png")} /> */}
                    <TextInput
                         style={styles.input}
                         value={fullName}
                         onChangeText={(text:string) => setFullName(text)}
                         placeholder="Enter Your Full Name"
                         placeholderTextColor="#00CC9B"
                    />
                    <TextInput
                         style={styles.input}
                         value={email}
                         onChangeText={(text) => setEmail(text)}
                         placeholder="Enter your email address"
                         placeholderTextColor="#00CC9B"
                    />
                    <TextInput
                         style={styles.input}
                         value={phoneNumber}
                         onChangeText={(text) => setPhoneNumber(text)}
                         placeholder="Enter Phone Number"
                         placeholderTextColor="#00CC9B"
                    />
                    <TextInput
                         style={styles.input}
                         onChangeText={(text:string) => setPassword(text)}
                         value={password}
                         secureTextEntry={true}
                         placeholder="Enter Your Password"
                         keyboardType="default"
                         placeholderTextColor="#00CC9B"
                    />
                    <TextInput
                         style={styles.input}
                         onChangeText={(text:string) => setPasswordConfirm(text)}
                         value={passwordConfirm}
                         secureTextEntry={true}
                         placeholder="Confirm Password"
                         keyboardType="default"
                         placeholderTextColor="#00CC9B"
                    />

                    <TouchableOpacity style={styles.button} onPress={createAccount}>
                         <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={[styles.button, styles.createBtn]}
                         onPress={() => navigation.navigate(Screens.LOGIN_SCREEN)}
                    >
                         <Text style={[styles.buttonText, styles.createBtnTxt]}>Login</Text>
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
          padding: 10,
          fontSize: 30,
          fontWeight: "bold",
          color:"#000000"
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
          margin: 30,
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
          borderColor: "#00AB30",
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

export default SignUpScreen;
