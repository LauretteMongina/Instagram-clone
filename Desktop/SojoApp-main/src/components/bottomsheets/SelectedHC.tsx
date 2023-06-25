import {StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

export default function Selected() {
     return (
          <View style={styles.container}>
               <View>
                    <View style={styles.catSelected}>
                         <View style={styles.categories}>
                              <View style={styles.box}></View>
                              <View>
                                   <Text style={styles.cTexts}>CHW Category</Text>
                                   <Text style={styles.cTexts}>20 min</Text>
                              </View>

                              <View>
                                   <Text style={styles.cTexts}>KES 500</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.categories}>
                         <View style={styles.box}></View>
                         <View>
                              <Text style={styles.cTexts}>CHW Category</Text>
                              <Text style={styles.cTexts}>20 min</Text>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </View>
                    <View style={styles.categories}>
                         <View style={styles.box}></View>
                         <View>
                              <Text style={styles.cTexts}>CHW Category</Text>
                              <Text style={styles.cTexts}>20 min</Text>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </View>
                    <View style={styles.categories}>
                         <View style={styles.box}></View>
                         <View>
                              <Text style={styles.cTexts}>CHW Category</Text>
                              <Text style={styles.cTexts}>20 min</Text>
                         </View>
                         <View>
                              <Text style={styles.cTexts}>KES 500</Text>
                         </View>
                    </View>
               </View>
               <View style={styles.btnselect}>
                    <View style={styles.selectedBtn}>
                         <TouchableOpacity>
                              <Text>Request Seected HC      </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
}
const styles = StyleSheet.create({
     container: {
          paddingTop: "80%",
          padding: 20,
     },
     catSelected: {
          backgroundColor: "whitesmoke",
          justifyContent: "center",
          borderRadius: 8,
     },
     categories: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingTop: 20,
     },
     box: {
          height: 40,
          width: 40,
          backgroundColor: "grey",
          borderRadius: 8,
     },
     cTexts: {
          fontSize: 20,
          fontWeight: "500",
     },

     btnselect: {
          borderRadius: 8,
          backgroundColor: "grey",
          padding: 10,
          justifyContent: "center",
     },
     selectedBtn: {
          paddingLeft: "30%",
     },
});
