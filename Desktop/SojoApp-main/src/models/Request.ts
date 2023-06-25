import DistanceInfo from "./DistanceInfo";
import HealthWorker from "./HealthWorker";



export interface Request {
     _id: string;
     patientId: string;
     matchedhealthWorkerId: string;
     serviceFee?: any;
     isCanceled: boolean;
     isMatched: boolean;
     potentialHealthWorkers: PotentialHealthWorker[];
     requestsMade: number;
     examination: Examination | null;
     createdAt: Date;
     updatedAt: Date;
     __v: number;
     appointmentDate:string | null,
     appointmentTime:string | null,
     requestType:string,
     requestStatus:string
}

export interface PotentialHealthWorker {
     healthWorker: HealthWorker;
     isDenied: boolean;
     isAssigned: boolean;
     distanceInfo: DistanceInfo;
}

export interface Examination {
     weight:string,
     temperature:string,
     bloodPressure:string,
     heartRate:string,
     allergy:string,
     exerciseInTheLast7days:string,
     activities:string[],
     patientJob:string,
     activeInSports:string,
     mainModeOfTransport:string,
     mealArrangement:string,
     dietaryInclusions:string[],
     dietaryExclusions:string,
     isDietBalanced:string,
     lastVisitToANutritionist:string,
     patientSymptoms:string,
     patientSymptomInclusions:string[],
     currentMedication:string,
     startOfTheSymptoms:string,
     previousExperiences:string

}

