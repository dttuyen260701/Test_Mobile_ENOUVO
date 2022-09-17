import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color, FontSize, FontWeight } from '../contants'

const ShowCBBItem = (props) => {

  const {item, show_border, onClick, styles_parent, styles_border, styles_text} = props

  return (
    <TouchableOpacity 
      style = {{...style_Cbb_Item.parent, ...styles_parent}}
      activeOpacity = {0.9}
      onPress = {onClick}
    >
      <Text style = {{...style_Cbb_Item.name_item, ...styles_text}}>
        {item.name}
      </Text>
      {show_border && <View
        style = {{width: 1, height: 40, backgroundColor: Color.primary_color, marginLeft: 10, ...styles_border}}
      />}
    </TouchableOpacity>
  )
}

const style_Cbb_Item = StyleSheet.create({
  parent: {
    marginLeft: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name_item: {
    fontSize: FontSize.medium,
    fontWeight: FontWeight.text,
    color: Color.primary_color,
  }
})

export default ShowCBBItem