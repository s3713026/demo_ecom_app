import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; // Adjusted the path to the correct location

type MyCartNavigationProp = StackNavigationProp<RootStackParamList, 'MyCart'>;

const MyCart = ({ navigation }: { navigation: MyCartNavigationProp }) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  // Get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          // Add quantity to product data
          const existingProduct = productData.find(p => p.id === data.id);
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            productData.push({ ...data, quantity: 1 });
          }
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  // Get total price of all items in the cart
  const getTotal = (productData) => {
    let totalAmount = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      totalAmount += productPrice * productData[index].quantity;
    }
    setTotal(totalAmount);
  };

  // Remove data from Cart
  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray.filter(item => item !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };

  // Checkout
  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be delivered SOON!', ToastAndroid.SHORT);
    navigation.navigate('Home');
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedProducts = product.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setProduct(updatedProducts);
    getTotal(updatedProducts);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedProducts = product.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setProduct(updatedProducts);
    getTotal(updatedProducts);
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.key}
        onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroudLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  marginRight: 4,
                }}>
                {data.productPrice}$
              </Text>
              <Text>
                (
                {(data.productPrice + data.productPrice / 20).toFixed(2)}$)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroudMedium,
                  opacity: 0.5,
                }}
                onPress={() => decreaseQuantity(data.id)}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroudDark,
                  }}
                />
              </TouchableOpacity>
              <Text>{data.quantity}</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroudMedium,
                  opacity: 0.5,
                }}
                onPress={() => increaseQuantity(data.id)}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroudDark,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroudDark,
                  backgroundColor: COLOURS.backgroudLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
        paddingTop: 40,
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroudDark,
                padding: 12,
                backgroundColor: COLOURS.backgroudLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              paddingRight: 20,
            }}>
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: '500',
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          My Cart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product.map(renderProducts)}
        </View>
        {/* Order Info and Checkout Section */}
        {/* Same as your existing checkout section */}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (total !== 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            CHECKOUT ({(total + total / 20).toFixed(2)} $)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;
