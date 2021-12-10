import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArticlesScreens from './ArticlesScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserMenuScreen from './UserMenuScreen';
import SignInScreen from './SignInScreen';

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Articles"
                component={ArticlesScreens}
                options={{
                    title: '게시글 목록',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="article" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="UserMenu"
                component={UserMenuScreen}
                options={{
                    title: '사용자 메뉴',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Firebase"
                component={SignInScreen}
                options={{
                    title: 'firebase',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTab;
