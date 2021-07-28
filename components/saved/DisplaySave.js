import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, Button, View, ScrollView, FlatList, Dimensions, SafeAreaView, AsyncStorage } from 'react-native';

import SavedCard from './SavedCard';

export default function DisplaySaved({savedTimes}){

  useEffect(() => {

    console.log(savedTimes, "hey")
  }, [savedTimes])

  return (

    <SafeAreaView>
        <FlatList
          data={savedTimes}
          renderItem={({item}) => (
            <SavedCard item={item}/>
          )}
        />
    </SafeAreaView>
  )
}