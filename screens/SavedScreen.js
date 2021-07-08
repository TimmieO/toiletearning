import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

//Styles
import globalStyles from "../style/styles";

//Components
import Header from '../components/Header'

export default function SavedScreen() {

  return (
    <SafeAreaView style={globalStyles.counterScreenContainer}>
      <Header headerText={"Saved"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
