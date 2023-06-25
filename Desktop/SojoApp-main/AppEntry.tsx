import React, {useEffect, useLayoutEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Geolocation from "@react-native-community/geolocation";
import DashBoardScreen from "./src/screens/DashBoardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Screens from "./src/util/Screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./src/reduxStore/actions";
import User from "./src/models/User";
import {useNavigation} from "@react-navigation/native";
import {SelectUser} from "./src/reduxStore/UserReducer";
import PaymentScreen from "./src/screens/PaymentScreen";
import RatingAndReviewsScreen from "./src/screens/RatingAndReviewsScreen";
import SingleVisitScreen from "./src/screens/SingleVisitScreen";
import SelectDateAndTimeScreen from "./src/screens/SelectDateAndTimeScreen";
import SelectSchedulingCategoryScreen from "./src/screens/SelectSchedulingCategoryScreen";
import RequestSchedulingScreen from "./src/screens/RequestSchedulingScreen";
import AcceptedAppointmentScreen from "./src/screens/AcceptedAppointmentScreen";
import SelectLocationAppointmentScreen from "./src/screens/SelectLocationAppointmentScreen";

const Stack = createNativeStackNavigator();

const AppEntry: React.FC = () => {
     const user = useSelector(SelectUser)
     const navigation = useNavigation()
     const dispatch = useDispatch()
     useLayoutEffect(() => {
          AsyncStorage.getItem('user', (err, data) => {
               if (err) {
                    console.log("Async storage error", err)
               } else {
                    if (typeof data === "string") {
                         const user: User = JSON.parse(data)

                         dispatch({
                              type: Actions.LOGIN_USER,
                              payload: user
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
                              },
                              (error) => {
                              },
                         )
                    } else {
                         console.log("No logged in user")
                    }
               }
          })
          return () => {

          };
     }, []);
     return (
          <Stack.Navigator>
               {
                    user === null ? (
                         <>
                              <Stack.Screen
                                   name={Screens.LOGIN_SCREEN}
                                   component={LoginScreen}
                                   options={{headerShown: false}}
                              />
                              <Stack.Screen
                                   name={Screens.SIGN_UP_SCREEN}
                                   component={SignUpScreen}
                                   options={{headerShown: false}}
                              />
                         </>
                    ):(
                         <>
                              <Stack.Screen
                                   name={Screens.DASHBOARD_SCREEN}
                                   component={DashBoardScreen}
                                   options={{headerShown: false}}
                              />
                              <Stack.Screen
                                   name={Screens.PAYMENT_SCREEN}
                                   component={PaymentScreen}

                              />
                              <Stack.Screen
                                   name={Screens.RATING_AND_REVIEWS_SCREEN}
                                   component={RatingAndReviewsScreen}

                              />
                              <Stack.Screen
                                   name={Screens.SINGLE_VISIT_SCREEN}
                                   component={SingleVisitScreen}

                              />
                              <Stack.Screen
                                   name={Screens.SELECT_DATE_AND_TIME_SCREEN}
                                   component={SelectDateAndTimeScreen}

                              />
                              <Stack.Screen
                                   name={Screens.SELECT_SCHEDULING_CATEGORY_SCREEN}
                                   component={SelectSchedulingCategoryScreen}

                              />
                              <Stack.Screen
                                   name={Screens.REQUEST_SCHEDULE_SCREEN}
                                   component={RequestSchedulingScreen}

                              />
                              <Stack.Screen
                                   name={Screens.ACCEPTED_APPOINTMENT_SCREEN}
                                   component={AcceptedAppointmentScreen}

                              />
                              <Stack.Screen
                                   name={Screens.SELECT_LOCATION_APPOINTMENT_SCREEN}
                                   component={SelectLocationAppointmentScreen}

                              />
                         </>
                    )
               }


          </Stack.Navigator>
     );
};

export default AppEntry;
