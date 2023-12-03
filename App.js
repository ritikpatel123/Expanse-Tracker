import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpences from './screens/AllExpenses';
import {Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import ManageExpanses from './screens/ManageExpanses';
import RecentExpenses from './screens/RecentExpenses'
import IconButtons from './Component/UI/IconButtons';
import ExpenseContextProvider from './store/expanses-context'

const bottomTab=createBottomTabNavigator();
const Stack =createNativeStackNavigator();
import { GlobalStyles } from './constants/styles';
export default function App() {
  const BottomTab=()=>{
    return(
    <bottomTab.Navigator screenOptions={({navigation})=>({
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:"white",
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight:({tintColor})=>(
        <IconButtons icon="add" size={24} color={tintColor} onPress={()=>{
          navigation.navigate('manageExpanses')
        }}/>
      )

      })}>
      <bottomTab.Screen 
      name='Recent Expanses' 
      component={RecentExpenses}
      options={{
        title:'Recent Expanses',
        tabBarLabel:'Recent',
        tabBarIcon:({color,size})=><Ionicons name='hourglass' color={color} size={size}/>
      }}/>
      <bottomTab.Screen 
      name='All Expenses' 
      component={AllExpences}
      options={{
        title:'ALL Expanses',
        tabBarLabel:'Expanses',
        tabBarIcon:({color,size})=><Ionicons name='calendar' color={color} size={size}/>
      }}/>
    </bottomTab.Navigator>
    )

  }
  return (
    <>
    <StatusBar style='light'/>
    <ExpenseContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
        headerTintColor:'white',
      }}>
        <Stack.Screen name='BottomTab' component={BottomTab} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="manageExpanses" component={ManageExpanses} options={{
          presentation:'modal',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ExpenseContextProvider>
    </>
  );
}

