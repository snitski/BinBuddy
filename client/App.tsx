import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CameraView from './components/CameraView';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

const uploadImage = async (uri: string) => {
    console.log('Uploading image...');
    const res = await FileSystem.uploadAsync('http://172.30.6.209:5000', uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'image',
        httpMethod: 'POST',
    });
    console.log('Image uploaded!');

    return JSON.parse(res.body);
};

export default function App() {
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            (async () => {
                const labels = await uploadImage(image);
                console.log(labels);
            })();
        }
    }, [image]);

    return (
        <View style={styles.main}>
        {(!cameraIsOpen ? 
            (<>
                <Text>Test</Text>
                <Button 
                    title='Open Camera'
                    onPress={() => setCameraIsOpen(true)}
                />
                <StatusBar style="auto" />
            </>)
        :
            (<>
                <CameraView image={image} setImage={setImage}/>
                <Button 
                    title='Go Back'
                    onPress={() => {setCameraIsOpen(false); setImage(null)}}
                />
            </>)
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5%',
        paddingBottom: '15%'
    }
});
