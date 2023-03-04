import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import CameraView from './components/CameraView';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

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
    const [slug, setSlug] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            (async () => {
                const labels = await uploadImage(image);
                console.log(labels);
                const label = labels.labels[0][0]
                    /*.toLowerCase()
                    .split(' ')
                    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');*/
                const sublabel = labels.sub_labels?.[0][0]
                    /*.toLowerCase()
                    .split(' ')
                    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                Alert.alert('Label', sublabel ? `${label} (${sublabel})` : label);*/

                if (sublabel) {
                    let path =
                        label.toLowerCase().replace(' ', '-') +
                        '-' +
                        sublabel.toLowerCase().replace(' ', '-');
                    console.log(path);
                    setSlug(path);
                } else {
                    let path = label.toLowerCase().replace(' ', '-');
                    console.log(path);
                    setSlug(path);
                }
            })();
        }
    }, [image]);

    return (
        <>
            {slug ? (
                <>
                    <Button
                        title="Go Back"
                        onPress={() => {
                            setSlug(null);
                            setImage(null);
                            setCameraIsOpen(false);
                        }}
                    />
                    <WebView
                        style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
                        source={{ uri: `http://172.30.6.209:3000/pages/${slug}` }}
                    />
                </>
            ) : (
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
            )}
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5%',
        paddingBottom: '15%',
    },
});
