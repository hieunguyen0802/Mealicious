import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button, {ButtonSecondary} from "@/src/components/Button";
import { defaultPizzaImage } from "@components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const {id} = useLocalSearchParams();

  const isUpdated = !!id

  const [productImage, setProductImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };


  const onSubmit = () => {
    if(isUpdated) onUpdate()
    onCreate()

  }

  const onCreate = () => {
    console.warn(price, name);
    resetFields();
  };

  const onUpdate = () => {
    console.warn("updated",price, name);
    resetFields();
  };

  const onDelete = () => {
    console.warn("deleted !!!!!!!!")
  }

  const handleDelete = () => {
    Alert.alert('Hang on', 'Are you sure want to delete this product ?', [
      {
        text: 'Cancel'
      },
      { 
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete
      }
    ])
  }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdated ? "Update Product" : "Create Product",
        }}
      />
        <Image
          source={{ uri: productImage || defaultPizzaImage }}
          style={styles.image}
        />
        <Text onPress={pickImage} style={styles.imageText}>
          {" "}
          Select Image
        </Text>

        <Text style={styles.label}> Product name</Text>
        <TextInput
          style={styles.input}
          placeholder="product name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}> Price ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="9.99"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Button text= {isUpdated ? "Update" : "Create"} onPress={onSubmit} />
        {isUpdated &&  <ButtonSecondary text="Delete" onPress={handleDelete}/>}
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },

  label: {
    color: "gray",
    fontSize: 16,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 5,
  },

  imageText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },

  deleteButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    
  },
});
