import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, CONTANTS, FontSize, FontWeight} from '../contants'
import {ApprovalMatrixItem, BorderItem, ListFeatureChoice, ShowCBBItem, Toolbar} from '../components'

const HomeScreen = (props) => {

  const [homeState, setHomeState] = useState({
    showFeature: false,
    list_feature: [
      {
        "id": "-1",
        "name": "Default",
        "is_check": true
      },
      {
        "id": "0",
        "name": "Transfer Online",
        "is_check": false
      },
      {
        "id": "1",
        "name": "Feature A",
        "is_check": false
      },
      {
        "id": "2",
        "name": "Feature B",
        "is_check": false
      },
      {
        "id": "3",
        "name": "Feature C",
        "is_check": false
      },
      {
        "id": "4",
        "name": "Feature D",
        "is_check": false
      },
    ],
    list_Approval_Matrix: [
      {
        'id': "1",
        'alias': 'Transfer Online',
        'feature_id': "2",
        'min_Range': "50000",
        'max_Range': "100000",
        'approvals': [
          {
            'id': "1",
            'name': "GROUPMG1, GROUPMG2"
          },
          {
            'id': "2",
            'name': "GROUPMG1, GROUPMG3"
          },
        ]
      },
      {
        'id': "2",
        'alias': 'Transfer Offline',
        'feature_id': "1",
        'min_Range': "0",
        'max_Range': "50000",
        'approvals': [
          {
            'id': "3",
            'name': "GROUPMG1, GROUPMG5, GROUPMGCROSS"
          },
        ]
      }
    ],
  })

  //navigation
  const {navigation, route} = props
  //function of navigate to/back
  const {navigate, goBack} = navigation

  let count = 0

  const onChangeCheckValue = (item) => {
    homeState.list_feature.map((feature) => {
      if(feature.id === item.id){
        feature.is_check = !feature.is_check
      }
    })
  }

  return (
    <SafeAreaView style = {style_Home_SCR.screen}>
      <Toolbar
        title = 'Approval Matrix'
      />
      <View style = {style_Home_SCR.content}>
        <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style = {style_Home_SCR.add_btn}
            activeOpacity = {0.9}
            onPress = {() => navigate('DetailScreen', {item: false})}
          >
            <Ionicons
              size = {20}
              color = {'white'}
              name = {'add-circle'}
            />
            <Text style={style_Home_SCR.btn_text}>
              Tambah New Matrix
            </Text>
          </TouchableOpacity>
        </View>
        <BorderItem
          styles = {{marginTop: 20, backgroundColor: '#F4F5F7'}}
        />
        <View 
          style = {style_Home_SCR.choice_Feature}
        >
          <FlatList
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            style = {{flex: 1, marginRight: 10}}
            data = {homeState.list_feature}
            renderItem = {({item}) => {
              count =  item.is_check ? count + 1 : count
              return (
                item.is_check && <ShowCBBItem
                  key = {item.id}
                  item = {item}
                  show_border = {(count != homeState.list_feature.filter((feature) => (feature.is_check)).length)}
                  onClick = {() => setHomeState(prevState => ({...prevState, showFeature: !prevState.showFeature}))}
                />
              )
            }}
          />
          <Ionicons
            size = {15}
            name = {(homeState.showFeature) ? 'chevron-up-outline' : 'chevron-down-outline'}
            color = {Color.primary_color}
            // style = {{padding: 10,}}
            onPress = {() => setHomeState(prevState => ({...prevState, showFeature: !prevState.showFeature}))}
          />
        </View>
        <FlatList
          style = {{marginTop: 20}}
          data = {homeState.list_Approval_Matrix}
          renderItem = {({item, index}) => (
            <ApprovalMatrixItem
              key = {item.id}
              item = {item}
              onClick = {() => navigate('DetailScreen', {item: item})}
            />
          )}
        />
      </View>
      {homeState.showFeature && 
        <ListFeatureChoice
          listFeature = {homeState.list_feature}
          styles = {style_Home_SCR.list_feature_choice}
          onExitPress = {() => setHomeState(prevState => ({...prevState, showFeature: false}))}
          onChangeCheckValue = {onChangeCheckValue}
        />
      }
    </SafeAreaView>
  )
}
const style_Home_SCR = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.primary_color
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 24
  },
  add_btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.text_blue_color,
    height: 30,
    width: (CONTANTS.WIDTH - 60) / 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    fontWeight: '400',
    fontSize: FontSize.btn_add,
    color: 'white',
    marginStart: 10,
    fontWeight: FontWeight.text
  },
  choice_Feature: {
    marginTop: 20,
    width: (CONTANTS.WIDTH - 60),
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary_color,
    paddingHorizontal: 20, 
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_feature_choice: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export default HomeScreen