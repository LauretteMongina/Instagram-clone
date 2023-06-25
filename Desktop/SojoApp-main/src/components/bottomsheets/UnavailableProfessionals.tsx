import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";


type Props = {
     onCancel:(index:number) => void
}
export default function UnavailableProfessionals({ onCancel } :Props) {

     return (
          <View style={{justifyContent: "center", alignItems: "center"}}>
               <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 28, fontWeight: "bold"}}>Sorry</Text>
                    <Text style={{fontSize: 22, fontWeight: "600"}}>
                         All our HCPs are currently busy
                    </Text>

                    <Text style={{paddingTop: 25}}>
                         We will let you know when we find someone!
                    </Text>
               </View>
               <View style={{paddingTop: "20%"}}>
                    <TouchableOpacity
                         style={{
                              justifyContent: "center",
                              alignItems: "center",

                              width: 297,
                              height: 42,
                              borderRadius: 6,
                              backgroundColor: "#00CC9B",
                         }}
                         onPress={() => onCancel(0)}
                    >
                         <Text
                              style={{
                                   alignItems: "center",
                                   color: "white",
                              }}
                         >
                              Go back home
                         </Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
}
