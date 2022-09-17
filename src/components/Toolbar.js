import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, FontSize, FontWeight } from '../contants';

const Toolbar = (props) => {
  const {title, left_icon, right_icon, left_Press, right_Press} = props
  return (
    <View style = {style_Toolbar.toolbar}>
     {left_icon && <Ionicons
        name={left_icon}
        size={33}
        onPress = {left_Press}
        color = 'white'
        style = {{
          ...style_Toolbar.icon,
          left: 15
        }}
      />}
      <Text
        style = {style_Toolbar.tittle}
        numberOfLines={1}
      >
        {title}
      </Text>
     {right_icon && <Ionicons
        name={right_icon}
        size={33}
        onPress = {right_Press}
        color = 'white'
        style = {{
          ...style_Toolbar.icon,
          right: 15
        }}
      />}
    </View>
  )
}

const style_Toolbar = StyleSheet.create({
  toolbar:{
    height: 55,
    backgroundColor: Color.primary_color,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
    padding: 5,
    position: 'absolute',
  },
  tittle:{
    flex: 1,
    textAlign:'center',
    fontSize: FontSize.title,
    fontWeight: FontWeight.text,
    color: 'white',
    marginHorizontal: 40,
  }
})

export default Toolbar