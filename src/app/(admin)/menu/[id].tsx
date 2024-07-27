import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, {useState} from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import Button from '@components/Button'
import products from "@/assets/data/products";
import { useCart } from "@/src/providers/CartProvider"; 
import { PizzaSize } from "@/src/types";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";


const ProductDetails = () => {

  const {onAddItem} = useCart()

  const [selectedSize, setSelectSize] = useState<PizzaSize>("");
  
  const sizes:PizzaSize[] = ["S", "M", "L", "XL"];


  const defaultPizzaImage =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

  const { id } = useLocalSearchParams();
  const currentProduct = products.find((item) => item.id.toString() === id);

  const addToCart = () => {
    if (!currentProduct) return;

    onAddItem(currentProduct, selectedSize)
    router.push("/cart")

  }

  if (!currentProduct) return <Text>Product not found </Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: currentProduct?.name,
        headerRight: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),


       }} />
      <Image
        source={{ uri: currentProduct.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}> {currentProduct.name} </Text>
      <Text style={styles.price}> {currentProduct.price} </Text>

      <Button text="Save changes" onPress={() => console.log("first")}/>
    </View>
  );
};

export default ProductDetails;

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
