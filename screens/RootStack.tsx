import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from './MainTab';
import ArticleScreen from './ArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MyArticleScreen from './MyArticlesScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import WriteScreen from './WriteScreen';
import SignInScreen from './SignInScreen';
import WelcomScreen from './WelcomeScreen';
import FeedScreen from './FeedScreen';
import UploadScreen from '../components/UploadScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    useAuthLoadEffect();
    return (
        <Stack.Navigator screenOptions={{ headerBackTitle: '닫기' }}>
            <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '회원가입' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
            <Stack.Screen name="MyArticles" component={MyArticleScreen} options={{ title: '내가 쓴 글' }} />
            <Stack.Screen name="Article" component={ArticleScreen} options={{ title: '게시글' }} />
            <Stack.Screen name="Write" component={WriteScreen} options={{ title: '새 게시글 작성' }} />
            <Stack.Screen name="Signin" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen
                name="Upload"
                component={UploadScreen}
                options={{ title: '새 게시물', headerBackTitle: '뒤로가기' }}
            />
        </Stack.Navigator>
    );
}

export default RootStack;
