import BASE_URL from "./BaseURL";


async function geoCoding(latitude:number,longitude:number){
     try {
          const response = await fetch(
               `${BASE_URL}/location/getAddress/${latitude}/${longitude}`)
          const res = await response.json()
          return res.address
     }catch (e){
          console.log(e)
          return "Error getting Address"
     }
}

export default geoCoding
