import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RootStackNavigationProp } from '../screens/types';
import CustomButton from './CustomButton';

interface Props {
    isSignUp: boolean;
    onSubmit: () => void;
    loading: boolean;
}

function SignButtons({ isSignUp, onSubmit, loading }: Props) {
    const navigation = useNavigation<RootStackNavigationProp>();

    const primaryTitle = isSignUp ? '회원가입' : '로그인';
    const secondaryTitle = isSignUp ? '로그인' : '회원가입';

    const onSecondaryButtonPress = () => {
        if (isSignUp) {
            navigation.goBack();
        } else {
            navigation.push('Signin', { isSignUp: true });
        }
    };

    if (loading) {
        return (
            <View style={styles.spinnerWrapper}>
                <ActivityIndicator size={32} color="#6200ee" />
            </View>
        );
    }

    return (
        <View style={styles.buttons}>
            <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
            <CustomButton title={secondaryTitle} theme="secondary" onPress={onSecondaryButtonPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 64,
    },
    spinnerWrapper: {
        marginTop: 64,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignButtons;
