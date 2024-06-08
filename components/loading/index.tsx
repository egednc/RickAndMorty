import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
export const deviceHeight = Dimensions.get("screen").height;

const Loading = () => {

    return <>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: deviceHeight,
                top: 0,
                left: 0,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                backgroundColor: "rgba(0,0,0, 0.2)"
            }}>
                <ActivityIndicator size="large" color="#A5B18C" />
            </View>
    </>
}

export default Loading;