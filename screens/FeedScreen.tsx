import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import PostCard from '../components/PostCard';
import { getPosts } from '../lib/posts';

function FeedScreen() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        getPosts().then(setPosts as any);
    }, []);

    console.log('posts', posts);

    return <FlatList data={posts} renderItem={renderItem} keyExtractor={(item) => item.id} />;
}

const renderItem = ({ item }: any) => (
    <PostCard createdAt={item.createdAt} description={item.description} id={item.id} photoURL={item.photoURL} />
);

export default FeedScreen;
