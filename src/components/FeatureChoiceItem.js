import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Color, CONTANTS, FontSize, FontWeight } from '../contants'
import CheckBox from '@react-native-community/checkbox';

const FeatureChoiceItem = (props) => {

  const {item, onChangeCheckValue} = props

  const [reload, setReload] = useState(item.is_check)

  return (
    <TouchableOpacity 
      style = {style_FTChoice_Item.parent}
      activeOpacity = {1}
      onPress = {() => {
        onChangeCheckValue()
        setReload(!reload)
      }}
    >
      <Text
        style = {style_FTChoice_Item.name}
        numberOfLines = {1}
      >
        {item.name}
      </Text>
      <CheckBox
        disabled = {false}
        value = {item.is_check}
        onValueChange={() => {
          onChangeCheckValue()
          setReload(!reload)
        }}
        tintColors = {Color.border_color}
        tintColor = {Color.border_color}
      />
    </TouchableOpacity>
  )
}

const style_FTChoice_Item = StyleSheet.create({
  parent: {
    height: 48,
    width: CONTANTS.WIDTH - 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: 'black',
    fontWeight: FontWeight.text,
    FontSize: FontSize.medium,
    flex: 1
  }, 
})

export default FeatureChoiceItem