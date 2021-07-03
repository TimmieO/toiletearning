import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import globalStyles from "../style/styles";

export default function Header() {
  return (
    <View style={globalStyles.headerBox}>
      <Text style={globalStyles.headerText}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({



});
