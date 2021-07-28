import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, AsyncStorage  } from 'react-native';
import globalStyles from "../../style/styles";

import StorageHelper from '../../services/StorageHelper';

export default function TimeCounter({startCounter, stopCounter}) {

  const [timer, setTimer] = useState(null);
  const [timeKeeper, setTimeKeeper] = useState({h1: 0, h2: 0, m1: 0, m2: 0, s1: 0, s2: 0})
  const [isActive, setIsActive] = useState(false);

  //Control timer
  const startTimer = () => {
    if(!isActive){
      const timer = setInterval(updateTimer, 1000);
      setTimer(timer)
      setIsActive(true);
    }
  }
  const stopTimer = () => {
    if(isActive){
      window.clearInterval(timer);
      setIsActive(false);
    }

  }
  const updateTimer = () => {
    setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, s1: prevTimeKeeper.s1 + 1}});
  }

  //UPDATE DISPLAYED TIME
  useEffect(() => {
    //Seconds
    if(timeKeeper.s1 > 9 ){
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, s2: prevTimeKeeper.s2 + 1}});
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, s1: 0}});
    }
    if(timeKeeper.s2 == 6){
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, m1: prevTimeKeeper.m1 + 1}});
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, s2: 0}});
    }
    //Minutes
    if(timeKeeper.m1 > 9){
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, m2: prevTimeKeeper.m2 + 1}});
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, m1: 0}});
    }
    if(timeKeeper.m2 == 6){
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, h1: prevTimeKeeper.h1 + 1}});
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, m2: 0}});
    }
    //Hours
    if(timeKeeper.h1 > 9){
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, h2: prevTimeKeeper.h2 + 1}});
      setTimeKeeper(prevTimeKeeper => {return {...prevTimeKeeper, h1: 0}});
    }
  }, [timeKeeper.s1]);

  return (
    <SafeAreaView style={globalStyles.timeCounterContainer}>
      <View style={globalStyles.innerContainer}>
        <Text style={globalStyles.timerText}>{timeKeeper.h2 + timeKeeper.h1 + ":" + timeKeeper.m2 + timeKeeper.m1 + ":" + timeKeeper.s2 + timeKeeper.s1}</Text>
      </View>
      <View style={globalStyles.controllerContainer}>
        <View style={globalStyles.controllerButton}>
          <Button title="Start" onPress={() => {startTimer(); startCounter()}}/>
        </View>
        <View style={globalStyles.controllerButton}>
          <Button title="Stop" onPress={() => {stopTimer(); stopCounter()}}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
