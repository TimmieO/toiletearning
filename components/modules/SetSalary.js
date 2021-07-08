import React, {Component, useState} from 'react';
import { StyleSheet, Text, Button, View, TextInput, Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';

export default function SetSalaryModule({setNewSalary}){

  const [salaryVal, setSalaryVal] = useState()

  //Save user input in state
  const changeSalaryText = (text) => {
    setSalaryVal(text)
  }
  //onPress on button send state value
  const submitSalary = () => {
    if(salaryVal.length > 0){
      setNewSalary(salaryVal);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.moduleOuterContainer}>
        <View style={styles.moduleInnerContainer}>
          <View style={styles.salaryModuleHeaderCont}>
            <Text style={styles.salaryModuleHeaderText} >Enter Salary </Text>
          </View>
          <View style={styles.salaryModuleInputCont}>
            <TextInput
              placeholder="Enter Salary"
              keyboardType="numeric"
              onChangeText={(text) => { changeSalaryText(text)}}
              style={{borderBottomWidth: 1, width: '50%'}}
            />
          </View>
          <View>
            <Button
              title="Submit"
              onPress={() => submitSalary()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  //Outer
  moduleOuterContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    //Align self on top
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 5,
    //Align inner container
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Inner
  moduleInnerContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
  },
  //Module header text
  headerText:{
    fontSize: 25,
    marginTop: 15,
    marginBottom: '15%',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1
  },
  salaryModuleHeaderCont:{
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  salaryModuleHeaderText:{
    fontSize: 25
  },
  closeModuleIcon:{
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 20
  },
  salaryModuleInputCont:{
    justifyContent: 'center',
    flexDirection: 'row',
  }
});