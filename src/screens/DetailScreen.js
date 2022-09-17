import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BorderItem, ListFeatureChoice, LoadItem, ShowCBBItem, Toolbar } from '../components'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, CONTANTS, FontSize, FontWeight, Methods } from '../contants'
import { HEIGHT } from '../contants/Contants';

const DetailScreen = (props) => {

  //navigation
  const {navigation, route} = props
  //function of navigate to/back
  const {navigate, goBack} = navigation

  const item = route.params.item

  const [loading, setLoading] = useState(false)

  const [detailState, setDetailState] = useState({
    reload: false,
    showFeature: false,
    showApproval: false,
    list_feature: [
      {
        "id": "-1",
        "name": "Select Feature",
        "is_check": true
      },
    ],
    Approval_Matrix: (!item) ? {
      'alias': '',
      'min_Range': "",
      'max_Range': "",
      'feature_id': "-1",
      'approvals': [
      ]
    } : {...item},
    list_approval: [
      {
        "id": "-1",
        "name": "Select Approval",
        "is_check": true
      },
    ]
  })

  const delete_Matrix = async() => {
    setLoading(false)
    try {
      const resp_del_approval = await Methods.loadData(
        'http://tuanpc.pw/TuyenTest/api/matrix_approval/deleteByMatrixID.php',
        'DELETE', 
        {
          "id_matrix": detailState.Approval_Matrix.id,
        }
      )
      if(resp_del_approval.value == true){
        const resp_del_matrix = await Methods.loadData(
          'http://tuanpc.pw/TuyenTest/api/matrix/deleteMatrix.php',
          'DELETE', 
          {
            "id_matrix": detailState.Approval_Matrix.id,
          }
        )
        setLoading(false)
        if(resp_del_matrix.value == true){
          navigate('HomeScreen', {needload: true})
          alert('Delete Success!!')
        }
        else
          alert('Error, Try again!')
      }
      else{
        setLoading(false)
        alert('Error, Try again!')
      }
    } catch (error) {
      console.log("Delete: ", error)
      setLoading(false)
      alert('Error, Try again!')
    }
    
  }

  const add_or_update_btn = async() => {
    setLoading(true)
    try {
      if(!item){
        const resp_add = await Methods.loadData(
          'http://tuanpc.pw/TuyenTest/api/matrix/insertMatrix.php',
          'POST', 
          {
            "alias": detailState.Approval_Matrix.alias,
            "min_Range": detailState.Approval_Matrix.min_Range,
            "max_Range": detailState.Approval_Matrix.max_Range,
            "feature_id": detailState.Approval_Matrix.feature_id
          }
        )
        if(resp_add.value != -1) {
          let id_approval = ""
          detailState.list_approval.map((item) => {
            if(item.id != -1 && item.is_check){
              id_approval = id_approval + item.id + " "
            }
          })
          const resp_add_approval = await Methods.loadData(
            'http://tuanpc.pw/TuyenTest/api/matrix_approval/insertMatrix_Approval.php',
            'POST', 
            {
              "id_matrix": resp_add.value,
              "id_approval": id_approval
            }
          )
          setLoading(false)
          if(resp_add_approval.value == true)
            navigate('HomeScreen', {needload: true})
          else
            alert('Error, Try again!')
        }
      } else {
        const resp_update = await Methods.loadData(
          'http://tuanpc.pw/TuyenTest/api/matrix/updateMatrix.php',
          'PUT', 
          {
            "id": detailState.Approval_Matrix.id,
            "alias": detailState.Approval_Matrix.alias,
            "min_Range": detailState.Approval_Matrix.min_Range,
            "max_Range": detailState.Approval_Matrix.max_Range,
            "feature_id": detailState.Approval_Matrix.feature_id
          }
        )
        if(resp_update.value == true) {
          const resp_del_approval = await Methods.loadData(
            'http://tuanpc.pw/TuyenTest/api/matrix_approval/deleteByMatrixID.php',
            'DELETE', 
            {
              "id_matrix": detailState.Approval_Matrix.id,
            }
          )
          let id_approval = ""
          detailState.list_approval.map((item) => {
            if(item.id != -1 && item.is_check){
              id_approval = id_approval + item.id + " "
            }
          })
          console.log(id_approval)
          const resp_add_approval = await Methods.loadData(
            'http://tuanpc.pw/TuyenTest/api/matrix_approval/insertMatrix_Approval.php',
            'POST', 
            {
              "id_matrix": detailState.Approval_Matrix.id,
              "id_approval": id_approval
            }
          )
          setLoading(false)
          if(resp_add_approval.value == true)
            navigate('HomeScreen', {needload: true})
          else
            alert('Error, Try again!')
        }
      }
    } catch (error) {
      console.log('add or edit: ', error)
      alert('Error, Try again!')
      setLoading(false)
    }
  }

  const loadData_Detail = async(page, step, search_txt) => {
    const resp_feature_rs = await Methods.loadData(
      `http://tuanpc.pw/TuyenTest/api/feature/getAll.php?page=${page}&step=${step}&search_txt=${search_txt}`,
      'GET', {}
    )
    const resp_Approval_rs = await Methods.loadData(
      `http://tuanpc.pw/TuyenTest/api/approval/getAll.php?page=${page}&step=${step}&search_txt=${search_txt}`,
      'GET', {}
    )
    const resp_feature = [
      {
        "id": "-1",
        "name": "Select Feature",
        "is_check": true
      },
      ...resp_feature_rs
    ]
    const resp_Approval = [
      {
        "id": "-1",
        "name": "Select Approval",
        "is_check": true
      },
      ...resp_Approval_rs
    ]
    if(item) {
      resp_feature.map((temp) => {
        if(temp.id == -1) {
          temp.is_check = false
        }
        if(item.feature_id == temp.id)
          temp.is_check = true
      })
      item.approvals.map((approval) => {
        resp_Approval.map((temp) => {
          if(temp.id == -1) {
            temp.is_check = false
          }
          if(approval.id == temp.id)
            temp.is_check = true
        })
      })
    }
    setDetailState(prevState => ({
      ...prevState,
      reload: false,
      list_feature: resp_feature,
      list_approval: resp_Approval
    }))
  }

  useEffect(() => {
    loadData_Detail(1,10,'')
  }, [])

  const check_valid = () => {
    if(detailState.list_approval.filter((approval) => (approval.is_check && approval.id != -1)).length == 0)
      return false
    if(detailState.feature_id == -1)
      return false
    if(detailState.Approval_Matrix.alias.length == 0 ||
       detailState.Approval_Matrix.min_Range.length == 0 ||
       detailState.Approval_Matrix.max_Range.length == 0)
       return false
    if(isNaN(parseInt(detailState.Approval_Matrix.max_Range)))
      return false
    if(isNaN(parseInt(detailState.Approval_Matrix.max_Range)))
      return false
    return true
  }

  let check = check_valid()

  const setUp = () => {
    detailState.list_feature.map((temp) => {
      if(temp.id != -1) {
        temp.is_check = false
      } else {
        temp.is_check = true
      }
    })
    detailState.list_approval.map((temp) => {
      if(temp.id != -1) {
        temp.is_check = false
      } else {
        temp.is_check = true
      }
    })
    if(item) {
      detailState.list_feature.map((temp) => {
        if(temp.id == -1) {
          temp.is_check = false
        }
        if(item.feature_id == temp.id)
          temp.is_check = true
      })
      item.approvals.map((approval) => {
        detailState.list_approval.map((temp) => {
          if(temp.id == -1) {
            temp.is_check = false
          }
          if(approval.id == temp.id)
            temp.is_check = true
        })
      })
    }
  }

  const reset_Click = () => {
    setUp()
    setDetailState(prevState => ({
      ...prevState,
      Approval_Matrix: (!item) ? {
        'alias': '',
        'min_Range': "",
        'max_Range': "",
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
      } : {...item},
    }))
  }

  const onChangeFeatureCheckValue = (item) => {
    detailState.Approval_Matrix.feature_id = item.id
    detailState.list_feature.map((feature) => {
      if(feature.id === detailState.Approval_Matrix.feature_id){
        feature.is_check = true
      } else {
        feature.is_check = false
      }
    })
    detailState.list_feature.map((feature) => {
      if(feature.id == -1){
        feature.is_check = (detailState.list_feature.filter((feature) => (feature.is_check)).length == 0)
      }
    })
    setDetailState(prevState => ({
      ...prevState
    }))
  }

  const onChangeApprovalCheckValue = (item) => {
    detailState.list_approval.map((approval) => {
      if(approval.id === item.id){
        approval.is_check = !approval.is_check
      }
    })
    detailState.list_approval.map((approval) => {
      if(approval.id == -1){
        approval.is_check = (detailState.list_approval.filter((approval) => (approval.is_check)).length == 0)
      }
    })
  }

  return (
    <SafeAreaView style = {style_Detail_SCR.screen}>
      <Toolbar
        title = 'Approval Matrix'
        left_icon = 'arrow-back-circle'
        left_Press = {() => navigate('HomeScreen', {needload: false})}
        right_icon = {(!item) ? '' : 'trash'}
        right_Press = {delete_Matrix}
      />
      <View style = {style_Detail_SCR.content}>
        <Text style = {style_Detail_SCR.title}>
          {(!item) ? 'Create New Approval Matrix' : item.alias}
        </Text>
        <BorderItem
          styles = {{marginVertical: 20}}
        />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl = {
            <RefreshControl
              refreshing = {detailState.reload}
              onRefresh = {() => {
                setDetailState(prevState => ({
                  ...prevState,
                  reload: true,
                  list_feature: [
                    {
                      "id": "-1",
                      "name": "Select Feature",
                      "is_check": true
                    },
                  ],
                  list_approval: [
                    {
                      "id": "-1",
                      "name": "Select Approval",
                      "is_check": true
                    },
                  ],
                }))
                loadData_Detail(1,10,'')
              }}
            />
          }
        >
          <View style = {{...style_Detail_SCR.area, marginTop: 20}}>
            <Text style = {style_Detail_SCR.text_area}>
              Approval Matrix Alias 
            </Text>
            <TextInput
              placeholder = 'Input Matrix Name'
              placeholderTextColor = {Color.border_color}
              style = {style_Detail_SCR.text_input}
              value = {detailState.Approval_Matrix.alias}
              onChangeText = {(text) => setDetailState(prevState => ({
                ...prevState,
                Approval_Matrix: {
                  ...prevState.Approval_Matrix,
                  alias: text
                }
              }))}
            />
          </View>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: 'white'}}
          />
          <View style = {{...style_Detail_SCR.area, marginBottom: 20}}>
            <Text style = {style_Detail_SCR.text_area}>
              Feature
            </Text>
            <View 
              style = {style_Detail_SCR.choice_Feature}
            >
              <FlatList
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                style = {{flex: 1, marginRight: 10}}
                data = {detailState.list_feature.filter((temp) => (temp.is_check))}
                renderItem = {({item, index}) => {
                  return(
                    item.is_check && <ShowCBBItem
                      key = {item.id}
                      item = {item}
                      styles_parent = {{marginLeft: (item.id == -1 || index == 0) ? 0 : 10}}
                      styles_border = {{height: (item.id == -1) ? 0 : 30, backgroundColor: 'black'}}
                      styles_text = {{color: (item.id == -1) ? Color.border_color : 'black'}}
                      show_border = {(index != detailState.list_feature.filter((feature) => (feature.is_check)).length - 1)}
                      onClick = {() => setDetailState(prevState => ({...prevState, showFeature: !prevState.showFeature}))}
                    />
                  )
                }}
              />
              <Ionicons
                size = {15}
                name = {(detailState.showFeature) ? 'chevron-up-outline' : 'chevron-down-outline'}
                color = {Color.primary_color}
                // style = {{padding: 10,}}
                onPress = {() => setDetailState(prevState => ({...prevState, showFeature: !prevState.showFeature}))}
              />
            </View>
          </View>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: '#F4F5F7'}}
          />
          <View style = {style_Detail_SCR.area}>
            <Text style = {style_Detail_SCR.text_area}>
              Range of Approval (Minimum)
            </Text>
            <Text style = {style_Detail_SCR.text_IDR}>
              IDR
            </Text>
            <TextInput
              placeholder = 'Input Text Here'
              placeholderTextColor = {Color.border_color}
              style = {{...style_Detail_SCR.text_input, paddingLeft: 50}}
              value = {detailState.Approval_Matrix.min_Range}
              onChangeText = {(text) => setDetailState(prevState => ({
                ...prevState,
                Approval_Matrix: {
                  ...prevState.Approval_Matrix,
                  min_Range: text
                }
              }))}
            />
          </View>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: 'white'}}
          />
          <View style = {{...style_Detail_SCR.area, marginTop: 20}}>
            <Text style = {style_Detail_SCR.text_area}>
              Range of Approval (Maximum)
            </Text>
            <Text style = {style_Detail_SCR.text_IDR}>
              IDR
            </Text>
            <TextInput
              placeholder = 'Input Text Here'
              placeholderTextColor = {Color.border_color}
              style = {{...style_Detail_SCR.text_input, paddingLeft: 50}}
              value = {detailState.Approval_Matrix.max_Range}
              onChangeText = {(text) => setDetailState(prevState => ({
                ...prevState,
                Approval_Matrix: {
                  ...prevState.Approval_Matrix,
                  max_Range: text
                }
              }))}
            />
          </View>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: 'white'}}
          />
          <View style = {{...style_Detail_SCR.area, marginBottom: 30}}>
            <Text style = {style_Detail_SCR.text_area}>
              Approval - You choice {detailState.list_approval.filter((approval) => (approval.is_check && approval.id != -1)).length} Approvals
            </Text>
            <View 
              style = {style_Detail_SCR.choice_Feature}
            >
              <FlatList
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                style = {{flex: 1, marginRight: 10}}
                data = {detailState.list_approval.filter((temp) => (temp.is_check))}
                renderItem = {({item, index}) => {
                  return(
                    item.is_check && <ShowCBBItem
                      key = {item.id}
                      item = {item}
                      styles_parent = {{marginLeft: (item.id == -1 || index == 0) ? 0 : 10}}
                      styles_border = {{height: (item.id == -1) ? 0 : 30, backgroundColor: 'black'}}
                      styles_text = {{color: (item.id == -1) ? Color.border_color : 'black'}}
                      show_border = {(index != detailState.list_approval.filter((approval) => (approval.is_check)).length - 1)}
                      onClick = {() => setDetailState(prevState => ({...prevState, showApproval: !prevState.showApproval}))}
                    />
                  )
                }}
              />
              <Ionicons
                size = {15}
                name = {(detailState.showApproval) ? 'chevron-up-outline' : 'chevron-down-outline'}
                color = {Color.primary_color}
                onPress = {() => setDetailState(prevState => ({...prevState, showApproval: !prevState.showApproval}))}
              />
            </View>
          </View>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: 'white'}}
          />
          {
            !check && <Text style = {style_Detail_SCR.text_danger}>
              Infomation is not valid!!! Check again(Range of Approval must be integer number)
            </Text>
          }
          <TouchableOpacity
            disabled = {!check}
            style = {{...style_Detail_SCR.btn_view, backgroundColor: (check) ? '#171C8F' : '#F3F2F2'}}
            activeOpacity = {0.9}
            onPress = {add_or_update_btn}
          >
            <Text style = {{...style_Detail_SCR.btn_text, color: (check) ? 'white' : Color.border_color}}> 
              {(!item) ? 'ADD TO :LIST' : 'UPDATE'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {{
              ...style_Detail_SCR.btn_view, 
              backgroundColor: 'white',
              borderWidth: 1 ,
              borderColor: Color.text_blue_color,
              marginTop: 10,
            }}
            activeOpacity = {0.9}
            onPress = {reset_Click}
          >
            <Text style = {{...style_Detail_SCR.btn_text, color: Color.text_blue_color }}> 
              RESET
            </Text>
          </TouchableOpacity>
          <BorderItem
            styles = {{marginVertical: 20, backgroundColor: 'white'}}
          />
        </ScrollView>
      </View>
      {detailState.showFeature && 
        <ListFeatureChoice
          listFeature = {detailState.list_feature.filter((feature) => (feature.id != -1))}
          styles = {style_Detail_SCR.list_feature_choice}
          onExitPress = {() => setDetailState(prevState => ({...prevState, showFeature: false}))}
          onChangeCheckValue = {onChangeFeatureCheckValue}
        />
      }
      {detailState.showApproval && 
        <ListFeatureChoice
          listFeature = {detailState.list_approval.filter((approval) => (approval.id != -1))}
          styles = {style_Detail_SCR.list_feature_choice}
          onExitPress = {() => setDetailState(prevState => ({...prevState, showApproval: false}))}
          onChangeCheckValue = {onChangeApprovalCheckValue}
        />
      }
      {loading && 
      <LoadItem
        styles = {{position: 'absolute', top: 0, left: 0}}
      />}
    </SafeAreaView>
  )
}

const style_Detail_SCR = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    color: Color.primary_color,
    fontSize: FontSize.big,
    fontWeight: FontWeight.bold + 200,
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: 20
  },
  area: {
  },
  text_area: {
    color: 'black',
    fontSize: FontSize.medium,
    fontWeight: FontWeight.text
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.border_color,
    marginTop: 8,
    fontSize: FontSize.medium,
    fontWeight: FontWeight.text,
    height: 48,
    color: 'black'
  },
  choice_Feature: {
    marginTop: 20,
    width: (CONTANTS.WIDTH - 60),
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.border_color,
    paddingHorizontal: 20, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_feature_choice: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  text_IDR: {
    color: 'black',
    fontSize: FontSize.medium,
    fontWeight: FontWeight.text,
    position: 'absolute',
    bottom: 14,
    left: 20
  },
  btn_view:{
    height: 56,
    width: CONTANTS.WIDTH - 60,
    borderRadius: 15,
    justifyContent: 'center'
  },
  btn_text: {
    marginHorizontal: 20,
    textAlign: 'center'
  },
  text_danger: {
    color: 'red',
    fontSize: FontSize.small,
    fontWeight: FontWeight.text,
    textAlign: 'center'
  }
})

export default DetailScreen