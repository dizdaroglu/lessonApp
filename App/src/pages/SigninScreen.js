import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

import Styles from '../../Styles';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';

import firebase from 'firebase';
import Spinner from '../components/Spinner';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class SigninScreen extends Component {

    onLogin = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });

    }
    renderLogin = () => {
        const { loading } = this.props;
        if (loading) {
            return <Spinner size="large" />
        }
        return (
            <TouchableOpacity onPress={() => this.onLogin()} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonText}>
                    Log In
                        </Text>
            </TouchableOpacity>
        )

    }
    onEmailChanged = (text) => {

        this.props.emailChanged(text);
    }
    onPasswordChanged = (text) => {

        this.props.passwordChanged(text);
    }


    render() {
        const { email, password } = this.props;
        return (

            <View style={styles.container}>
                <KeyboardAvoidingView style={{ width: '100%' }} behavior="padding">
                    <Logo
                        title="Welcome Back!"

                    />
                    <View style={styles.inputContainer}>
                        <TextInput autoCapitalize="none" value={email} onChangeText={email => this.onEmailChanged(email)} placeholder="Email" style={styles.input} />
                        <TextInput value={password} onChangeText={password => this.onPasswordChanged(password)} placeholder="Password" secureTextEntry={true} style={styles.input} />
                    </View>
                    {
                        <Text>{this.props.error}</Text>
                    }
                    <View style={styles.buttonContainer}>
                        {
                            this.renderLogin()
                        }
                    </View>
                    <View style={styles.question}>
                        <Text style={styles.questionText}>
                            Don't have account?
                        </Text>
                        <TouchableOpacity onPress={() => Actions.signup()}>
                            <Text style={{ color: Styles.pink, fontFamily: Styles.fontLight }}> Join Now</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.purple,
        alignItems: 'center',
        paddingVertical: 20
    },
    headerLogo: {
        marginTop: 70,
        marginBottom: 30,
        alignItems: 'center',

    },
    logoImage: {
        marginBottom: 40,

    },
    headerText: {
        color: 'white',
        fontFamily: Styles.fontBlack,
        fontSize: 23
    },
    inputContainer: {

        width: '100%',
        paddingHorizontal: 50,
    },
    input: {
        backgroundColor: Styles.pink,
        marginBottom: 20,
        borderRadius: 5,
        height: 55,
        paddingHorizontal: 15,
        color: 'white',
        fontFamily: Styles.fontRegular,
        fontSize: 18,
        elevation: 8
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 50
    },
    button: {
        backgroundColor: Styles.pink,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,

        elevation: 8
    },
    buttonText: {
        color: 'white',
        fontFamily: Styles.fontBlack,
        fontSize: 23
    },
    question: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Styles.fontThin
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, token } = auth;

    return {
        email,
        password,
        error,
        loading,
        token
    }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SigninScreen);

