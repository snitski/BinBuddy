import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CameraView from './components/CameraView';
import { useState } from 'react';

export default function App() {
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [image, setImage] = useState(null);

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
