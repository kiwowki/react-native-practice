import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Fontisto } from '@expo/vector-icons';

import { API_KEY } from './config';

import * as Location from 'expo-location';

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const icons = {
    "01d": "day-sunny",
    "02d": "day-cloudy",
    "03d": "cloudy",
    "04d": "cloudy-gusts",
    "09d": "rain",
    "10d": "day-rain",
    "11d": "lightning",
    "13d": "snowflake-4",
    "50d": "fog"
  }


  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    } else {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 }); // 5: Highest accuracy(도시까지)
      console.log(latitude, longitude);
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      setCity(location[0].region);
      console.log(location)
      const { list } = await (
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      ).json();
      console.log(list)
      const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));
      console.log("filteredList", filteredList)
      setDays(filteredList);
    }
  }

  useEffect(() => {
    getWeather()

  }, []);

  return (
    <View style={styles.container}>
      {ok ? (
        <View style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            // showsHorizontalScrollIndicator={false}
            persistentScrollbar // Android only
            indicatorStyle="white"  // iOS only
            contentContainerStyle={styles.weather}>
            {days.length === 0 ? (
              <View style={styles.day}>
                <ActivityIndicator color="white" size="40" style={{ marginTop: 50 }} />
              </View>
            ) : (
              days.map((day, index) =>
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>
                    {parseFloat(day.main.temp).toFixed(1)}˚
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.desc}>{day.weather[0].main}</Text>
                    {/* <Image source={{ uri: `http://openweathermap.org/img/w/${day.weather[0].icon}.png` }} style={{ width: 70, marginTop: -10 }} /> */}
                    <Fontisto style={{ marginTop: -10, marginLeft: 8 }} name={icons[day.weather[0].icon]} size={24} color="white" />
                  </View>
                  <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                </View>)
            )}
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.notOK}>위치 정보를 찾을 수 없습니다. 권한을 허락해주세요😢</Text>
      )}
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#165581"
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 54,
    fontWeight: "500",
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    // alignItems: "center",
    paddingLeft: 20,
  },
  temp: {
    color: "white",
    marginTop: 50,
    fontSize: 98,
    fontWeight: "600",
  },
  desc: {
    color: "white",
    marginTop: -20,
    fontSize: 28,
  },
  tinyText: {
    color: "white",
    fontSize: 16,
  },
  notOK: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 36,
  }
})