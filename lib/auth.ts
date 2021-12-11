import auth from '@react-native-firebase/auth';

interface SignParam {
    email: string;
    password: string;
}

export function signIn({ email, password }: SignParam) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({ email, password }: SignParam) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback: any) {
    return auth().onAuthStateChanged(callback);
}

export function signOut() {
    return auth().signOut();
}
