import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

type Props = {
     onProceed:() => void,
     onCancel:(index:number) => void,

}
const MakePaymentComponent = ({ onProceed,onCancel } : Props) => {
     return (
          <View style={styles.container}>
               <View style={styles.paycontainer}>
                    <View style={styles.payOption}>
                         <View>
                              <Text style={{color: "#000000", marginBottom: 22, size: 18}}> Make Payment </Text>
                         </View>
                         <View style={styles.mpesa}>
                              <Text style={styles.mpesaTxt}>M-PESA</Text>
                         </View>
                         <View style={styles.mpesa}>
                              <Text style={styles.mpesaTxt}> Phone </Text>
                         </View>
                    </View>
               </View>
               <View style={styles.payments}>
                    <TouchableOpacity
                         style={styles.makePay}
                         onPress={() => onProceed()}
                    >
                         <Text style={{color:"#000000"}}>Pay(KES 1000) </Text>
                    </TouchableOpacity>
               </View>
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
     paycontainer: {
          // borderWidth: 0.5,
          padding: 20,
          // paddingBottom: 10,
     },
     phoneInput: {
          // borderWidth: 0.6,
          height: 47,
          width: 344,
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
     },
     pay: {
          paddingTop: 20,
     },
     mpesa: {
          height: 47,
          width: 344,
          // borderWidth: 0.6,
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginBottom: 22
     },
     payOption: {
          paddingTop: 20,
     },
     makePay: {
          height: 47,
          width: 344,
          // borderWidth: 0.4,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#DBDADA",
     },
     mpesaTxt: {
          left: 52,
          fontSize: 14,
          fontWeight: "400",
          lineHeight: 19,
          justifyContent: "center",
          top: 10,
          color:"#000000"
     },
     payments: {
          alignItems: "center",
          paddingTop: "20%",
     },
})
export default MakePaymentComponent;
