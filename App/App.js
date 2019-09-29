

import React, { Component } from 'react';
import {
    StyleSheet, StatusBar, View
} from 'react-native';

import firebase from 'firebase';
import Router from './Router';

import { Provider } from 'react-redux';
import ReduxThuk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../App/src/reducers';

import { apiKey, authDomain, appId, databaseURL, measurementId, messagingSenderId, storageBucket, projectId } from '../constants';

console.disableYellowBox = true;

export default class App extends Component {
    state = {
        loggedIn: null
    }
    componentWillMount() {
        const config = {
            apiKey: apiKey,
            authDomain: authDomain,
            databaseURL: databaseURL,
            projectId: projectId,
            storageBucket: storageBucket,
            messagingSenderId: messagingSenderId,
            appId: appId,
            measurementId: measurementId
        }
        firebase.initializeApp(config);

    }


    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThuk))
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={'rgb(108, 48, 141)'} />
                    <Router />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
