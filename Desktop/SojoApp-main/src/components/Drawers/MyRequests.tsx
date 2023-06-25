import React, {useEffect, useLayoutEffect, useState} from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {SelectUser} from "../../reduxStore/UserReducer";
import BASE_URL from "../../util/BaseURL";
import showToast from "../../util/showToast";
import { Request } from "../../models/Request"
import RequestItem from "../RequestItem";



export default function MyRequests() {
     const user = useSelector(SelectUser)
     const [requests,setRequests] = useState<Request[]>([])
     const [isLoading,setIsLoading] = useState(true)
     const navigation = useNavigation()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"My Requests"
          })

     },[]);
     useEffect(() => {
          navigation.addListener("focus",() => {
               getRequests()
          })
          return () => {
               navigation.removeListener("focus",() => {
                    getRequests()
               })
          }
     }, []);


     async function getRequests () {
          try {
               const response = await fetch(`${BASE_URL}/request/user/${user._id}`)
               const res = await response.json()
               if (res.success){
                    setRequests(res.requests)
                    setIsLoading(false)
               }else {
                    showToast("No requests found")

               }
          }catch (e){
               console.log(e)
          }
     }
     useEffect(() => {
          getRequests().then(() => {
               setIsLoading(false)
          })
          .catch((err) => {
               console.log(err)
               setIsLoading(false)
          })

     }, []);



     return (
          <View style={styles.container}>
               {
                    isLoading ? (
                         <View style={{ flex:1 }}>
                              <ActivityIndicator style={styles.loading} animating={isLoading} color="green" size="large"/>
                         </View>
                    ): requests.length !==0 ? (
                         <FlatList
                              style={styles.flatlist}
                              data={requests.reverse()}
                              keyExtractor={(item) => item._id}
                              renderItem={({ item }) => {
                                   return (<RequestItem request={item}/>)
                                   }
                              }
                         />
                    ): (
                         <View style={styles.container}>
                              <Text>No requests found</Text>

                              <TouchableOpacity onPress={getRequests}>
                                   <Text>Check Again</Text>
                              </TouchableOpacity>
                         </View>
                    )
               }

          </View>
     );
}
const styles = StyleSheet.create({
     container:{
          flex:1,
          alignItems:"center",
          justifyContent:"center",

     },
     flatlist:{
          flex:1,



     },
     loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     },
})
