import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import { RootStackNavigationProp, RootStackParamList } from './types';

type SignInScreenRouteProp = RouteProp<RootStackParamList, 'Signin'>;

function SignInScreen() {
    const { params } = useRoute<SignInScreenRouteProp>();
    const { isSignUp = false } = params;
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <SafeAreaView style={styles.fullscreen}>
            <Text style={styles.text}>Public Gallery</Text>
            <View style={styles.form}>
                <BorderedInput hasMarginBottom placeholder="이메일" />
                <BorderedInput placeholder="비밀번호" hasMarginBottom={isSignUp} />
                {isSignUp && <BorderedInput placeholder="비밀번호 확인" />}
                <View style={styles.buttons}>
                    {isSignUp ? (
                        <>
                            <CustomButton title="회원가입" theme="secondary" />
                            <CustomButton title="로그인" theme="secondary" onPress={() => navigation.goBack()} />
                        </>
                    ) : (
                        <>
                            <CustomButton title="로그인" hasMarginBottom />
                            <CustomButton
                                title="회원가입"
                                theme="secondary"
                                onPress={() => navigation.push('Signin', { isSignUp: true })}
                            />
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    form: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal: 16,
    },
    buttons: {
        marginTop: 64,
    },
});

export default SignInScreen;
