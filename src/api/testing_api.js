import { axiosGettradeInstance } from "./config";


export function postDataGettrade(url, postData) {
  return new Promise(function (resolve, reject) {
    const axiosClient = axiosGettradeInstance();

    // var superData = {
    //   "postData": postData
    // };
    // console.log("request header", postData);
    axiosClient.post(url, postData)
      .then(response => {
        if (response.data.error) {
          resolve(JSON.parse(JSON.stringify(response.data)));

        } else {
          // Handle response
          resolve(JSON.parse(JSON.stringify(response.data.value)));
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
        // Handle errors
        reject(JSON.parse(JSON.stringify(error.message)));
      });
  });
}


export const postdata_endpoint_URL = () => {
  return '/fetchTradeAlert';
};