import axios from "axios"
import { getAccessToken } from "../utils/common-utils";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: {
            authorization:getAccessToken()
        },
        params: params ? params : null,
    });
}