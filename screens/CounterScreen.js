import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

//Styles
import globalStyles from "../style/styles";

//Components
import Header from '../components/Header'
import TimeCounter from '../components/counters/TimeCounter'
import SavingsCounter from '../components/counters/SavingsCounter'

export default function CounterScreen({salary, saveTime}) {

  //States
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(0)

  //Count seconds
  const startCounter = () => {
    const timer = setInterval(updateCounter, 1000);

    setTimer(timer)
  }
  const stopCounter = () => {
    window.clearInterval(timer);
  }
  const updateCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  }

  return (
    <SafeAreaView style={globalStyles.counterScreenContainer}>
      <Header headerText={"Counter"}/>
      <TimeCounter startCounter={startCounter} stopCounter={stopCounter}/>
      <SavingsCounter counter={counter} salary={salary} saveTime={saveTime} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
