import React, {useEffect} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SelectCategory from "./ScheduleCategory";
import ScheduleRequesting from "./ScheduleRequesting";
import RequestAccepted from "./Accepted";
import MyData from "../components/Drawers/MyData";
import MyRequests from "../components/Drawers/MyRequests";
import MyPayments from "../components/Drawers/MyPayments";
import Support from "../components/Drawers/Support";
import Share from "../components/Drawers/Share";
import DataView from "../components/Drawers/DataView";
import Screens from "../util/Screens";
import DrawerComponent from "../components/DrawerComponent";
import ScheduleScreen from "../components/bottomsheets/ScheduleScreen";
import  {socket} from "../util/BaseURL";
import webSocketConstants from "../util/webSocketConstants";
import AccountScreen from "./AccountScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DashBoardScreen: React.FC = () => {

     return (

          <Drawer.Navigator
               initialRouteName={Screens.HOME_SCREEN}
               drawerContent={(props) => <DrawerComponent {...props}/>}
          >
               <Drawer.Screen
                    name={Screens.HOME_SCREEN}
                    component={HomeScreen}
                    options={{
                         headerShown: true,
                         headerTitle:"Sojo App",
                    }}
               />
               <Drawer.Screen
                    name={Screens.SCHEDULE_SCREEN}
                    component={ScheduleScreen}
                    options={{
                         headerShown: true,
                         headerTitle:"Scheduled Appointments",
               }}
               />
               <Drawer.Screen
                    name={Screens.DATA_VIEW_SCREEN}
                    component={DataView}
                    options={{headerShown: false}}
               />

               <Drawer.Screen
                    name={Screens.SELECT_CATEGORY_SCREEN}
                    component={SelectCategory}

               />
               <Drawer.Screen
                    name={Screens.REQUESTING_SCREEN}
                    component={ScheduleRequesting}

               />
               <Drawer.Screen
                    name={Screens.ACCEPTED_SCREEN}
                    component={RequestAccepted}

               />
               <Drawer.Screen
                    name={Screens.MY_DATA_SCREEN}
                    component={MyData}

               />
               <Drawer.Screen
                    name={Screens.MY_REQUESTS_SCREEN}
                    component={MyRequests}

               />
               <Drawer.Screen
                    name={Screens.MY_PAYMENTS_SCREEN}
                    component={MyPayments}

               />
               <Drawer.Screen
                    name={Screens.SUPPORT_SCREEN}
                    component={Support}

               />
               <Drawer.Screen
                    name={Screens.SHARE_SCREEN}
                    component={Share}

               />
               <Drawer.Screen
                    name={Screens.ACCOUNT_SCREEN}
                    component={AccountScreen}

               />
          </Drawer.Navigator>

     );
}

export default DashBoardScreen
