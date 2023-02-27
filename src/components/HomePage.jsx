import React, { useState,useEffect } from 'react'
import './Home.css'
import axios from 'axios'


const HomePage = () => {

    const [search, setSearch] = useState('')
    const [wheatherData, setWheaterData] = useState(null)
    const [toggle,setToggle]=useState(null)
    const [toggle1,setToggle1]=useState(null)
    const [recent, setRecent] = useState([])
    // const URL = 'https://api.openweathermap.org/data/2.5/weather?q=motihari&appid=2577de43e81529875a56e3bf502e329f'


   const getWheaterdata= async(search)=>{
    try{
        const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2577de43e81529875a56e3bf502e329f`)

        const data=response.data
        setToggle(true)
        console.log(data)
        const newSearch=[search,...recent.slice(0,2)]
        setRecent(newSearch)

        //for setting the data to localstorage
        localStorage.setItem('recent',JSON.stringify(newSearch));
        return data
        
    }catch(err){
        setToggle(false)
        console.log(err)
    }

   }

   const handleSubmit=async (e)=>{
    e.preventDefault();
    const wheatherData=await getWheaterdata(search);
    setWheaterData(wheatherData)
    // setSearch([...recent,search])

    
   }

   useEffect(()=>{
    const recentsearchData=localStorage.getItem('recent')
    if(recentsearchData){
        setRecent(JSON.parse(recentsearchData))
    }
   },[])


  

    return (
        <div className='main-c'>
            <div className='home-container'>
                <h1> Weather app</h1>
                <form onSubmit={handleSubmit} action="">

                <input type="text" value={search} onChange={(e) =>setSearch(e.target.value)} placeholder='Enter City Name' className='search' />
                <div className='btn-div'>
                    <button className='search-btn' type="submit">Search</button>
                </div>
                </form>

                 {toggle ?

                <div className='flex-con'>

                    <li>weather details of city : {wheatherData.name}</li>
                    <li>current temperature : {wheatherData.main.feels_like}</li>
                    <li>temperature range : {wheatherData.main.temp_max} to {wheatherData.main.temp_min}</li>
                    <li>humidity : {wheatherData.main.humidity}</li>
                    <li>sea level : {wheatherData.main.sea_level}</li>
                    <li>ground level : {wheatherData.main.grnd_level}</li>

                </div>:<div className='flex-conerr'>
                    Enter Valid City Name
                </div>
                       }
                       {recent.length>0 && !toggle && (
                           <ul>
                            <h2 className='lcen'>Last 3 Entries</h2>
                            {recent.map((sear,idx)=>(<li className='listlc' key={idx}>{sear}</li>))}
                        </ul>
                       )}

            </div>
        </div>
    )
}

export default HomePage