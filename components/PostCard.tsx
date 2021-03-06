import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from './Avatar';

interface Props {
    photoURL: string;
    description: string;
    createdAt: any;
    id: number;
}
function PostCard({ photoURL, description, createdAt, id }: Props) {
    const date = useMemo(() => (createdAt ? new Date(createdAt._second * 1000) : new Date()), []);

    const onOpenProfile = () => {};

    return (
        <View style={styles.block}>
            <View style={[styles.head, styles.paddingBlock]}>
                <Pressable style={styles.profile} onPress={onOpenProfile}>
                    <Image source={require('../assets/user.png')} resizeMode="cover" style={styles.avatar} />
                    <Text style={styles.displayName}>user name</Text>
                </Pressable>
            </View>
            <Image source={{ uri: photoURL }} style={styles.image} resizeMethod="resize" resizeMode="cover" />
            <View style={styles.paddingBlock}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{date.toLocaleString}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    paddingBlock: {
        paddingHorizontal: 16,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    displayName: {
        lineHeight: 16,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    image: {
        backgroundColor: '#bdbdbd',
        width: '100%',
        aspectRatio: 1,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
    date: {
        color: '#757575',
        fontSize: 12,
        lineHeight: 18,
    },
});

export default PostCard;
