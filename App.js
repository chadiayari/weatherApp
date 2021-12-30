import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import React, {useEffect, useState} from "react"
import { Fontisto } from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get("window").width;
const api_key = "784ab24ff2ed5d94d4288abed9e25d13";
const icons = {
  "Clouds": "cloudy",
  "Atmosphere": "cloudy-gusts",
  "Clear": "day-sunny",
  "Snow": "snow",
  "Rain": "rains",
  "Thunderstorm": "lightning",
  "Drizzle": "rain",
}

export default function App() {
  const [city, setCity] = useState("Loading");
  const [days, setDays] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const  {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 })
      const  location = await Location.reverseGeocodeAsync( {latitude,longitude}, { useGoogleMaps:false })
      setLocation(location);
      setCity(location[0].city);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${api_key}&units=metric`);
      const json = await response.json();
      setDays(json.daily)
    })();
  }, []);

  return (
    <View style={styles.main_container}>
      <View style={styles.city}>
        <Text style={styles.city_name}>{city}</Text>
      </View>

      <ScrollView
        horizontal 
        pagingEnabled 
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={styles.weather_container}>
            <ActivityIndicator color="white" size="large" />
          </View>
          ) : (
            days.map((day, index) => 
            <View key={index} style={styles.weather_container}>
              <View style={styles.temp_icon}>
                <Text style={styles.weather_degree}>
                  {parseFloat(day.temp.day).toFixed(1)}°
                </Text>
                <Fontisto name={icons[day.weather[0].main]} size={44} color="white" />
              </View>
                
              <Text style={styles.weather_status}>
                {day.weather[0].main}
              </Text>

              <Text style={styles.description}>
                {day.weather[0].description}
              </Text>
            </View>
            )
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor:"tomato"
   },
   city_name: {
    fontSize: 68,
    color:"white"
  },
  city: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
  },
  weather: {
  },
  weather_container:{
    width: SCREEN_WIDTH,
  },
  temp_icon:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  weather_degree:{
    marginTop: 20,
    fontSize:110,
    fontWeight: "bold",
    color:"white"
  },
  weather_status:{
    textAlign:"center",
    marginTop: 5,
    fontSize:40,
    color:"white"
  },
  description:{
    textAlign:"center",
    fontSize:20,
    color:"white"
  },
});
