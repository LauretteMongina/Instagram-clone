import {
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View,
} from "react-native";
import {
     BottomSheetModal,
     BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {useLayoutEffect} from "react";
import Reviews from "./Review";
import {useNavigation} from "@react-navigation/native";
import Screens from "../util/Screens";

export default function PaymentScreen() {
     const navigation = useNavigation()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Make Payment"
          })
     },[]);


     const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

     // variables
     // const snapPoints = React.useMemo(() => ["30%", "100%"], []);

     // callbacks
     const handlePresentRatings = () => {
          navigation.navigate(Screens.RATING_AND_REVIEWS_SCREEN)
     }
     return (
          <View style={styles.container}>
               <View style={styles.paycontainer}>
                    <View style={styles.payOption}>
                         <View style={styles.mpesa}>
                              <Text style={styles.mpesaTxt}>M-PESA</Text>
                         </View>
                    </View>
               </View>
               <View style={styles.payments}>
                    <TouchableOpacity
                         style={styles.makePay}
                         onPress={handlePresentRatings}
                    >
                         <Text>Pay(KES 1000)</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
}
const styles = StyleSheet.create({
     container: {
          // paddingTop: "5%",
          backgroundColor: "white",
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
     },
     payments: {
          alignItems: "center",
          paddingTop: "20%",
     },
});
