import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import CameraView from './components/CameraView';
import SplashScreen from './components/SplashScreen';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import ResultView from './components/ResultView';
import { StatusBar } from 'expo-status-bar';

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
    const [labelText, setLabelText] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

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
                setLabelText(sublabel ? `${label} (${sublabel})` : label);
                setConfirmed(false);

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
            <StatusBar />
            {image ? (
                <ResultView
                    setImage={setImage}
                    image={image}
                    setSlug={setSlug}
                    slug={slug}
                    labelText={labelText}
                    setLabelText={setLabelText}
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                />
            ) : (
                <View style={styles.main}>
                    {!cameraIsOpen ? (
                        <SplashScreen setCameraIsOpen={setCameraIsOpen} />
                    ) : (
                        <CameraView
                            image={image}
                            setImage={setImage}
                            setCameraIsOpen={setCameraIsOpen}
                        />
                    )}
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#609966',
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 15,
        backgroundColor: '#fff',
    },
});
