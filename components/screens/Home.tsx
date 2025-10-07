import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationProp } from '@react-navigation/native';

interface Home {
    navigation: NavigationProp<any>;
}

const Home: React.FC<Home> = ({ navigation }) => {

    const [products, setProducts] = React.useState([]);
    const [accessory, setAccessory] = React.useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    // Lấy dữ liệu từ database
    const getDataFromDB = () => {
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category === 'product') {
                productList.push(Items[index]);
            } else if (Items[index].category === 'accessory') {
                accessoryList.push(Items[index]);
            }
        }

        setProducts(productList);
        setAccessory(accessoryList);
    };

    // Tạo một sản phẩm

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('ProductInfo', {
                    productID: data.id,
                });
            }}
                style={{
                    width: '48%',
                    marginVertical: 14,
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: COLOURS.backgroudLight,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: 8,
                    }}>
                    {
                        data.isOff ? (
                            <View style={{
                                position: 'absolute',
                                width: '20%',
                                height: '24%',
                                backgroundColor: COLOURS.green,
                                top: 0,
                                left: 0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: COLOURS.white,
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                }}>{data.offPercentage} %</Text>
                            </View>
                        ) : null}
                    <Image source={data.productImage} style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }} />
                </View>
                <Text style={{
                    fontSize: 12,
                    color: COLOURS.black,
                    fontWeight: '600',
                    marginBottom: 2,
                }}>{data.productName}
                </Text>
                {data.category == 'accessory' ? (data.isAvailable ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',  
                    }}>
                        <FontAwesome name="circle" style={{
                            fontSize: 12,
                            marginRight:6,
                            color: COLOURS.green,
                        }} />
                        <Text style={{
                            fontSize: 12,
                            color: COLOURS.green,
                            fontWeight: '400',
                        }}>Available
                        </Text>
                    </View>
                ):(
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <FontAwesome name="circle" style={{
                            fontSize: 12,
                            marginRight:6,
                            color: COLOURS.red,
                        }} />
                        <Text style={{
                            fontSize: 12,
                            color: COLOURS.red,
                            fontWeight: '400',
                        }}>Unavailable
                        </Text>
                    </View>
                )) : null}
                <Text>
                    {data.productPrice} $
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
        }}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 16,
                    paddingTop: 50,
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <MaterialCommunityIcons name="account-circle" style={{
                            fontSize: 18,
                            color: COLOURS.backgroudMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroudLight,
                        }} />
                        {/* <Entypo name="shopping-bag" style={{
                            fontSize: 18,
                            color: COLOURS.backgroudMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroudLight,
                        }} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        <MaterialCommunityIcons name="cart" style={{
                            fontSize: 18,
                            color: COLOURS.backgroudMedium,
                            padding: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: COLOURS.backgroudLight,
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginBottom: 16,
                    padding: 16,
                }}>
                    <Text style={{
                        fontSize: 26,
                        color: COLOURS.black,
                        fontWeight: '500',
                        // fontWeight: '400',
                        marginBottom: 10,
                    }}>AKA Digital Shop &amp; Service
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLOURS.black,
                        fontWeight: '400',
                        letterSpacing: 1,
                        lineHeight: 24,
                    }}>Shop the best quality products
                        {'\n'}and services for your Hi-Fi system
                    </Text>
                </View>
                <View style={{
                        padding: 16,
                    }}>
                    <View style={{
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: COLOURS.black,
                                fontWeight: '500',
                                letterSpacing: 1,
                            }}>Products
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: COLOURS.black,
                                fontWeight: '400',
                                opacity: 0.5,
                                marginLeft: 10,
                            }}>41
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.blue,
                            fontWeight: '400',
                        }}>
                            See All
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}>
                        {
                            products.map((data) => {
                                return <ProductCard data={data} key={data.id} />
                            })
                        }

                    </View>

                    <View style={{
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: COLOURS.black,
                                fontWeight: '500',
                                letterSpacing: 1,
                            }}>Accessory
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: COLOURS.black,
                                fontWeight: '400',
                                opacity: 0.5,
                                marginLeft: 10,
                            }}>78
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.blue,
                            fontWeight: '400',
                        }}>
                            See All
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}>
                        {
                            accessory.map((data) => {
                                return <ProductCard data={data} key={data.id} />
                            })
                        }

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
