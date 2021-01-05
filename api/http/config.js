const axios = require('axios')


// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = '';
// }

axios.defaults.timeout = 10000;


// axios.interceptors.request.use(    
//     config => {
//         return config;    
//     },    
//     error => {        
//         return Promise.error(error);    
//     })

// axios.interceptors.response.use(    
//     response => {        
//         if (response.status === 200) {            
//             return Promise.resolve(response);        
//         } else {            
//             return Promise.reject(response);        
//         }  
//       }  
 
// );
/** 
 * get
 * @param {String} url [url] 
 * @param {Object} params [params] 
 */
 function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
/** 
 * post
 * @param {String} url [url] 
 * @param {Object} params [params] 
 */
 function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url,params)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
const $http ={get,post}

module.exports =  $http;