import {ToastAndroid} from "react-native";


function showToast(msg:string){
     ToastAndroid.show(msg,ToastAndroid.SHORT)
}

export default showToast
