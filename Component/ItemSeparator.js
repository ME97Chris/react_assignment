import { View} from 'react-native'
import React from 'react'

const ItemSeparator = ({height,width}) => {

    return <View style={{width, height}}/>;
};

ItemSeparator.defaultProps = {
    height: 0,
    width: 0
};

export default ItemSeparator