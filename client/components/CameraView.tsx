import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { useState, createRef } from 'react';

export default function CameraView() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    let cameraRef: React.RefObject<Camera> = createRef();
    
    if (!permission) {
        Camera.requestCameraPermissionsAsync();
    } else if (!permission.granted) {
        Camera.requestCameraPermissionsAsync();
    }

    const toggleCameraType = async () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
        console.log(await cameraRef.getAvailablePictureSizesAsync("16:9"))
        console.log(Dimensions.get("screen").height / Dimensions.get("screen").width);
    }

    return (
        <View style={styles.main}>
            <Camera
                ratio="16:9"
                type={type}
                style={styles.camera} 
                ref={ref => { cameraRef = ref }}
            />
            <Button 
                title='Flip Camera' 
                onPress={toggleCameraType} 
            />
        </View>
    );   
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    camera: {
        flex: 1,
        alignSelf: 'stretch'
    }
});