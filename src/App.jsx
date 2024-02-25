import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import images
import clearSky from './assets/clearSky.png'
import fewClouds from './assets/fewClouds.png'
import scatteredClouds from './assets/scatteredClouds.png'
import brokenClouds from './assets/brokenClouds.png'
import showerRain from './assets/showerRain.png'
import rain from './assets/rain1.png'
import thunderstorm from './assets/thunderstorm.png'
import snow from './assets/snow_2507519.png'
import mist from './assets/midst.png'
import humidityIcon from './assets/humidityIcon.png'
import windIcon from './assets/windIcon.png'
import searchIcon from './assets/search.png'

import './App.css'

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
  <div className="image">
    <img src={icon} alt="Image Loading" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
    <span className="log">longitude</span>  
    <span>{log}</span>  
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="" className='icon' />
      <div className="data">
        <div className="humidity-percent">{humidity} %</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="" className='icon' />
      <div className="data">
        <div className="wind-percent">{wind} km/h</div>
        <div className="text">Wind</div>
      </div>
    </div>
  </div>
  </>
  )
}

WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired

}

function App() {
  
  const [icon,setIcon]=useState(null)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("Chennai")
  const [country,setCountry]=useState("IN")
  const [lat,setLat]=useState(0)
  const [log,setLog]=useState(0)
  const [humidity, setHumidity]=useState(0)
  const [wind ,setWind]=useState(0)
  const[text,setText]=useState("Chennai")
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  let api_key="cbc8ceb936dbd0d58dcc9d546caa00c4"
  const weatherIconMap={
    "01d": clearSky,
    "01n": clearSky,
    "02d": fewClouds,
    "02n": fewClouds,
    "03d": scatteredClouds,
    "03n": scatteredClouds,
    "04d": brokenClouds ,
    "04n": brokenClouds,
    "09d": showerRain ,
    "09n": showerRain,
    "10d": rain,
    "10n": rain,
    "11n":thunderstorm,
    "11d":thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d":mist,
    "50n":mist,
  }

  const search=async ()=>{
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try {
      let res=await fetch(url)
      let data=await res.json()
      if(data.cod==="404") 
      {
        console.log("City Not Found")
        setCityNotFound(true)
        setLoading(false)
        
        return
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIconCode=data.weather[0].icon
      setIcon(weatherIconMap[weatherIconCode] || clearSky)
      setCityNotFound(false)
    } catch (error) {
      console.log(error);
      setError("Error Ocuured While Fetching Data")
    }
    finally{
      setLoading(false)
    }
  }
  const handleCity=async (e)=>{
    setText(e.target.value)
  }
  const handleKeyDown=async(e)=>{
       if(e.key==="Enter")
       {
        search();
       }
  }
  useEffect(()=>{
    search()
  },[])
  return (
    <>
     <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
        <div className="search-icon">
          <img className='searchImg' src={searchIcon} onClick={()=>search()} alt="search" />
        </div>
      </div>
      {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />
}
      {loading&&<div className="loading-message">
        Loading...
      </div>}
      {error && <div className="error-message">
        {error}
      </div>}
      {cityNotFound && <div className="city-not-found">
        City Not Found
      </div>}
      <p className='copyright'>
        Designed By <span>Akkuniyash</span>
      </p>
     </div>
    </>
  )
}

export default App
