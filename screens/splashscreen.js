import { Animated, StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../assets/icons/Logo.png'
import { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';


export default function splashscreen() {

    const edges = useSafeAreaInsets();

    const startAnimation = useRef(new Animated.Value(0)).current;

    const scaleLogo = useRef(new Animated.Value(0)).current;
    const scaleTitle = useRef(new Animated.Value(0)).current;

    const moveLogo = useRef(new Animated.ValueXY({x:0, y:0})).current;
    const moveTitle = useRef(new Animated.ValueXY({x:0, y:0})).current;

    useEffect(()=> {
        setTimeout(()=> {
            Animated.parallel([
                Animated.timing(
                    startAnimation, {
                    toValue: -Dimensions.get('window').height + (edges.top + 65),
                    useNativeDriver: true
                    }
                ),

                Animated.timing(
                    scaleLogo, {
                    toValue: 0.35,
                    useNativeDriver: true
                    }
                ),

                Animated.timing(
                    scaleTitle, {
                    toValue: 0.8,
                    useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo, {
                    toValue: {
                        x: (Dimensions.get('window').width / 2) - 35,
                        y: (Dimensions.get('window').height / 2) - 5
                    },
                    useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle, {
                    toValue: {
                        x: 0,
                        y: (Dimensions.get('window').height / 2) - 125
                    },
                    useNativeDriver: true
                    }
                )
            ])
        .start();
    },500);
},[])

  return (
    <Animated.View style={{position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "#C90013",
                            transform: [{translateY: startAnimation}]
    }}>
        <Animated.View style={styles.location}>
            <Animated.Image source={Logo} 
            style={{width: 150,
                height: 190,
                marginBottom: 20,
                transform: [{translateX: moveLogo.x},
                    {translateY: moveLogo.y},
                    { scale: scaleLogo}
                        ]
                }}>

            </Animated.Image>

            <Animated.Text 
            style={{fontSize: 28,
                fontWeight: 'bold',
                color: '#fff',
                transform: [{translateY: moveTitle.y},
                    { scale: scaleTitle}]}}>IAAM</Animated.Text>
            <Text style={styles.secondaryTextStyle}>Popcorn up!</Text>
        </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  
    location: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    secondaryTextStyle: {
        fontSize: 18,
        //fontFamily:'Helvetica',
        fontStyle: 'italic',
        color: '#fff',
    }
})
