import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RadioButton} from "react-native-paper";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {Actions} from "../reduxStore/actions";
import {GOOGLE_MAPS_API_KEY, socket} from "../util/BaseURL";
import {GREEN_COLOR} from "../util/designUtil";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../reduxStore/UserReducer";
import {
     SelectCustomLatitude,
     SelectCustomLongitude,
     SelectLatitude,
     SelectLongitude
} from "../reduxStore/LocationReducer";
import webSocketConstants from "../util/webSocketConstants";
import showToast from "../util/showToast";
import {NavigationActions} from "react-navigation";
import navigate = NavigationActions.navigate;
import {useNavigation, useRoute} from "@react-navigation/native";
import Screens from "../util/Screens";
import LocationStatus from "../util/locationSettingStatus";
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const SelectLocationAppointmentScreen = () => {
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Select Location",
          })
     },[]);


     const navigation = useNavigation()
     const route = useRoute()
     const user = useSelector(SelectUser)
     const latitude = useSelector(SelectLatitude)
     const longitude = useSelector(SelectLongitude)
     const customLatitude = useSelector(SelectCustomLatitude)
     const customLongitude = useSelector(SelectCustomLongitude)
     const [locationSetting,setLocationSetting] = useState<string>(LocationStatus.MY_LOCATION)



     const dispatch = useDispatch()
     const setLocation =(latitude:number,longitude:number) => {
          dispatch({
               type:Actions.SET_LOCATION,
               payload:{
                    latitude:latitude,
                    longitude:longitude
               }
          })
     }
     const requestHealthWorker = () => {
          if (locationSetting === LocationStatus.MY_LOCATION){
               navigation.navigate(Screens.REQUEST_SCHEDULE_SCREEN,{ ...route.params,locationSetting:locationSetting })

          }else {
               if (customLatitude === 0 && customLongitude ===0){
                    showToast("Please type in a location or use your current location")
               }else {
                    navigation.navigate(Screens.REQUEST_SCHEDULE_SCREEN,{ ...route.params,locationSetting:locationSetting })
               }

          }

     }
     return (
          <View style={styles.container}>
               <View style={{alignItems: "center"}}>
                    <Text
                         style={styles.requestHeaderText}
                    >
                         Choose A Location
                    </Text>
               </View>
               <View style={styles.radioButtonGroup}>
                    <RadioButton
                         value="My Location"
                         status={ locationSetting === LocationStatus.MY_LOCATION ? "checked":"unchecked" }
                         onPress={() => setLocationSetting(LocationStatus.MY_LOCATION)}
                    />
                    <Text style={styles.label}>My Current Location</Text>

               </View>
               <View style={styles.radioButtonGroup}>
                    <RadioButton
                         value="Search A Location"
                         status={ locationSetting === LocationStatus.CUSTOM_LOCATION ? "checked":"unchecked" }
                         onPress={() => setLocationSetting(LocationStatus.CUSTOM_LOCATION) }
                    />
                    {
                         locationSetting === LocationStatus.MY_LOCATION ? (
                              <Text style={styles.label}>Pick A Location </Text>
                         ):(
                              <GooglePlacesAutocomplete
                              textInputProps={{
                                   placeholderTextColor: 'black',
                                   returnKeyType: "search",
                                   color: 'black',
                                   fontSize: 16,
                                                           
                                 }}
                                 
                                   placeholder='Search Location'
                                   fetchDetails={true}
                                   listUnderlayColor ="#000000"	
                                   onPress={(data, details) => {
                                        console.warn({
                                             latitude:details?.geometry.location.lat,
                                             longitude:details?.geometry.location.lng
                                        })
                                        dispatch({
                                             type:Actions.SET_CUSTOM_LOCATION,
                                             payload:{
                                                  latitude:details?.geometry.location.lat,
                                                  longitude:details?.geometry.location.lng
                                             }
                                        })
                                   }}
                                   styles={{
                                        textInputContainer:{
                                             borderColor:"grey",
                                             borderRadius:10,
                                             borderWidth:1,
                                     },
                                     description: {
                                        color: '#000',
                                        fontSize: 16,
                                      },
                                      predefinedPlacesDescription: {
                                        color: '#3caf50',
                                      },
 }}
                                   query={{
                                        key: GOOGLE_MAPS_API_KEY,
                                        language: 'en',
                                   }}
                              />
                         )
                    }
               </View>
               <TouchableOpacity
                    style={styles.button}
                    onPress={requestHealthWorker}
               >
                    <Text> Request A Professional </Text>
               </TouchableOpacity>
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 10,
          alignItems:"center",
          

     },
     contentContainer: {
          flex: 1,
          alignItems: "center",
          
     },
     radioButtonGroup:{
          flexDirection: 'row',
          justifyContent:'flex-start',
          alignItems:"center",
          marginTop:20,
          marginRight: 10,
          marginLeft: 10,
          width:"100%",

     },
     label:{
          fontSize:17,
          fontWeight:'bold',
          alignItems:"center",
          justifyContent:"center",
          color: "#000000",

     },
     requestHeaderText:{
          fontSize: 20,
          fontWeight: "600",
          justifyContent: "center",
          alignItems: "center",
          color:"black",
     },
     button: {
          backgroundColor: GREEN_COLOR,
          justifyContent: "center",
          alignItems: "center",
          marginTop:430,
          height: 42,
          width: 297,
          borderRadius: 6,
     },
})
export default SelectLocationAppointmentScreen;
