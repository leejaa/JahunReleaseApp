import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from 'react-native';
import { clearToken } from '../api/client';
import MenuItem from '../components/MenuItem';
import { useUserState } from '../contexts/UserContext';
import authStorage from '../storages/authStorage';
import { RootStackNavigationProp } from './types';

function UserMenuScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();

    const [user, setUser] = useUserState();

    const onLogin = () => navigation.navigate('Login');
    const onRegister = () => navigation.navigate('Register');
    const onLogout = () => {
        setUser(null);
        clearToken();
        authStorage.clear();
    };

    const onFeed = () => {
        navigation.navigate('Feed');
    };

    const onMyProfile = () => {
        navigation.navigate('MyProfile');
    };

    return (
        <View>
            {user ? (
                <MenuItem name="로그아웃" onPress={onLogout} />
            ) : (
                <>
                    <MenuItem name="로그인" onPress={onLogin} />
                    <MenuItem name="회원가입" onPress={onRegister} />
                    <MenuItem name="Feed" onPress={onFeed} />
                    <MenuItem name="MyProfile" onPress={onMyProfile} />
                </>
            )}
        </View>
    );
}

export default UserMenuScreen;
