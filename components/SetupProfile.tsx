import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../lib/auth';
import { createUser } from '../lib/user';
import { RootStackNavigationProp, RootStackParamList } from '../screens/types';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

type SetupProfileRouteProps = RouteProp<RootStackParamList, 'Profile'>;

function SetupProfile() {
    const [displayName, setDisplayName] = useState('');
    const navigation = useNavigation<RootStackNavigationProp>();

    const { params = {} } = useRoute<SetupProfileRouteProps>();
    const { uid } = params;

    const onSubmit = () => {
        createUser({
            id: uid,
            displayName,
            photoURL: null,
        });
    };

    const onCancel = () => {
        signOut();
        navigation.goBack();
    };

    return (
        <View style={styles.block}>
            <View style={styles.circle} />
            <View style={styles.form}>
                <BorderedInput
                    placeholder="닉네임"
                    value={displayName}
                    onChangeText={setDisplayName}
                    onSubmitEditing={onSubmit}
                    returnKeyType="next"
                />
            </View>
            <View style={styles.buttons}>
                <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
                <CustomButton title="취소" onPress={onCancel} theme="secondary" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 16,
        width: '100%',
    },
    circle: {
        backgroundColor: '#cdcdcd',
        borderRadius: 64,
        width: 128,
        height: 128,
    },
    form: {
        marginTop: 16,
        width: '100%',
    },
    buttons: {
        marginTop: 48,
    },
});

export default SetupProfile;
