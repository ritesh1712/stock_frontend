import React, { useState } from 'react';
import Loading from './Loading';
import Header from './Header';

const StockData = () => {

const [data,setData] = useState({})
  const [search,setSearch] = useState('ibm')
  const [loading,setLoading] = useState(true)

const timeSeries = data && data['Time Series (5min)'];

  const convertToIST = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
       <Header setSearch={setSearch} setLoading={setLoading} setData={setData} search={search} />
{
  data.Information || !loading ? <div className='w-1/2 m-auto text-center text-2xl font-semibold text-red-600'>api limit expire please try after some time</div> :
!data.Information  ? <Loading />:    
<>
      
      <p className="text-center mb-4">{data['Meta Data'].Information}</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time (IST)</th>
              <th className="border border-gray-300 px-4 py-2">Open</th>
              <th className="border border-gray-300 px-4 py-2">High</th>
              <th className="border border-gray-300 px-4 py-2">Low</th>
              <th className="border border-gray-300 px-4 py-2">Close</th>
              <th className="border border-gray-300 px-4 py-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(timeSeries).map((time, index) => {
             
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{convertToIST(time).split(",")[0]}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{convertToIST(time).split(',')[1]}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{timeSeries[time]['1. open']}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{timeSeries[time]['2. high']}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{timeSeries[time]['3. low']}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{timeSeries[time]['4. close']}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{timeSeries[time]['5. volume']}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
</>

}

    </div>
  );
};

export default StockData;
