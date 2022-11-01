import {StyleSheet} from 'react-native';
import { Constants } from './Constants';
import { windowHeight} from './Dimensions'

const Styles = StyleSheet.create({
    sectionBackground: {
        backgroundColor: Constants.baseColor,
        height: windowHeight
    }
})

export default Styles