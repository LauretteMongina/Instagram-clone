import React, {useLayoutEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function MyPayments() {
     const navigation = useNavigation()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"My Payments"
          })

     },[]);
     return (
          <View style={styles.container}>
               <Text>My Payments</Text>
          </View>
     );
}

const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center",
          justifyContent:"center",

     }
})
