import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function () {

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/static/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/static/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../assets/fonts/static/Montserrat-Bold.ttf'),
    'NotoSerifSC-Regular': require('../assets/fonts/NotoSerifSC-Regular.otf')
  });
  const [modalVisible, setModalVisible] = useState<Boolean>(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (<Tabs screenOptions={{ tabBarActiveTintColor: '#40DF9F', tabBarShowLabel: false, tabBarStyle: {backgroundColor: '#1A282F', borderTopColor: '#22343C'}  }} onLayout={onLayoutRootView} >
    <Tabs.Screen
      name="index"
      options={{
        headerShown: false
      }}
    />
    <Tabs.Screen
      name="home"
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={30} color={color} />,
      }}
    />
    <Tabs.Screen
      name="practice"
      options={{
        title: "Praticar",
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-blank-variant" size={30} color={color} />,
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialIcons name="search" size={30} color={color} />,
      }}
    />
  </Tabs>

  )
}

