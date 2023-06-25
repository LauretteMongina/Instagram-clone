import React from "react";
import {StyleSheet, Text, View, Image } from "react-native";
import {useNavigation} from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import Screens from "../../util/Screens";


export default function Support() {
     const navigation = useNavigation()
     return (
          <View >
  <Image
                         source={require("../../assets/Capture.jpg")}
                         style={{width: 482, height: 400}}
                    />
          <View >
                    <TouchableOpacity style={styles.faqBody}>
                    <Ionicons name="square-outline" size={ 39} color="#00CC9B" style={{alignSelf:'center', }} />

                         <AntDesign name="questioncircle" size={24} color="#00CC9B" style={{alignSelf:'center', left: -33}}/>
                         <View>
<Text style={styles.supportText}>FAQs</Text>
<Text style={styles.miniText}>Find Intelligent answers instantly</Text>
</View>


                    </TouchableOpacity>
                    <TouchableOpacity style={styles.faqBody}>
                    <Ionicons name="square-outline" size={ 39} color="#00CC9B" style={{alignSelf:'center', }} />
                    <Entypo name="mail-with-circle" size={24} color="#00CC9B" style={{ bottom:-18, left: - 33}}/>
<View>
<Text style={styles.supportText}>Mail</Text>
<Text style={styles.miniText}>Get answers beamed to your email.</Text>
</View>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.faqBody}>
                    <Ionicons name="square-outline" size={ 39} color="#00CC9B" style={{alignSelf:'center', }} />
                    <Ionicons name="chatbox" size={ 24} color="#00CC9B" style={{alignSelf:'center', left: -33 }} />


                         <View>
<Text style={styles.supportText}>Chat</Text>
<Text style={styles.miniText}>Start a conversation now!</Text>
</View>

                    </TouchableOpacity>
 </View>
</View>     
);
        
}

const styles = StyleSheet.create({
     faqBody:{
borderRadius: 18,
borderWidth: 1,
borderColor: "#00000014",
margin: 10, 
// width: 392,
height: 62,
marginLeft: 11,
marginRight:12,
flexDirection: 'row'

     },
     miniText:{
          color:'#00000080',
          fontSize:12,
          fontWeight:'400',
          marginTop: 1
     

          
     },

     supportText:{
          fontSize: 14,
          fontWeight:'500',
          color:"#000000CC",
          alignItems: 'center',
          lineHeight:21,


     }
})

