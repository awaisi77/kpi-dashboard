import axios from 'axios';
import config from '../config/config'
import moment from 'moment';


export const callApi = (data) =>{
    const url = data.url;
    const method = data.method;
    const payload = data.data;

    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios
            .request({
                url: url,
                method: method,
                data: payload
            })

            // taking action on response
            .then(response => {
                resolve(response);
            })

            //  handling error
            .catch((error) => {
                reject(error);
            });
    });
};

let PsDashboard = config.base_api_url+"PsDashboard/Permissions/";
export const  getPermissions = new Promise((resolve,reject)=>{
    axios.post(PsDashboard+'GetPermissions')
        .then(res => {
            const data = res.data;
            console.log(data)
            resolve(data)
        }).catch(
        (err)=>{reject(err)}

    )
    //reject([])
});
