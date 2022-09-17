import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Color, CONTANTS, FontSize, FontWeight } from '../contants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatureChoiceItem from './FeatureChoiceItem';

const ListFeatureChoice = (props) => {

  const {styles, onExitPress, listFeature, onChangeCheckValue} = props

  const [searchText, setSearchText] = useState('')

  return (
    <TouchableOpacity
     style = {{...style_listFT.parent, ...styles}}
     activeOpacity = {1}
     onPress = {onExitPress}
    >
      <TouchableOpacity 
        style = {style_listFT.list_choice}
        activeOpacity = {1}
        onPress = {() => {}}
      >
        <View>
          <Text style = {style_listFT.title}>
            Select Feature
          </Text>
          <Ionicons
            size = {25}
            color = {'#444444'}
            name = {'close-circle'}
            style = {style_listFT.icon_exit}
            onPress = {onExitPress}
          />
        </View>
        <View style = {style_listFT.search_view}>
          <Ionicons
            style={{position:'absolute', top:10, left:10, height:30, width:30, tintColor:'black'}}
            name = {'search-outline'}
            color = {'#171C8F'}
            size = {27}
          />
          <TextInput
            placeholder='Search Keywords'
            style={style_listFT.search_input}
            autoCorrect={false}
            onChangeText = {(text) => setSearchText(text)}
            placeholderTextColor = {Color.border_color}
            value={searchText}
          />
        </View>
        <FlatList
          style = {{marginTop: 10}}
          data = {listFeature.filter((item) => (item.name.toLowerCase().includes(searchText.toLowerCase())))}
          showsHorizontalScrollIndicator = {false}
          renderItem = {({item, index}) => (
            <FeatureChoiceItem
              key = {item.id}
              item = {item}
              onChangeCheckValue = {() => onChangeCheckValue(item)}
            />
          )}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const style_listFT = StyleSheet.create({
  parent: {
    height: CONTANTS.HEIGHT,
    width: CONTANTS.WIDTH,
    backgroundColor: 'rgba(0 , 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  list_choice: {
    width: CONTANTS.WIDTH,
    height: 586/815*CONTANTS.HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30
  },
  title: {
    fontSize: FontSize.medium,
    fontWeight: FontWeight.bold,
    color: 'black',
    textAlign:'center',
    marginTop: 12
  },
  icon_exit: {
    position: 'absolute',
    top: 10,
    right: 0
  },
  search_view:{
    height:48,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 25
  },
  search_input:{
    height:40,
    flex:1,
    borderRadius:8,
    padding:5,
    opacity:0.8,
    paddingStart:40,
    color:'black',
    fontSize: FontSize.medium,
    borderWidth: 1,
    borderColor: Color.border_color,
    marginHorizontal: 5
  }
})

export default ListFeatureChoice