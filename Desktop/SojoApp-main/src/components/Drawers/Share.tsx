import React from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function Share() {
     const navigation = useNavigation()
     return (
          <View>
               <Text>Share</Text>
          </View>
     );
}
