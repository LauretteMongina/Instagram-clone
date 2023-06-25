import React, {Component} from "react";
import {
     Image,
     TextInput,
     ScrollView,
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
     Alert,
     ActivityIndicator, FlatList,
} from "react-native";
import BASE_URL, {socket} from "../../util/BaseURL";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {SelectUser} from "../../reduxStore/UserReducer";
import Category from "../../models/Category";
import {SelectLatitude, SelectLocationAddress, SelectLongitude} from "../../reduxStore/LocationReducer";
import webSocketConstants from "../../util/webSocketConstants";
import {GREEN_COLOR} from "../../util/designUtil";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type Props = {
     onProceed:() => void,
     onCancel:() => void,
}
type Response = {
     msg:string,
     success:boolean,
     categories:Category[]
}
export default function SelectCategoryComponent({ onProceed,onCancel } : Props) {
     const user = useSelector(SelectUser)
     const latitude = useSelector(SelectLatitude)
     const longitude = useSelector(SelectLongitude)
     const navigation = useNavigation()
     const locationAddress = useSelector(SelectLocationAddress)
     const [categories, setCategories]= React.useState<Category[]>([]);
     const [categorySelected, setcategorySelected] = React.useState(false);
     const [loading, setLoading]: any = React.useState(true);
     const [isRequest, setIsRequest] = React.useState(true);
     const [catData, setCatData] = React.useState<Category | null>(null);
     const [isError,setIsError] = React.useState(false)

     const requestProfessional = () => {

          onProceed()

     }


     React.useEffect(() => {
          const handlefetch = async () => {

               try {
                    await fetch(`${BASE_URL}/category/all`)
                         .then((res) => res.json())
                         .then((data:Response) => {
                              setCategories(data.categories)
                              setLoading(false)
                         });
               }catch (e){
                    console.log(e)
                    setIsError(true)
                    setLoading(false)


               }
          };
          handlefetch();
          return () => {

          }
     }, []);

     return (
          <>
               <View style={{ flex:1 }}>
                    <View style={styles.container}>
                         <Text style={styles.cHeader}>Choose A Category </Text>
                    </View>
                    {
                         loading ? (
                              <View style={{ flex:1 }}>
                                   <ActivityIndicator style={styles.loading} animating={loading} color="green" size="large"/>
                              </View>

                         ):(
                              <FlatList
                                   data={categories}
                                   keyExtractor={(item) => item._id}
                                   renderItem={({ item }) => {
                                        return (
                                             <View>
                                                  <TouchableOpacity
                                                       onPress={() => {
                                                            setcategorySelected(true);
                                                            setCatData(item);
                                                       }}
                                                       style={styles.categories}
                                                  >
                                                       <View style={styles.cbox}>

                                                            <View style={styles.box}>
                                                            <MaterialCommunityIcons name="cross-outline" size={ 11} color="#00CC9B" style={{alignSelf:'center', bottom: -10 }} />

                                                            <FontAwesome5Icon name="hands" size={ 16} color="#00CC9B" style={{alignSelf:'center', }} />

                                                                 
                                                            </View>
                                                            <View>
                                                                 <Text style={styles.cTexts}>{item.categoryName}</Text>

                                                                 <Text style={styles.cTexts}>{item.time} min</Text>
                                                            </View>
                                                       </View>
                                                       <View>
                                                            <Text style={styles.cTexts}>Ksh {item.amount}</Text>
                                                       </View>
                                                  </TouchableOpacity>
                                             </View>
                                        )
                                   }}/>

                         )
                    }
                    <View style={styles.address}>
                         <View style={styles.addressContainer}>
                              {/* <Text >{user.fullName}</Text> */}
                              <Text style={{color:'#000000', marginLeft:20}}>
                                   {loading ? (
                                        <ActivityIndicator size="large" color="#00ff00" style={{ paddingRight:20 }}/>
                                   ) : (locationAddress)}
                              </Text>
                         </View>
                    </View>
               </View>
               <View style={styles.requestBtnContainer}>
                    {categorySelected && isRequest ? (
                         <TouchableOpacity
                              style={styles.button}
                              onPress={requestProfessional}
                         >
                              <Text> Request Selected  ({catData?.categoryName})  </Text>
                         </TouchableOpacity>
                    ) : (
                         <View></View>
                    )}
               </View>


          </>
     );
}
const styles = StyleSheet.create({
     container: {

          alignItems: "center",
     },
     cHeader: {
          fontSize: 16,
          fontWeight: "600",
          color:"black",
          // fontFamily: "sans-serif",
          padding: 20,
          marginLeft:-300,
          marginTop: 29
     },
     categories: {
          flexDirection: "row",
          padding: 20,
          marginTop: 29,
          justifyContent: "flex-start",
     },
     box: {
          height: 36,
          width: 43,
          backgroundColor: "#D9D9D9",
          borderRadius: 8,
     },
     cbox: {
          flexDirection: "row",
          justifyContent: "flex-start",
          flex:1,
          //width:"60%"
     },
     cTexts: {
          fontSize: 14,
          paddingLeft: 10,
          fontWeight: "600",
          fontStyle: "normal",
          color:"black"
          // fontFamily: "sans-serif",
     },

     address: {

          padding: 20,
     },
     addressT: {
          fontWeight: "600",
          fontSize: 12,
          alignItems: "center",
     },
     pen: {
          alignItems: "center",
          paddingRight: 20,
     },
     addressContainer: {
          backgroundColor: "#DEFFF3",
          borderRadius: 8,
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          width: 350,
          alignSelf: "center",
          borderColor: '#00CC9B',
          borderWidth: 1
          
          


     },
     texts: {
          fontSize: 12,
          fontWeight: "400",
     },
     button: {
          backgroundColor: GREEN_COLOR,
          justifyContent: "center",
          alignItems: "center",
          height: 42,
          width: 297,
          borderRadius: 6,
     },

     loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     },
     requestBtnContainer:{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          marginBottom:20
     }
});
