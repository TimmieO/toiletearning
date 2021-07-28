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

/*INFO
  Salary set to 2 decimals, change at toFixed(num) to up decimals
 */

/*DONE
  Fix counter prop
  Fix so that it updates instantly in saved screen

 */

/*TODO-
  Fix screen when first loading or if AsyncStorage does not include salary
  Fix Calculator Screen
  Fix all Saved screen
  Fix save if user close app without pressing
  Add millisecond counter

  Fix settingscreen styles names to where they are reusable
  Fix Salary input where you know it's input
  Fix Setting section style, easy to reuse and create new settingsections
  Fix Keyboard Disappear on save and on trash in settings

  Fix saveData parameter to an object
  Fix better name for saveData/saveTime
  Move all asyncStorage to a separate file

  Add salary to storage later
  Async storage 'userData' layout
  [
    {
      userId: (if logged in, get from db, else 0),
      userName: (if logged in, get from db, else 'Guest'),
      savedTimes: [
      {
        id: (+1 on latest saved id),
        total: 500,
        time: 1
      }
      ]
    }
  ]

  Clear up the code
  Make code more clear and understandable

 */

const Tab = createBottomTabNavigator();

export default function App() {

  const [salary, setSalary] = useState({mSalary: null, sSalary: null});
  const [salaryStatus, setSalaryStatus] = useState(false) //Status if set
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedTimes, setSavedTimes] = useState();

  //Save user data to async, if not already exist
  const saveUserData = async() => {
    let data = {
      userId: null,
      userName: null,
      mSalary: null,
      sSalary: null,
      savedTimes: []
    };
    if(loggedIn){} //Add later, for when user is logged in
    if(!loggedIn){
      data.userId = 0; // 0, as guest
      data.userName = 'Guest' //Guest, as guest
    }
    await AsyncStorage.setItem('userData', JSON.stringify(data));

  }

  //Get user data when loading app, to see if already exist in storage
  const getUserData = async() => {
    const userDataAsync = await AsyncStorage.getItem('userData');
    if(!userDataAsync){
      saveUserData();
    }
    console.log("exist")
  }

  const getDaysInMonth = () =>{
    let date = new Date();
    let month = date.getMonth();
    return new Date(month, 0).getDate();
  }


  //First time setting salary
  const setNewSalary = async(val) => {
    const userDataAsync = await AsyncStorage.getItem('userData');

    let parsedData = JSON.parse(userDataAsync);

    let perSecond = val / getDaysInMonth() / 24 / 60 / 60;

    parsedData['mSalary'] = val;
    parsedData['sSalary'] = perSecond.toFixed(2) ;

    let data = parsedData;

    await AsyncStorage.setItem('userData', JSON.stringify(data));

    setSalary(salary => ({...salary, mSalary: parsedData['mSalary']}))
    setSalary(salary => ({...salary, sSalary: parseFloat(parsedData['sSalary']).toFixed(2)}))
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

  const saveTime = async(saved, counter) => {
    const userDataAsync = await AsyncStorage.getItem('userData');

    let parsedData = JSON.parse(userDataAsync);

    let savedTimeId;

    if(parsedData['savedTimes'].length > 0){
      let savedTimesLength = parsedData['savedTimes'].length - 1;
      let latestSavedId = parsedData['savedTimes'][savedTimesLength]['id'];

      savedTimeId = latestSavedId + 1;
    }
    else{savedTimeId = 0}

    let savedTimeData = {
        "id": savedTimeId,
        "moneySaved": saved,
        "time": counter
      }

    parsedData['savedTimes'].push(savedTimeData);

    let data = parsedData;
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    setSavedTimes(savedTimes => [...savedTimes, savedTimeData])
    console.log(JSON.stringify(savedTimeData))

    console.log(savedTimes)
  }

  const getSavedTimes = async() => {
    const userDataAsync = await AsyncStorage.getItem('userData');

    let parsedData = JSON.parse(userDataAsync);

    setSavedTimes(parsedData['savedTimes'])

  }


  useEffect(() => {
    getUserData();

    getSavedTimes();
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
            {() => <SavedScreen savedTimes={savedTimes}/>}
          </Tab.Screen>
          <Tab.Screen name="Home">
            {() => <CounterScreen salary={salary} saveTime={saveTime} />}
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
