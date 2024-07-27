import { View, Text, Platform, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import { useCart } from '../providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import Button from '../components/Button'
import CartListItem from '../components/CartListItem'

const CartScreen = () => {

  const {items, total} = useCart();

  useEffect(() => {

  },items)

  return (
    <View style={{padding: 10}}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {items.length > 0 ?
      <View>
        <FlatList data = {items} renderItem={({item}) => <CartListItem cartItem={item}/>} contentContainerStyle = {{gap: 10}}/>
        <Text style={{fontSize: 20, marginTop: 10}}>Total: {Math.round(total * 100) / 100}</Text>
        <Button text='Clear Cart' onPress={() => items.length = 0}></Button>
        <Button text='CheckOut' ><Text>Check Out </Text></Button>
      </View>
      :
      <View>
        <Text>Empty cart, go back and add some items</Text>
      </View> 
      }

    </View>
  )
}

export default CartScreen