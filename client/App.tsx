import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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
                const label = labels.labels[0][0]
                    .toLowerCase()
                    .split(' ')
                    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                const sublabel = labels.sub_labels?.[0][0]
                    .toLowerCase()
                    .split(' ')
                    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                Alert.alert('Label', sublabel ? `${label} (${sublabel})` : label);
            })();
        }
    }, [image]);

    return (
        <View style={styles.main}>
            {!cameraIsOpen ? (
                <>
                    <Text>Test</Text>
                    <Button title="Open Camera" onPress={() => setCameraIsOpen(true)} />
                    <StatusBar style="auto" />
                </>
            ) : (
                <>
                    <CameraView image={image} setImage={setImage} />
                    <Button
                        title="Go Back"
                        onPress={() => {
                            setCameraIsOpen(false);
                            setImage(null);
                        }}
                    />
                </>
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
        paddingBottom: '15%',
    },
});
