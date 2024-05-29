import axios from "axios";

const getRandomTemp = () => Math.floor(Math.random() * 40);

const getCityWeather = async (city: string) => {
    const weather_url = 'http://api.weatherapi.com/v1/current.json?key=db398c00b1c24e4797c195414242805&q=' + city + '&aqi=no';
    try {
        const weather = await axios.get(weather_url);
        const data = weather.data;
        return Number.isNaN(data.current.temp_c)? getRandomTemp() : data.current.temp_c;
    }
    catch (e) {
        return getRandomTemp();
    }
}

export {getCityWeather};
