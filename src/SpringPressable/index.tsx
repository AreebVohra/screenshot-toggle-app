import React, { FC, useRef } from 'react';
import { View, Pressable, Text, Animated, Image, StyleSheet, ActivityIndicator } from 'react-native';

type SpringPressableProps = {
  loading: boolean;
  isActivate: boolean;
  onPress(): void;
};

const SpringPressable: FC<SpringPressableProps> = ({ loading, isActivate, onPress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();

    onPress();
  };

  const animatedStyle = { transform: [{ scale: scaleValue }] };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.buttonStyle, { backgroundColor: !isActivate ? '#4B22EB' : '#36D66B', }]}
        >
          <View>
            {
              loading
                ? (<ActivityIndicator style={{ paddingRight: 5 }} color={'#ffffff'} />)
                : (
                  <View>
                    <Image style={[styles.imageStyle, { display: !isActivate ? 'flex' : 'none' }]} tintColor={'#ffffff'} source={require('../assets/circle_arrowup.png')} />
                    <Image style={[styles.imageStyle, { display: isActivate ? 'flex' : 'none' }]} tintColor={'#ffffff'} source={require('../assets/circle_check.png')} />
                  </View>
                )
            }
          </View>
          <Text style={styles.buttonText}>
            {loading ? 'Waiting' : !isActivate ? 'Activate' : 'Activated'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default SpringPressable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 130,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingLeft: 6,
  },
  imageStyle: {
    width: 22,
    height: 22,
  },
});
