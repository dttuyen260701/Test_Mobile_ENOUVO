import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { CONTANTS } from '../contants'

const LoadItem = (props) => {

  const {styles} = props

  return (
    <SafeAreaView 
      style = {{
        ...style_loadItem.parent,
        ...styles
      }}
    >
      <ActivityIndicator 
        style={{flex:1}}
        size={'large'}
      />
    </SafeAreaView>
  )
}

const style_loadItem = StyleSheet.create({
  parent:{
    height: CONTANTS.HEIGHT,
    width: CONTANTS.WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
  }
})

export default LoadItem