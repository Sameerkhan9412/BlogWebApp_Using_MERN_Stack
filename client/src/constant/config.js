export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'Loading',
        message:"data is being loaded , please wait"
    },
    success:{
        title:'success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:"Error",
        message:"An error occur while fetching response from the server. please try again"
    },
    requestFailure:{
        title:"Error",
        message:"An error occured while parsing request data"
    },
    networkError:{
        title:"Error",
        message:"Unable to connect with the server. Please check internet connectivity and try again later"
    }
}

// API SERVICE CALL
// SAMPLE REQUEST 
// NEED SERVICE CALL: {url:'/',method:'POST/GET/PUT/DELETE',params:true/false,query:true/false}
export const SERVICE_URL={
    userSignup:{url:'/signup',method:'POST'}
}
