import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const productDetails = () => {
  const {id} = useLocalSearchParams();

  return (
    <View>
      <Text>productDetails {id}</Text>
    </View>
  )
}

export default productDetails