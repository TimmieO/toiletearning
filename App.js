import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, AsyncStorage } from 'react-native';
import globalStyles from "./style/styles";

//Screens
import CounterScreen from './screens/CounterScreen'

//Modules
import SetSalaryModule from './components/modules/SetSalary'

/*DONE
  Fix counter prop
 */

/*TODO-
  Fix screen when first loading or if AsyncStorage does not include salary
  Fix Calculator Screen
  Fix all Saved screen
  Fix save if user close app without pressingc
  Add millisecond counter
 */

export default function App() {

  const [salary, setSalary] = useState();
  const [salaryStatus, setSalaryStatus] = useState(false) //Status if set

  //First time setting salary
  const setNewSalary = async(val) => {
    await AsyncStorage.setItem('salary', val);
    setSalaryStatus(true);
    setSalary(val)
  }
  //Getting salary when loading app
  const getSalary = async() => {
    const salaryVal = await AsyncStorage.getItem('salary');
    if(salaryVal){
      setSalaryStatus(true);
      setSalary(salaryVal);
    }
    if(!salaryVal){
      setSalaryStatus(false);
    }
  }

  useEffect(() => {
    getSalary();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {salaryStatus ? null : <SetSalaryModule setNewSalary={setNewSalary}/>}
      <CounterScreen salary={salary}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


});
