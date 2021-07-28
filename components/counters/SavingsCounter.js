import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, AsyncStorage  } from 'react-native';
import globalStyles from "../../style/styles";
//Check if I can remove flex from 2 elements and only have it on main View

export default function SavingsCounter({counter, salary, saveTime}) {

  const [totSaved, setTotSaved] = useState();

  useEffect(() => {
    setTotSaved(salary.sSalary * counter)
  }, [counter]);

  return (
    <SafeAreaView style={globalStyles.savingsCounterContainer}>
      <View style={globalStyles.innerContainer}>
        <Text style={globalStyles.savingsCounterText}>$ {totSaved}</Text>
      </View>
      <View style={globalStyles.savingsControllerContainer}>
        <View style={globalStyles.controllerButton}>
          <Button title="Save" onPress={() => {saveTime(totSaved, counter)}}/>
        </View>
        <View style={globalStyles.controllerButton}>
          <Button title="Clear" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({


});
