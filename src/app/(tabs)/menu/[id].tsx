import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, {useState} from "react";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import Button from '@components/Button'
import products from "@/assets/data/products";

const productDetails = () => {

  const [selectedSize, setSelectSize] = useState('');
  const sizes = ["S", "M", "L", "XL"];

  const defaultPizzaImage =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

  const { id } = useLocalSearchParams();
  const currentProduct = products.find((item) => item.id.toString() === id);

  const addToCart = () => {
    console.warn("Adding", selectedSize)
  }

  if (!currentProduct) return <Text>Product not found </Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: currentProduct?.name }} />
      <Image
        source={{ uri: currentProduct.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}> Choose size </Text>

      <View style={styles.sizeRow}>
        {sizes.map((item) => 
          <Pressable key={item} onPress={() => setSelectSize(item)} style={[styles.sizeItem, {backgroundColor: selectedSize === item ? "gold" : "white"}]}>
            <Text style={[styles.sizeText, {color: selectedSize === item ? "black" : "gray"}]}>{item}</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.price}>${currentProduct.price} </Text>
      <Button text="Add to card" onPress={addToCart} />
    </View>
  );
};

export default productDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 20,
    alignItems: "center",
  },

  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },

  sizeItem: {
    alignItems: "center",
    backgroundColor: "cyan",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center"
  },

  sizeText: {
    fontSize: 18,
    fontWeight: 500
  }
});
