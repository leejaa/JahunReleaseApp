import { RouteProp, useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { v4 } from 'uuid';
import { RootStackNavigationProp, RootStackParamList } from '../screens/types';
import IconRightButton from './IconRIghtButton';
import { createPost } from '../lib/posts';

type UploadRouteProps = RouteProp<RootStackParamList, 'Upload'>;

function UploadScreen() {
    const route = useRoute<UploadRouteProps>();
    const res = route?.params?.res;
    const { width } = useWindowDimensions();
    const animation = useRef(new Animated.Value(width)).current;
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [description, setDiscription] = useState('');

    const navigation = useNavigation<RootStackNavigationProp>();
    const onSubmit = useCallback(async () => {
        navigation.pop();
        const asset = res?.assets?.[0];
        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/photo/0/${v4()}.${extension}`);
        if (Platform.OS === 'android') {
            await reference.putString(asset?.base64, 'base64', {
                contentType: asset.type,
            });
        } else {
            await reference.putFile(asset?.uri);
        }
        const photoURL = await reference.getDownloadURL();
        await createPost({ description, photoURL });
    }, [res, description, navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
        });
    }, [navigation, onSubmit]);

    useEffect(() => {
        const didShow = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
        const didHide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

        return () => {
            didShow.remove();
            didHide.remove();
        };
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isKeyboardOpen ? 0 : width,
            useNativeDriver: false,
            duration: 150,
            delay: 100,
        }).start();
    }, [isKeyboardOpen, width, animation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'height' })}
            style={styles.block}
            keyboardVerticalOffset={Platform.select({
                ios: 180,
            })}
        >
            <Animated.Image
                source={{ uri: res?.assets[0]?.uri }}
                style={[styles.image, { height: animation }]}
                resizeMode="cover"
            />
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder="이 사진에 대한 설명을 입력하세요..."
                textAlignVertical="top"
                value={description}
                onChangeText={setDiscription}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    block: {},
    image: {
        width: '100%',
    },
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16,
    },
});

export default UploadScreen;
