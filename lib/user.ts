import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

interface CreateUser {
    id?: string;
    displayName: string;
    photoURL: string | null;
}

export function createUser({ id, displayName, photoURL }: CreateUser) {
    return usersCollection.doc(id).set({
        id,
        displayName,
        photoURL,
    });
}

export async function getUser(id: string) {
    const doc = await usersCollection.doc(id).get();
    return doc.data();
}
