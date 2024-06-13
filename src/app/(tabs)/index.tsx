import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import products from '@/assets/data/products';

const ProductListItem = ({product}) => {
  
  return (
    <View style={styles.container}>
    <Image source = {{uri: product.image}} style={styles.image}/>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.title}>{product.price}</Text>
  </View>
  )
}

export default function MenuScreen() {
  return (
   <ScrollView>
    <ProductListItem product={products[0]}/>
    <ProductListItem  product={products[1]}/>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },

  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  },

  image : {
    width: '100%',
    aspectRatio: 1
  }
  
});
