import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

interface CreatePost {
    photoURL: string;
    description: string;
}

export function createPost({photoURL, description}: CreatePost) {
    return postsCollection.add({
        photoURL,
        description
    });
}

export async function getPosts() {
    const snapshot = await postsCollection.get();
    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}