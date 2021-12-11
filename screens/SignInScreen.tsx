import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import { useUserContext } from '../contexts/UserContext';
import { signIn, signUp } from '../lib/auth';
import { getUser } from '../lib/user';
import { RootStackNavigationProp, RootStackParamList } from './types';

type SignInScreenRouteProp = RouteProp<RootStackParamList, 'Signin'>;

function SignInScreen() {
    const { params = {} } = useRoute<SignInScreenRouteProp>();
    const navigation = useNavigation<RootStackNavigationProp>();
    const { isSignUp = false } = params;
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const createChangeTextHandler = (name: 'email' | 'password' | 'confirmPassword') => (value: string) => {
        setForm({ ...form, [name]: value });
    };
    const onSubmit = async () => {
        Keyboard.dismiss();
        const { email, password, confirmPassword } = form;
        if (isSignUp && password !== confirmPassword) {
            Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
        }
        const info = { email, password };
        setLoading(true);
        try {
            const { user } = isSignUp ? await signUp(info) : await signIn(info);
            const profile = await getUser(user.uid);
            if (!profile) {
                navigation.navigate('Welcome', { uid: user.uid });
            }
        } catch (error: any) {
            const messages: any = {
                'auth/email-already-in-use': '이미 가입된 이메일입니다.',
                'auth/wrong-password': '잘못된 비밀번호입니다.',
                'auth/user-not-found': '존재하지 않는 계정입니다.',
                'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
            };
            const msg = messages[error?.code] || `${isSignUp ? '가입' : '로그인'}실패`;
            Alert.alert('실패', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.select({ ios: 'padding' })}>
            <SafeAreaView style={styles.fullscreen}>
                <Text style={styles.text}>Public Gallery</Text>
                <View style={styles.form}>
                    <SignForm
                        isSignUp={isSignUp}
                        onSubmit={onSubmit}
                        form={form}
                        createChangeTextHandler={createChangeTextHandler}
                    />
                    <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} loading={loading} />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
    keyboardAvoidingView: {
        flex: 1,
    },
});

export default SignInScreen;
