import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')
  const today = new Date();  
  const formattedDate = today.toLocaleDateString(); 

  console.log(import.meta.env.VITE_WEATHER_API)
  useEffect(() => {
    const fetchData = async () => //asenkron bir data alacağımız icin async bir const tanımladık
    {
      try {
        //axios http isteği yapmamızı sağlayan js kütüphanelerinden biri
        //datayı weatherapp.com apisinden alıyoruz. Bunun icin siteye üye olmak gerekiyor. 

        //const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=&q=London&days=4&aqi=yes&alerts=yes`)
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=5&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    };

    if (location) //location dolu ise fetchData çalışsın
    {
      fetchData();
    }
  }
    , [location] //location değiştiğinde useEffect tetiklenecek
  )
  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava Durumu Uygulaması</h1>
        <h1 className='app-date'>Bugün {formattedDate}</h1>
        <div className='input-container'>
          <input
            className='location-input'
            type='text'
            placeholder='Şehir giriniz'     //input içinde ne yazacağı
            value={location}                //girilen değer location değişkenine atanacak
            onChange={handleLocationChange} //degisiklik durumunda ne yapacagını belirlemek icin bir func yazıyoruz ve buraya belitriyoruz
          />
        </div>

      </div>

      {weatherData && (
        <div className='weather-container'>
          {weatherData.forecast.forecastday.map((day) => (
            <div className='day-container' key={day.date}>
              <h2 className='date'>{day.date}</h2>
              <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text}></img>
              <p className='temperature'>{day.day.avgtemp_c} C </p>
              <p className='temperature'>{day.day.condition.text}</p>
            </div>

          ))}

        </div>
      )}

    </>
  )
}

export default App
