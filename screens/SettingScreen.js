import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Keyboard, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import FAIcons from 'react-native-vector-icons/FontAwesome';

//Styles
import globalStyles from "../style/styles";

//setIsEditing switches between showing and hiding controllers for saving and trashing in settings

//Components
import Header from '../components/Header'

export default function SettingScreen({salary, setNewSalary}) {

  //States
  const [salaryInput, setSalaryInput] = useState();
  const [userPreSalary, setUserPreSalary] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const changeSalaryInput = (text) => {
    setSalaryInput(text);
    setIsEditing(true)
  }
  const dispController = () => {
    setIsEditing(true)
  }
  const saveNewSalary = () => {
    setNewSalary(salaryInput);
    setUserPreSalary(salary);
    setIsEditing(false);
  }
  const cancelNewSalary = () => {
    setSalaryInput(userPreSalary);
    setIsEditing(false)
  }

  useEffect(() => {
    setSalaryInput(salary);
    setUserPreSalary(salary);
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.settingScreenContainer}>
        <Header headerText={"Setting"}/>
        <View style={styles.settingContainer}>
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Economy:</Text>
            <View style={styles.economicSection}>
              <View style={styles.economicSectionSalary}>
                <Text style={styles.salarySettingText}>Salary: </Text>
                <TextInput
                  style={styles.settingInput}
                  value={salaryInput}
                  keyboardType="numeric"
                  onChangeText={(text) => {changeSalaryInput(text)}}
                  placeholder="Enter Salary"
                  onFocus={() => dispController()}
                />
                {isEditing ?
                  [
                  <View style={styles.salaryControllerContainer} key="controllerCont">
                    <Pressable onPress={saveNewSalary} key="pressable1">
                      <FAIcons name='save' color='green' style={styles.controllerIcon} key="controllerIconSave"/>
                    </Pressable>
                    <Pressable onPress={cancelNewSalary} key="pressable2">
                      <FAIcons name='trash' color='red' style={styles.controllerIcon} key="controllerIconTrash"/>
                    </Pressable>
                  </View>
                  ]
                  :
                  null
                }
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  settingScreenContainer:{
    flex: 1
  },
  settingSection:{
    marginTop: 15,
    borderBottomWidth: 1
  },
  settingSectionTitle:{
    color: 'grey',
    fontSize: 25
  },
  //Economic setting styling
  economicSection:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  economicSectionSalary:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingInput:{
    borderBottomWidth: 1,
    width: windowWidth * 0.2,
    fontSize: 20
  },
  salarySettingText:{
    fontSize: 20
  },
  salaryControllerContainer:{
    flexDirection: 'row',
  },
  controllerIcon:{
    fontSize: 20,
    marginLeft: 10
  },

});
