
export const modelOptions = {
    method: 'GET',
   // params: {limit: '10', page: '0'}, // for car
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
    }
  };


//   export const carOptions = {
//     method: 'GET',
//     params: {limit: '10', page: '0'}, // for car
//      headers: {
//        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//        'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
//      }
//   };

export const Options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ef017355bcmshe411f51b0b92edbp1543adjsn8875a675b9ea',
        'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
    }
}


export const FetchData = async(url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();

  return data;
};
