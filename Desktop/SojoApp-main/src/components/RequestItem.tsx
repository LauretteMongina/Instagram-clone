import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Request} from "../models/Request";
import {useNavigation} from "@react-navigation/native";
import Screens from "../util/Screens";


type Props = {
	request:Request
}
const RequestItem = ({ request } : Props) => {
	const navigation = useNavigation()
	const matchedWorker = request.potentialHealthWorkers.find((worker) => worker.isAssigned)

	const goToSingleVisitScreen = () => {
		navigation.navigate(Screens.SINGLE_VISIT_SCREEN,{ requestId:request._id })
	}
	return (
		<TouchableOpacity style={styles.container} onPress={goToSingleVisitScreen}>
			<Text style={styles.header}>
				{ "Sojo Visit on " + new Date(request.createdAt).getDate()}/{new Date(request.createdAt).getUTCMonth() + 1}/
				{new Date(request.createdAt).getFullYear()}
				 {" at " + new Date(request.createdAt).getHours()}:{new Date(request.createdAt).getMinutes()}
			</Text>
			<Text style={styles.doctorName}>{matchedWorker?.healthWorker.fullName}</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container:{
		width:Dimensions.get("screen").width * 0.95,
		height:70,
		borderBottomColor:"grey",
		borderBottomWidth:2,
		padding:10,

		marginHorizontal:5,

	},
	header:{
		fontSize:16,
		fontWeight:"bold",
		color:"black",

	},
	doctorName:{
		fontSize:15
	}
})
export default RequestItem;
