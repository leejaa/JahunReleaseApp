import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface BaseProps {
    hasMarginBottom?: boolean;
}

type Props = BaseProps & TextInputProps;

function BorderedInput({ hasMarginBottom, ...rest }: Props) {
    return <TextInput style={[styles.input, hasMarginBottom && styles.margin]} {...rest} />;
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 4,
        height: 48,
        backgroundColor: 'white',
    },
    margin: {
        marginBottom: 16,
    },
});

export default BorderedInput;
