import React, { Component } from 'react'
import {Text, View } from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUser} from '../redux/actions/index'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <Text>
                User is logged in...
            </Text>
        </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({fetchUser}, dispatch)

export default connect(null, mapDispatchToProps)(Main);