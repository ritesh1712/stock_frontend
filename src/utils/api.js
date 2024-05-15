const BASE_URL = 'https://stock-backend-40mo.onrender.com'; // Update with your backend URL




const registerUser = async (endpoint, data)=>{
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Failed to submit data: ${error.error}`);
      }
      return response.json();
}

const loginUser = async (endpoint, data)=>{
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }
      return response.json();
}

const getStackData = async (endpoint)=>{
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${endpoint}&interval=5min&apikey=LU3X6UUX26SWER17`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }
      return response.json();
}





export {registerUser,loginUser,getStackData };
