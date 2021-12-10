import { useNavigation } from "@react-navigation/core";
import { useMutation } from "react-query";
import { register } from "../api/auth";
import { applyToken } from "../api/client";
import { AuthError } from "../api/types";
import { useUserState } from "../contexts/UserContext";
import { RootStackNavigationProp } from "../screens/types";
import authStorage from "../storages/authStorage";
import useInform from "./useInform";

export default function useRegister() {
    const inform = useInform();
    const [, setUser] = useUserState();
    const navigation = useNavigation<RootStackNavigationProp>();
    const mutation = useMutation(register, {
        onSuccess: (data) => {
            setUser(data.user);
            navigation.pop();
            applyToken(data.jwt);
            authStorage.set(data);
        },
        onError: (error: any) => {
            const message = error.response?.data?.data?.[0]?.messages[0].message ?? '회원가입 실패';
            inform({
                title: '오류',
                message,
            });
        },
    });
    return mutation;
}