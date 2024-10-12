import axios from 'axios';


// const url = ;

const liveUrl = process.env.REACT_APP_LIVE_URL;


export const axiosTestingInstance = () => {
    const axiosClient = axios.create({
        baseURL: liveUrl,
    });

    return axiosClient;
}


export const axiosGettradeInstance = () => {
    
    const axiosClient = axios.create({
        baseURL: liveUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return axiosClient;
}


