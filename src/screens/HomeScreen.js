import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, CONTANTS, FontSize, FontWeight, Methods} from '../contants'
import {ApprovalMatrixItem, BorderItem, ListFeatureChoice, ShowCBBItem, Toolbar} from '../components'

const HomeScreen = (props) => {

  const [homeState, setHomeState] = useState({
    reload: false,
    showFeature: false,
    list_feature: [
      {
        "id": "-1",
        "name": "Default",
        "is_check": true
      },
    ],
    list_Approval_Matrix: [],
  })

  //navigation
  const {navigation, route} = props
  //function of navigate to/back
  const {navigate, goBack} = navigation

  const needload = route.params.needload

  const loadMaTrixByFeature = async(page, step, search_txt) => {
    let feature_id = ""
    homeState.list_feature.map((item) => {
      if(item.id != -1 && item.is_check){
        feature_id = feature_id + item.id + " "
      }
    })
    const resp_Matrix_ft = await Methods.loadData(
      `http://tuanpc.pw/TuyenTest/api/matrix/getByFeatureId.php?page=${page}&step=${step}&search_txt=${search_txt}&feature_id=${feature_id}`,
      'GET', {}
    )
    setHomeState(prevState => ({
      ...prevState,
      list_Approval_Matrix: resp_Matrix_ft
    }))
  }

  const loadData_Home = async(page, step, search_txt) => {
    const resp_feature = await Methods.loadData(
      `http://tuanpc.pw/TuyenTest/api/feature/getAll.php?page=${page}&step=${step}&search_txt=${search_txt}`,
      'GET', {}
    )
    const resp_Matrix = await Methods.loadData(
      `http://tuanpc.pw/TuyenTest/api/matrix/getAll.php?page=${page}&step=${step}&search_txt=${search_txt}`,
      'GET', {}
    )
    
    setHomeState({
      reload: false,
      showFeature: false,
      list_feature: [
        {
          "id": "-1",
          "name": "Default",
          "is_check": true
        },
        ...resp_feature
      ],
      list_Approval_Matrix: resp_Matrix
    })
  }

  if(needload){
    loadData_Home(1,10,'')
  }

  useEffect(() => {
    loadData_Home(1,10,'')
  }, [])

  const onChangeCheckValue = (item) => {
    homeState.list_feature.map((feature) => {
      if(feature.id === item.id){
        feature.is_check = !feature.is_check
      }
    })
    homeState.list_feature.map((feature) => {
      if(feature.id == -1){
        feature.is_check = (homeState.list_feature.filter((feature) => (feature.is_check)).length == 0)
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
            data = {homeState.list_feature.filter((feature) => (feature.is_check))}
            renderItem = {({item, index}) => {
              return (
                item.is_check && <ShowCBBItem
                  key = {item.id}
                  item = {item}
                  show_border = {(index != homeState.list_feature.filter((feature) => (feature.is_check)).length - 1)}
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
          refreshControl = {
            <RefreshControl
              refreshing = {homeState.reload}
              onRefresh = {() => {
                setHomeState({
                  reload: true,
                  showFeature: false,
                  list_feature: [
                    {
                      "id": "-1",
                      "name": "Default",
                      "is_check": true
                    },
                  ],
                  list_Approval_Matrix: [],
                })
                loadData_Home(1,10,'')
              }}
            />
          }
        />
      </View>
      {homeState.showFeature && 
        <ListFeatureChoice
          listFeature = {homeState.list_feature.filter((feature) => (feature.id != -1))}
          styles = {style_Home_SCR.list_feature_choice}
          onExitPress = {() => {
            setHomeState(prevState => ({...prevState, showFeature: false}))
            loadMaTrixByFeature(1,50,'')
          }}
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