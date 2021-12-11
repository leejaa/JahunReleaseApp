import React, { useRef } from 'react';
import BorderedInput from './BorderedInput';

interface Props {
    isSignUp: boolean;
    onSubmit: () => void;
    form: { email: string; password: string; confirmPassword: string };
    createChangeTextHandler: (name: 'email' | 'password' | 'confirmPassword') => (value: string) => void;
}

function SignForm({ isSignUp, onSubmit, form, createChangeTextHandler }: Props) {
    return (
        <>
            <BorderedInput
                hasMarginBottom
                placeholder="이메일"
                value={form.email}
                onChangeText={createChangeTextHandler('email') as () => void}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                keyboardType="email-address"
            />
            <BorderedInput
                placeholder="비밀번호"
                hasMarginBottom={isSignUp}
                value={form.password}
                onChangeText={createChangeTextHandler('password') as () => void}
                secureTextEntry
            />
            {isSignUp && (
                <BorderedInput
                    placeholder="비밀번호 확인"
                    value={form.confirmPassword}
                    onChangeText={createChangeTextHandler('confirmPassword') as () => void}
                    secureTextEntry
                />
            )}
        </>
    );
}

export default SignForm;
