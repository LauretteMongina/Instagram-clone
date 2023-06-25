import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {
     View,
     Linking,
     StyleSheet,
     Image,
     Dimensions,
     TouchableOpacity,
     ActivityIndicator,
     BackHandler,
     Alert
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions"
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {
     SelectCustomLatitude,
     SelectCustomLongitude,
     SelectLatitude,
     SelectLongitude
} from "../reduxStore/LocationReducer";
import {useMultiStepNavigation} from "../hooks/useMultiStepNavigation";
import OfflineRequestProfessionalComponent from "../components/bottomsheets/OfflineRequestProfessionalComponent";
import ScheduledRequestComponent from "../components/bottomsheets/ScheduledRequestComponent";
import {Actions} from "../reduxStore/actions";
import RequestingProfessionalComponent from "../components/bottomsheets/RequestingProfessionalComponent";
import ConnectedToProfessional from "../components/bottomsheets/ConnectedToProfessional";
import UnavailableProfessionals from "../components/bottomsheets/UnavailableProfessionals";
import {GOOGLE_MAPS_API_KEY, socket} from "../util/BaseURL";
import {SelectStep} from "../reduxStore/StepReducer";
import SelectCategoryComponent from "../components/bottomsheets/SelectCategoryComponent";
import geoCoding from "../util/geoCoding";
import {SelectMatchedHealthCareWorker} from "../reduxStore/MatchedHealthWorkerReducer";
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import HealthWorker from "../models/HealthWorker";
import messageTypes from "../util/messageTypes";
import DistanceInfo from "../models/DistanceInfo";
import {setDistanceInfo} from "../asyncStorage/setDistanceInfo";
import {setMatchedHealthWorker} from "../asyncStorage/setMatchedHealthWorker";
import showToast from "../util/showToast";
import webSocketConstants from "../util/webSocketConstants";
import HealthWorkerArrival from "../components/bottomsheets/HealthWorkerArrival";
import MakePaymentComponent from "../components/bottomsheets/MakePaymentComponent";
import LeaveAReviewComponent from "../components/bottomsheets/LeaveAReviewComponent";
import {unsetAppointmentInfo} from "../asyncStorage/setScheduledRequestInfo";
import SelectLocationComponent from "../components/bottomsheets/SelectLocationComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import locationSettingStatus from "../util/locationSettingStatus";


const HomeScreen: React.FC = () => {
     const navigation = useNavigation()
     const dispatch = useDispatch()
     const currentStepIndex = useSelector(SelectStep)
     const [distanceInfoState, setDistanceInfoState] = useState<DistanceInfo | null>(null)
     const [matchedHealthWorkerState, setMatchedHealthWorkerState] = useState<HealthWorker | null>(null)
     const [isMapShown, setIsMapShown] = React.useState(false);
     const latitude = useSelector(SelectLatitude)
     const longitude = useSelector(SelectLongitude)

     const customLatitude = useSelector(SelectCustomLatitude)
     const customLongitude = useSelector(SelectCustomLongitude)

     const mapRef = useRef<MapView>(null)
     const bottomSheetRef = useRef<BottomSheet>(null);

     useEffect(() => {
          if (mapRef.current) {
               mapRef.current?.fitToCoordinates([
                    {
                         latitude: customLatitude,
                         longitude: customLongitude,
                    },

               ], {
                    edgePadding: {top: 50, right: 50, left: 50, bottom: 50}
               })
          }
     }, [customLongitude, customLatitude]);

     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle: "Sojo App",

          })
     }, []);

     const {step} = useMultiStepNavigation(
          [
               <OfflineRequestProfessionalComponent onRequest={next} onNavigate={goTo}/>,//0
               <SelectCategoryComponent onCancel={back} onProceed={next}/>,//1
               <SelectLocationComponent next={next} back={back}/>,//2
               <RequestingProfessionalComponent onProceed={next} onCancel={goTo}/>,//3
               <ConnectedToProfessional onProceed={next} onCancel={goTo}/>,//4
               <UnavailableProfessionals onCancel={goTo}/>,//5
               <ScheduledRequestComponent onNavigate={goTo}/>,//6
               <HealthWorkerArrival onProceed={next} onCancel={goTo}/>,//7
               <MakePaymentComponent onProceed={next} onCancel={goTo}/>,//8
               <LeaveAReviewComponent onProceed={next} onFinish={goTo}/>,//9

          ])
     useEffect(() => {
          socket.on(webSocketConstants.LOCATION_UPDATED, (info) => {
               const {doctorId, latitude, longitude} = info
               if (matchedHealthWorkerState !== null) {
                    if (doctorId === matchedHealthWorkerState?._id) {
                         setMatchedHealthWorkerState(prev => {
                              return {...prev, longitude, latitude}
                         })
                    }
               }

          })
     }, []);

     async function onMessageReceived(remoteMessage) {
          try {
               const messageType = remoteMessage?.data?.messageType
               console.log("Message Type", messageType)

               if (messageType === messageTypes.HEALTH_WORKER_FOUND) {
                    const doctor: HealthWorker = JSON.parse(remoteMessage?.data?.doctor as string)
                    const distanceInfo: DistanceInfo = JSON.parse(remoteMessage?.data?.distanceInfo as string)

                    if (distanceInfo.success) {
                         const {success} = await setMatchedHealthWorker(doctor)
                         const {success: isSuccess} = await setDistanceInfo(distanceInfo)
                         if (success && isSuccess) {
                              console.log("We here")
                              setDistanceInfoState(distanceInfo)
                              setMatchedHealthWorkerState(doctor)
                              setHealthWorkerCoordinates(doctor, distanceInfo)

                              goTo(4)

                         }
                    }
               } else if (messageType === messageTypes.HEALTH_WORKER_NOT_FOUND) {
                    showToast("Nobody was found")
                    goTo(5)
               } else if (messageType === messageTypes.PATIENT_REJECT_LIVE_REQUEST_MATCHING) {


               } else if (messageType === messageTypes.PATIENT_REJECT_APPOINTMENT_MATCHING) {

               } else if (messageType === messageTypes.HEALTH_WORKER_REJECT_LIVE_REQUEST_MATCHING) {
                    setDistanceInfoState(null)
                    setMatchedHealthWorkerState(null)
                    goTo(0)


               } else if (messageType === messageTypes.HEALTH_WORKER_APPROVE_LIVE_REQUEST_MATCHING) {

               } else if (messageType === messageTypes.HEALTH_WORKER_ARRIVAL) {
                    goTo(7)
               } else if (messageType === messageTypes.POTENTIAL_HEALTH_WORKERS_MESSAGE) {
                    const potentialHealthWorkers = JSON.parse(remoteMessage.data.potentialHealthWorkers)

               } else if (messageType === messageTypes.PATIENT_ERROR) {
                    console.warn("Server Error")
                    Alert.alert(
                         "Server Error",
                         "An error occurred while trying to match you with a health worker...Please try again",
                         [
                              {
                                   text: "Ok",
                                   onPress: () => {
                                        goTo(0)
                                   }
                              }
                         ]
                    );
               }

          } catch (e) {
               console.log("This error", e)
          }
     }

     useEffect(() => {
          messaging().onNotificationOpenedApp(onMessageReceived)
     }, [])

     useEffect(() => {
          messaging().onMessage(onMessageReceived)
     }, []);

     useEffect(() => {
          messaging().setBackgroundMessageHandler(onMessageReceived)
     }, []);


     useEffect(() => {
          BackHandler.addEventListener("hardwareBackPress", () => {
               if (currentStepIndex !== 0) {
                    back()
                    return false
               }
               navigation.goBack()
               return true

          });
          return () => {
               BackHandler.removeEventListener("hardwareBackPress", () => {
                    if (currentStepIndex !== 0) {
                         back()
                         return false
                    }
                    return true
               });
          }
     }, []);

     function setHealthWorkerCoordinates(doctor: HealthWorker, distanceInfo: DistanceInfo) {
          if (mapRef.current) {
               mapRef.current?.fitToCoordinates([
                    {
                         latitude: latitude,
                         longitude: longitude,
                    },
                    {
                         latitude: customLatitude,
                         longitude: customLongitude,
                    },
                    {
                         latitude: Number(doctor.latitude),
                         longitude: Number(doctor.longitude)
                    }
               ], {
                    edgePadding: {top: 50, right: 50, left: 50, bottom: 50}
               })
          }

     }

     useEffect(() => {

          Geolocation.getCurrentPosition(
               (position) => {
                    dispatch({
                         type: Actions.SET_LOCATION,
                         payload: {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude
                         }
                    })
                    geoCoding(position.coords.latitude, position.coords.longitude)
                         .then((address) => {
                              dispatch({
                                   type: Actions.SET_ADDRESS,
                                   payload: address
                              })

                         })
                         .catch((err) => {
                              console.log("Geolocation function error", err)

                         })
                    setIsMapShown(true)

               },
               (error) => {
                    console.warn("Geolocation Error >>", error.message)

               },
               {
                    enableHighAccuracy: false,
                    timeout: 10000,

               }
          )
          Geolocation.watchPosition(
               () => {

               },
               () => {

               }
          )
     }, []);
     

     // variables
     const snapPoints = useMemo(() => {
          if (currentStepIndex === 0) {
               return ["35%", "35%"]
          } else if (currentStepIndex === 1) {
               return ["60%", "80%"]
          } else if (currentStepIndex === 3) {
               return ["40%", "65%"]
          } else if (currentStepIndex === 6) {
               return ["40%", "70%"]
          } else if (currentStepIndex === 5) {
               return ["40%", "40%"]
          } else if (currentStepIndex === 2) {
               return ["50%", "70%"]
          } else {
               return ["60%", "65%"]
          }
     }, [currentStepIndex]);

     function next() {
          dispatch({
               type: Actions.NEXT_STEP,

          })
     }

     function back() {
          dispatch({
               type: Actions.PREVIOUS_STEP,
          })
     }

     function goTo(index: number) {
          dispatch({
               type: Actions.GO_TO_STEP,
               payload: index

          })
     }


     return (
          <View style={styles.container}>
               {
                    isMapShown ? (
                         <>
                              <MapView
                                   ref={mapRef}
                                   style={styles.map}
                                   region={{
                                        latitude: latitude,
                                        longitude: longitude,
                                        latitudeDelta: 0.01022,
                                        longitudeDelta: 0.01021,
                                   }}
                                   onPress={(event) => {
                                        dispatch({
                                             type: Actions.SET_CUSTOM_LOCATION,
                                             payload: {
                                                  latitude: event.nativeEvent.coordinate.latitude,
                                                  longitude: event.nativeEvent.coordinate.longitude,
                                             }
                                        })

                                   }}
                                   showsUserLocation={true}
                                   followsUserLocation={true}
                              >

                                   <Marker coordinate={{
                                        latitude: customLatitude,
                                        longitude: customLongitude,
                                   }}
                                   >
                                        <FontAwesome name="map-pin" size={30} color="blue"/>
                                   </Marker>

                                   {
                                        (currentStepIndex === 3) &&
                                        (matchedHealthWorkerState !== null) && (
                                             <>
                                                  <Marker
                                                       coordinate={{
                                                            longitude: Number(matchedHealthWorkerState?.longitude),
                                                            latitude: Number(matchedHealthWorkerState?.latitude),
                                                       }}
                                                       title="Health Care Worker Location"
                                                       identifier="doctorLocation"
                                                       onPress={(event) => {
                                                            console.warn("", currentStepIndex)

                                                       }}
                                                  />
                                                  <MapViewDirections
                                                       origin={{
                                                            latitude: latitude,
                                                            longitude: longitude
                                                       }}
                                                       destination={{
                                                            longitude: Number(matchedHealthWorkerState?.longitude),
                                                            latitude: Number(matchedHealthWorkerState?.latitude),
                                                       }}
                                                       strokeColor="green"
                                                       strokeWidth={3}
                                                       apikey={GOOGLE_MAPS_API_KEY}
                                                  />
                                             </>

                                        )
                                   }
                              </MapView>

                         </>

                    ) : (
                         <View style={styles.loaderView}>
                              <ActivityIndicator animating={true} size="large" />
                         </View>
                    )
               }
               <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}

               >
                    {step}
               </BottomSheet>
          </View>

     );
};
export default HomeScreen;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "whitesmoke",
     },
     contentContainer: {
          flex: 1,
          alignItems: "center",
     },
     map: {
          height: Dimensions.get("window").height ,
          width:Dimensions.get("window").width,
     },
     loaderView: {
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
     },
     loading: {
          position: 'absolute',
          left: Dimensions.get("window").width * 0.5,
          right: 0,
          top: Dimensions.get("window").height * 0.5,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     }
});

