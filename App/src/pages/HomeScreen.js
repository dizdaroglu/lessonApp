import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import Styles from '../../Styles';
import _ from 'lodash';

import { connect } from 'react-redux';
import { fetchStudents } from '../actions';

import ListItem from '../components/ListItem';

class HomeScreen extends Component {

    componentWillMount() {
        this.props.fetchStudents();

        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)

    }
    createDataSource({ students }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(students);

    }
    renderRow(student) {
        return <ListItem student={student} />
    }
    render() {
        //console.log("this.props:", this.props.students);
        return (
            <View style={styles.container}>

                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />


            </View>
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
const mapStateToProps = state => {

    const students = _.map(state.student, (val, uid) => {
        return { ...val, uid };
    });

    return {
        students
    }
}
export default connect(mapStateToProps, { fetchStudents })(HomeScreen)