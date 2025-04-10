import React from 'react';
import { View, Text } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface SwipeWrapperProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeWrapper = ({ children, onSwipeLeft, onSwipeRight }: SwipeWrapperProps) => {
  const panGesture = Gesture.Pan().onEnd(event => {
    if (event.translationX < -50) {
      runOnJS(onSwipeLeft)(); // Ir al día siguiente
    } else if (event.translationX > 50) {
      runOnJS(onSwipeRight)(); // Ir al día anterior
    }
  });

  return (
    <GestureHandlerRootView className="flex-1">
      <GestureDetector gesture={panGesture}>
        <View className="flex-1">{children}</View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SwipeWrapper;
