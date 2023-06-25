import { io } from "socket.io-client";


const REMOTE_URL :string= "https://backend-alpha.herokuapp.com"
const NEW_REMOTE_URL :string = "http://144.126.213.198:5000"
const NGROK_URL :string = "https://0071-196-216-90-205.ngrok.io"
const LOCAL_URL  :string= "http://192.168.0.103:5000"
const GOOGLE_MAPS_API_KEY:string = "AIzaSyC85nQFylcMIXVTf7R1TnNowLQO9PE3xSM"

const BASE_URL = NEW_REMOTE_URL

const socket = io(BASE_URL);

export { socket,GOOGLE_MAPS_API_KEY }
export default BASE_URL
