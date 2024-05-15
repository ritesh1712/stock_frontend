import React ,{useEffect,useState} from 'react'
import {LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line} from 'recharts'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Loading from '../components/Loading';


function Charts() {

  const [jsonData,setData] = useState({})
  const [search,setSearch] = useState('ibm')
  const [loading,setLoading] = useState(true)

    function extractTime(timestamp) {
      const date = new Date(timestamp);
      // Adjusting for Indian Standard Time (IST) offset (GMT+5:30)
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);
      const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with zero if needed
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
      const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds and pad with zero if needed
      const time = `${hours}:${minutes}:${seconds}`; // Construct the time string
      return time;
  }

    const highLowData = [];

for (const timestamp in jsonData['Time Series (5min)']) {

  const data = jsonData['Time Series (5min)'][timestamp];
  // console.log(jdata);
  const highLowObj = {
    high: parseFloat(data['2. high']),
    low: parseFloat(data['3. low']),
    date: extractTime(timestamp)
  };
  highLowData.push(highLowObj);
}

console.log(highLowData);
highLowData.length = 8



const navigate = useNavigate()

useEffect(() => {
  if(localStorage.getItem('token')===null){
    navigate('/login')
  }

}, [])

  return (
    <div className='flex items-center h-screen flex-col gap-10'>
<Header setSearch={setSearch} setLoading={setLoading} setData={setData} search={search} />


{
   jsonData.Information || !loading ? <div className='w-1/2 m-auto text-center text-2xl font-semibold text-red-600'>api limit expire please try after some time</div> :
   !jsonData.Information  ? <Loading />: <>
    <LineChart width={730} height={250} data={highLowData}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <Line type="monotone" dataKey="high" stroke="#82ca9d" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="low" stroke="red" />
</LineChart>
   </>
}
   
</div>

  )
}

export default Charts