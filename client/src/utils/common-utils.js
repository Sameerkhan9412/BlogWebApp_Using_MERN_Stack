export const getAccessToken=()=>{
    return sessionStorage.getItem('accesstoken');
}

export const addEllipses=(str,limit)=>{
    return str.length>limit?str.subString(0,limit)+"...":str;

}