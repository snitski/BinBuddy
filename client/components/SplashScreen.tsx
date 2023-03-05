import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useAssets } from 'expo-asset';
import { useFonts, Lato_400Regular, Lato_900Black } from '@expo-google-fonts/lato';

export default function SplashScreen(props: { setCameraIsOpen: (cameraIsOpen: boolean) => void }) {
    const [assets, error] = useAssets([require('../assets/logo.png')]);
    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_900Black,
    });

    if (!fontsLoaded) return null;
    return (
        <TouchableOpacity
            style={{ flex: 1, width: '100%', backgroundColor: '#609966' }}
            onPress={() => props.setCameraIsOpen(true)}>
            <View style={styles.top}>
                {assets ? (
                    <Image
                        style={{ width: 215, height: 215 }}
                        source={assets[0] as any}
                        contentFit="contain"
                    />
                ) : (
                    <Text>Failed to load logo.</Text>
                )}
                <Text style={{ fontFamily: 'Lato_900Black', color: '#EDF1D6', fontSize: 26 }}>
                    Welcome to BinBuddy!
                </Text>
                <Text
                    style={{
                        fontFamily: 'Lato_900Black',
                        color: '#EDF1D6',
                        fontSize: 18,
                        alignSelf: 'center',
                        margin: 2,
                    }}>
                    Your AI recycling companion
                </Text>
            </View>

            <View style={styles.bottom}>
                <Text
                    style={{
                        fontFamily: 'Lato_900Black',
                        color: '#EDF1D6',
                        fontSize: 16,
                        margin: 15,
                    }}>
                    Tap anywhere to scan
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(-50px)' as any,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
});
