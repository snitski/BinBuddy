import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import ImagePickerButton from './components/ImagePickerButton';
import CameraView from './components/CameraView';
import { useState } from 'react';

export default function App() {
    const [cameraIsOpen, setCameraIsOpen] = useState(false);

    return (
        (!cameraIsOpen ? 
            <View style={styles.main}>
                <Text>Test</Text>
                <ImagePickerButton />
                <Button 
                    title='Open Camera'
                    onPress={() => setCameraIsOpen(true)}
                />
                <StatusBar style="auto" />
            </View>
        :
            <View style={styles.camera}>
                <CameraView />
                <Button 
                    title='Close Camera'
                    onPress={() => setCameraIsOpen(false)}
                />
                </View>
        )
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
        rowGap: 5
    }
});
