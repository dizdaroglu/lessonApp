import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import Styles from '../../Styles';


const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} color={Styles.pink} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

    }
});

export default Spinner