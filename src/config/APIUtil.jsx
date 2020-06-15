/**
 * @description Class with function with  get method api call
 */
import Axios from "axios";


class APIUtil {

    /**
     * 
     * @param {*} url - API URL
     * @memberof APIUtil
     */
    getMethod(url,auth) {
       
            var headersSet = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            return Axios({
                method: 'get',
                url: url,
                headers: headersSet
            }).then(response => response).catch(error =>{ 
               console.log('ERROR',error)
            });
        }

    



}
export default  (new APIUtil());