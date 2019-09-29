import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import SigninScreen from '../App/src/pages/SigninScreen';
import SignupScreen from '../App/src/pages/SignupScreen';
import HomeScreen from '../App/src/pages/HomeScreen';
import CreateScreen from '../App/src/pages/CreateScreen';
import EditScreen from '../App/src/pages/EditScreen';


import Ionicons from 'react-native-vector-icons/Ionicons'
import Styles from './Styles';


const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" hideNavBar>
                <Scene key="auth" initial>
                    <Scene key="signin" component={SigninScreen} hideNavBar />
                    <Scene key="signup" component={SignupScreen} hideNavBar />
                </Scene>
                <Scene key="main" headerLayoutPreset={'center'} >
                    <Scene
                        key="home"
                        component={HomeScreen}

                        renderRightButton={
                            <TouchableOpacity onPress={() => Actions.createScreen()}>
                                <Ionicons
                                    name="md-add"
                                    size={25}
                                    color={Styles.pink}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: Styles.pink,
                                        marginRight: 25,
                                        padding: 8,
                                        textAlign: 'center'
                                    }}
                                />
                            </TouchableOpacity>
                        }

                        title="Welcome"
                        titleStyle={{ color: Styles.pink }}
                        navigationBarStyle={{ backgroundColor: 'rgb(108, 48, 141)', elemation: 8 }}
                    />
                    <Scene
                        key="createScreen"
                        title="Create"
                        component={CreateScreen}

                        navigationBarStyle={{ backgroundColor: 'rgb(108, 48, 141)', elevation: 8 }}
                        titleStyle={{ color: Styles.pink }}
                    />
                    <Scene
                        key="editScreen"
                        title="Edit"
                        component={EditScreen}

                        navigationBarStyle={{ backgroundColor: 'rgb(108, 48, 141)', elevation: 8 }}
                        titleStyle={{ color: Styles.pink }}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent;