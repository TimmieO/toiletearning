import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

//Styles
import globalStyles from "../style/styles";

//Components
import Header from '../components/Header'
import DisplaySaved from '../components/saved/DisplaySave'

/*TODO-
  Add remove function
  Add better styling
  Add total
  Fix statistics button (To show all totals)
  Fix save date, time and amount in Async storage

 */


export default function SavedScreen({savedTimes}) {

  return (
    <SafeAreaView style={globalStyles.counterScreenContainer}>
      <Header headerText={"Saved"}/>
      <DisplaySaved savedTimes={savedTimes}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
