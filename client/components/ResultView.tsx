import { WebView } from 'react-native-webview';
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useFonts, Lato_400Regular, Lato_900Black } from '@expo-google-fonts/lato';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { KB_URL } from '../constants';

export default function ResultView(props: {
    setImage: (image: string | null) => void;
    image: string | null;
    setSlug: (slug: string | null) => void;
    slug: string | null;
    labelText: string | null;
    confirmed: boolean;
    setConfirmed: (confirmed: boolean) => void;
    setLabelText: (labelText: string | null) => void;
}) {
    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_900Black,
    });

    return (
        <>
            <TouchableOpacity
                style={styles.banner}
                onPress={() => {
                    props.setImage(null);
                    props.setSlug(null);
                }}>
                <AntDesign name="back" size={25} color={'#609966'} />
                <Text style={styles.bannerText}>Scan another item</Text>
            </TouchableOpacity>

            {!props.slug ? (
                <View style={styles.centerContent}>
                    <Text style={styles.centerText}>Processing...</Text>
                    <ActivityIndicator
                        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                        size="large"
                        color="#EDF1D6"
                    />
                </View>
            ) : !props.confirmed ? (
                <View style={styles.centerContent}>
                    <Image
                        source={props.image}
                        style={{ width: 240, height: 380, borderRadius: 15 }}
                        contentFit="cover"
                    />
                    <Text style={styles.centerText}>Is this {props.labelText}?</Text>
                    <View style={{ flexDirection: 'row', columnGap: 10 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                props.setConfirmed(true);
                            }}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                props.setImage(null);
                                props.setSlug(null);
                            }}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <WebView
                    style={styles.main}
                    source={{ uri: `${KB_URL}/pages/${props.slug}` }}
                />
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
    banner: {
        padding: 10,
        backgroundColor: '#EDF1D6',
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight + 10,
    },
    bannerText: {
        fontSize: 18,
        color: '#609966',
        marginLeft: 5,
        fontFamily: 'Lato_900Black',
    },
    centerText: {
        fontSize: 32,
        color: '#EDF1D6',
        fontFamily: 'Lato_900Black',
        textAlign: 'center',
        margin: 10,
    },
    centerContent: {
        flex: 1,
        rowGap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#609966',
    },
    button: {
        width: 100,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#EDF1D6',
    },
    buttonText: {
        fontSize: 24,
        color: '#609966',
        fontFamily: 'Lato_900Black',
        alignSelf: 'center',
    },
});
