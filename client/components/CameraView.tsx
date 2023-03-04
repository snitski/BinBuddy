import { Camera, CameraType, ImageType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 

export default function CameraView({image, setImage}) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    let camera : Camera
    
    if (!permission) 
        Camera.requestCameraPermissionsAsync();
    else if (!permission.granted) 
        Camera.requestCameraPermissionsAsync();

    const toggleCameraType = async () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    }

    const captureImageAsync = async () => {
        setImage(await camera.takePictureAsync({
            quality: 1,
            imageType: ImageType.jpg
        }));
        if(camera != null) await camera.pausePreview();
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          quality: 1,
          allowsMultipleSelection: false,
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if(result.canceled) {
            alert("You did not select an image.");
        }
        else {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.main}>
            {permission && !image ? 
                <Camera
                    ratio="16:9"
                    type={type}
                    style={styles.camera} 
                    ref={(r) => {
                        camera = r
                    }}
                > 
                    <TouchableOpacity style={styles.button} onPress={pickImageAsync}> 
                        <AntDesign name="picture" size={25} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.shutterButton} onPress={captureImageAsync}/> 
                    
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}> 
                        <AntDesign name="sync" size={25} color="black" />
                    </TouchableOpacity>
                </Camera>
            :
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <Image
                        style={styles.main}
                        source={image}
                        contentFit="cover"
                    />
                </View>
            }
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
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        columnGap: 50
    },
    button: {
        width: 50,
        height: 50,
        bottom: 15,
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shutterButton: {
        width: 70,
        height: 70,
        bottom: 15,
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});