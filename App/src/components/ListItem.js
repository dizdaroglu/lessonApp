import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from '../../Styles';
import { Actions } from 'react-native-router-flux';

export default class ListItem extends Component {


    onRowPress = () => {
        Actions.editScreen({ student: this.props.student })
    }

    render() {
        const { name, selectedItems } = this.props.student;
        console.log(selectedItems);
        return (
            <TouchableOpacity style={styles.content} activeOpacity={0.5} onPress={() => this.onRowPress()}>
                <View style={styles.nameContent}>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.days}>


                    {
                        selectedItems.map(x => {
                            return <Text style={styles.dayText}> {x} </Text>
                        })
                    }


                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.purple,
        paddingHorizontal: 25

    },

    content: {
        padding: 15,
        height: 70,
        borderRadius: 5,
        backgroundColor: Styles.pink,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        marginTop: 25,
        elevation: 8

    },
    nameContent: {

        marginRight: 20
    },
    name: {
        fontSize: 18,
        fontFamily: Styles.fontBlack,
        color: Styles.purple
    },
    days: {

        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row'
    },
    dayText: {
        marginLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Styles.purple,
        fontSize: 13,
        fontFamily: Styles.fontBlack,
        color: Styles.purple
    }
})