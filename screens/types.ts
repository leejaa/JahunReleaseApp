import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainTabParamList = {
    Articles: undefined;
};
export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
    RootStackNavigationProp,
    BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

export type RootStackParamList = {
    MainTab: MainTabNavigationScreenParams;
    Article: {
        id: number;
    };
    Register: undefined;
    Login: undefined;
    MyArticles: undefined;
    Write: {
        articleId?: number;
    };
    Signin: {
        isSignUp?: boolean;
    };
};
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
