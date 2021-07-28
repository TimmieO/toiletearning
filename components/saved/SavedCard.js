import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'

export default function SavedCard({item}) {

  return (
    <TouchableOpacity style={[styles.item, {backgroundColor: item.bgColor}]} key={item['id']}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.savedCard]}>
          <View>
            <Text style={styles.itemText}>$ {JSON.stringify(item.moneySaved)}</Text>
          </View>
          <View>
            <Text style={styles.itemText}>{item.time} s</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item:{
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  taskOptionIcon:{
    fontSize: 20,
  },
  savedCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});