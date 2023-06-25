import React, {useLayoutEffect, useState} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import {monthNames} from "../util/dateUtil";
import RNDateTimePicker, {DateTimePickerEvent,DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {GREEN_COLOR} from "../util/designUtil";
import Screens from "../util/Screens";

const SelectDateAndTimeScreen = () => {
     const navigation = useNavigation()
     const [date,setDate] = useState<Date>(new Date())
     const [mode,setMode] = useState<string>("date")
     const [show,setShow] = useState<boolean>(false)
     const [fDate,setFDate] = useState("")
     const [fTime,setFTime] = useState("")
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Select Date And Time",

          })
     },[]);


     const onChange = (event,selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate)
          setShow(false)

          let tempDate = new Date(currentDate)

          setFDate(`${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`)
          setFTime(`${tempDate.getHours()}:${tempDate.getMinutes()}`)


     }
     const setShowMode = (currentMode:string) => {
          setShow(true)
          setMode(currentMode)
     }

     return (
          <View style={styles.container}>
               {
                    show &&(
                         <RNDateTimePicker
                              display="default"
                              value={date}
                              is24Hour={true}
                              mode={mode}
                              minimumDate={new Date()}
                              onChange={onChange}
                         />
                    )
               }
               <Text>Date : {fDate}</Text>
               <Text>Time : {fTime}</Text>

               <TouchableOpacity style={styles.button} onPress={() => setShowMode("date")}>
                    <Text>Open Date Picker picker</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={() => setShowMode("time")}>
                    <Text>Open Time Picker Picker</Text>
               </TouchableOpacity>

               {
                    ((fDate !== "") && (fTime !== "")) &&(
                         <TouchableOpacity
                              style={styles.selectTime}
                              onPress={() => navigation.navigate(Screens.SELECT_SCHEDULING_CATEGORY_SCREEN,{ date:fDate,time:fTime })}
                         >
                              <Text style={styles.btnProc}>Proceedd</Text>
                         </TouchableOpacity>
                    )
               }




               {/*<View style={styles.weeks}>*/}
               {/*     <ScrollView*/}
               {/*          horizontal={true}*/}
               {/*          showsHorizontalScrollIndicator={false}*/}
               {/*     >*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>This week</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>Next week</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>7th-13th</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>7th-13th</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>7th-13th</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>7th-13th</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectweeks}>*/}
               {/*               <Text>7th-13th</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*     </ScrollView>*/}
               {/*</View>*/}
               {/*<View style={styles.days}>*/}
               {/*     <ScrollView horizontal={true}>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*          <TouchableOpacity style={styles.selectDates}>*/}
               {/*               <Text>Mon </Text>*/}
               {/*               <Text>13</Text>*/}
               {/*          </TouchableOpacity>*/}
               {/*     </ScrollView>*/}
               {/*</View>*/}
               {/*<View style={styles.hours}>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*     <TouchableOpacity style={styles.selectHours}>*/}
               {/*          <Text style={styles.hrtexts}>7AM</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*</View>*/}
               {/*<View style={styles.scheduledTime}>*/}
               {/*     <Text>Schedule for 14th of June 2022</Text>*/}
               {/*     <Text>5PM</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.proctn}>*/}
               {/*     <TouchableOpacity*/}
               {/*          style={styles.selectTime}*/}
               {/*          onPress={() => navigation.navigate("selectCategory")}*/}
               {/*     >*/}
               {/*          <Text style={styles.btnProc}>Proceed</Text>*/}
               {/*     </TouchableOpacity>*/}
               {/*</View>*/}
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          backgroundColor: "white",
          flex:1,
          alignItems:"center",
          justifyContent:"center",

     },

     back: {
          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
     },
     dateHead: {
          paddingLeft: 10,
          fontWeight: "600",
          fontSize: 20,
     },
     pickedDate: {
          backgroundColor: "#CECECE",
          borderRadius: 8,
          width: 70,
          height: 25,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 3,
     },
     dates: {
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: 10,
     },
     selectweeks: {
          borderRadius: 8,
          width: 73,
          justifyContent: "center",
          alignItems: "center",
          height: 25,
          margin: 5,
          backgroundColor: "#F0F0F0",
     },
     weeks: {
          flexDirection: "row",
          margin: 6,
          paddingTop: 20,
          justifyContent: "space-between",
          alignItems: "center",
          // marginLeft: 10,
          padding: 10,
     },
     days: {
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#EDEDED",
          alignItems: "center",
          padding: 10,
     },
     selectDates: {
          borderRadius: 12,
          width: 59,
          backgroundColor: "#CECECE",
          height: 58,
          marginLeft: 10,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
     },
     hours: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
          paddingTop: 50,
     },
     selectHours: {
          borderRadius: 12,
          padding: 7,
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          height: 35,
          width: 72,
          flexWrap: "wrap",
     },
     scheduledTime: {
          alignItems: "center",
          paddingTop: 25,
          paddingBottom: 26,
     },
     selectTime: {
          marginTop:190,
          alignItems: "center",
          backgroundColor: GREEN_COLOR,
          width: 297,
          justifyContent: "center",
          height: 42,


          borderRadius: 6,
     },
     btnProc: {
          color: "black",
          fontSize: 18,
     },
     proctn: {
          justifyContent: "center",
          alignItems:'center',
          marginTop: 10,
          paddingBottom: "100%",
     },
     hrtexts: {
          paddingLeft: 15,
     },
     button:{
          width:250,
          height:40,
          borderRadius:15,
          margin:15,
          alignItems:"center",
          justifyContent:"center",
          backgroundColor:GREEN_COLOR

     }
});

export default SelectDateAndTimeScreen;
