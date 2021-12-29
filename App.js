import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width

export default function App() {
  return (
    <View style={styles.main_container}>
      <View style={styles.city}>
        <Text style={styles.city_name}>Seouls</Text>
      </View>

      <ScrollView
        horizontal 
        pagingEnabled 
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.weather_container}>
          <Text style={styles.weather_degree}>27</Text>
          <Text style={styles.weather_status}>Sunny</Text>
        </View>
        <View style={styles.weather_container}>
          <Text style={styles.weather_degree}>27</Text>
          <Text style={styles.weather_status}>Sunny</Text>
        </View>
        <View style={styles.weather_container}>
          <Text style={styles.weather_degree}>27</Text>
          <Text style={styles.weather_status}>Sunny</Text>
        </View>
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
    fontWeight: "bold",
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
    marginTop: 50,
    fontSize:160
  },
  weather_status:{
    marginTop: -20,
    fontSize:29
  },
});
