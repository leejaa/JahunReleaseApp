import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArticlesScreens from './ArticlesScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserMenuScreen from './UserMenuScreen';
import WelcomScreen from './WelcomeScreen';
import { StyleSheet, View } from 'react-native';
import CameraButton from '../components/CameraButton';

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <>
            <View style={styles.block}>
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
                        name="Welcome"
                        component={WelcomScreen}
                        options={{
                            title: 'firebase',
                            tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />,
                        }}
                    />
                </Tab.Navigator>
            </View>
            {/* <CameraButton /> */}
        </>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        zIndex: 0,
    },
});

export default MainTab;
