import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Color, FontSize, FontWeight } from '../contants'
import BorderItem from './BorderItem'

const ApprovalMatrixItem = (props) => {

  const {item, onClick} = props

  return (
    <TouchableOpacity
      style = {style_AMatrix_Item.parent}
      activeOpacity = {1}
      onPress = {onClick}
    >
      <View style = {style_AMatrix_Item.area}>
        <View style = {style_AMatrix_Item.view_in_area_left}>
          <Text style = {style_AMatrix_Item.text_area_left}>
            Rang Limite of Approval
          </Text>
        </View>
        <View style = {style_AMatrix_Item.view_in_area_right}>
          <View style = {style_AMatrix_Item.view_line_in_right}>
            <Text style = {style_AMatrix_Item.text_area_right}>
              Minimum
            </Text>
            <Text style = {{...style_AMatrix_Item.text_area_right, marginHorizontal: 5}}>
              IDR
            </Text>
            <Text style = {style_AMatrix_Item.last_text_in_right}>
              {item.min_Range}
            </Text>
          </View>
          <View style = {{...style_AMatrix_Item.view_line_in_right, marginTop: 10}}>
            <Text style = {style_AMatrix_Item.text_area_right}>
              Maximum
            </Text>
            <Text style = {{...style_AMatrix_Item.text_area_right, marginHorizontal: 5}}>
              IDR
            </Text>
            <Text style = {style_AMatrix_Item.last_text_in_right}>
              {item.max_Range}
            </Text>
          </View>
        </View>
      </View>
      <BorderItem
        styles = {{marginVertical: 10}}
      />
      <View style = {style_AMatrix_Item.area}>
        <Text style = {style_AMatrix_Item.text_area_left}>
          Number of Approval
        </Text>
        <Text style = {style_AMatrix_Item.last_text_in_right}>
          {item.approvals.length}
        </Text>
      </View>
      <BorderItem
        styles = {{marginVertical: 10}}
      />
      {item.approvals.map((approval, index) => (
        <View
          key = {approval.id}
          style = {{...style_AMatrix_Item.area, marginBottom: 10}}
        >
          <View style = {style_AMatrix_Item.view_in_area_left}>
            <Text style = {style_AMatrix_Item.text_area_left}>
              Approver {index + 1}
            </Text>
          </View>
          <View style = {style_AMatrix_Item.view_in_area_right}>
            <Text style = {style_AMatrix_Item.last_text_in_right}>
              {approval.name}
            </Text>
          </View>
        </View>
      ))}
    </TouchableOpacity>
  )
}

const style_AMatrix_Item = StyleSheet.create({
  parent: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.border_color,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 10
  },
  area: {
    flexDirection: 'row',
  },
  view_in_area_left: {
    flex: 1
  },
  text_area_left: {
    color: 'black',
    fontSize: FontSize.small,
    fontWeight: FontWeight.text
  },
  view_in_area_right: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 15
  },
  view_line_in_right:{
    flex: 1,
    flexDirection: 'row'
  },
  text_area_right: {
    color: Color.text_blue_color,
    fontSize: FontSize.small,
    fontWeight: FontWeight.text,
  },
  last_text_in_right: {
    color: Color.text_blue_color,
    fontSize: FontSize.small,
    fontWeight: FontWeight.bold,
    marginLeft: 5, 
    textAlign: 'right', 
    flex: 1
  },
})

export default ApprovalMatrixItem