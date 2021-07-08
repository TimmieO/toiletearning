import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, AsyncStorage } from 'react-native';
import globalStyles from "./style/styles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AntIcons from 'react-native-vector-icons/AntDesign';

//Screens
import CounterScreen from './screens/CounterScreen'
import SettingScreen from './screens/SettingScreen'
import SavedScreen from './screens/SavedScreen'

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

  Fix settingscreen styles names to where they are reusable
  Fix Salary input where you know it's input
  Fix Setting section style, easy to reuse and create new settingsections
  Add Currency picker
  Fix Keyboard Disappear on save and on trash in settings

  Fix savings
  Fix save date, time and amount in Async storage
 */

const Tab = createBottomTabNavigator();

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
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home'){ iconName = 'home' }
              if (route.name === 'Settings'){ iconName = 'setting' }
              if(route.name === 'Saved'){ iconName = 'save' }

              // You can return any component that you like here!
              return <AntIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Saved">
            {() => <SavedScreen />}
          </Tab.Screen>
          <Tab.Screen name="Home">
            {() => <CounterScreen salary={salary} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" >
            {() => <SettingScreen salary={salary} setNewSalary={setNewSalary}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}
//<CounterScreen salary={salary}/>
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


});
