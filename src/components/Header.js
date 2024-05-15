import React,{useEffect} from 'react'
import { getStackData } from '../utils/api'

function Header({setLoading,setData,setSearch,search}) {

    const searchCompany = async (e) =>{
        setLoading(true)
        setData({})
          setSearch(e.target.value)
          getData()
        } 
    
    const getData =async () =>{
        try {
            const response = await getStackData(search);
            setData(response)
            setLoading(false)
          } catch (err) {
            console.log(err)
          }
    }
        
     useEffect(() => {
        getData()
    }, [])  
    
  return (
    <>
     <h2 className="text-3xl font-bold text-center my-6">Stock Data</h2>
      <div className="text-center mb-4 flex justify-center">
        <span className='text-xl font-medium pr-1'>company:</span> 
        <select defaultValue={'ibm'} onChange={(e)=>searchCompany(e)} className="block bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500 w-1/2">
            <option value="ibm">IBM</option>
            <option value="ba">The Boeing company</option>
            <option value="baba">Alibaba Group Holding Limited</option> 
            <option value="bac">Bank Of America Corporation</option>
        </select>
      </div>
    </>
  )
}

export default Header