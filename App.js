import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import React, {useEffect, useState} from "react"

const SCREEN_WIDTH = Dimensions.get("window").width;
const api_key = "784ab24ff2ed5d94d4288abed9e25d13";

export default function App() {
  const [city, setCity] = useState("Loading...");
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
      console.log(json.daily)
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
        showsHorizontalScrollIndicator={true}
      >
        {days.length === 0 ? (
          <View style={styles.weather_container}>
            <ActivityIndicator color="white" size="large" />
          </View>
          ) : (
            days.map((day, index) => 
            <View key={index} style={styles.weather_container}>
              <Text style={styles.weather_degree}>
                {parseFloat(day.temp.day).toFixed(1)}°
              </Text>
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
    backgroundColor: "tomato",
   },
   city_name: {
    fontSize: 68,
  },
  city: {
    flex: 1.2,
    alignItems:"center",
    justifyContent:"center"
  },
  weather: {
  },
  weather_container:{
    alignItems:"center",
    width: SCREEN_WIDTH
  },
  weather_degree:{
    marginTop: 20,
    fontSize:140,
    fontWeight: "bold",
  },
  weather_status:{
    marginTop: -5,
    fontSize:49
  },
  description:{
    marginTop: 5,
    fontSize:22
  },
});
