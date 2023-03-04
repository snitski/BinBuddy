import { WebView } from 'react-native-webview';
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useFonts, Lato_400Regular, Lato_900Black } from '@expo-google-fonts/lato';
import { AntDesign } from '@expo/vector-icons';

export default function ResultView(props: {
    setImage: (image: string | null) => void;
    image: string | null;
    setSlug: (slug: string | null) => void;
    slug: string | null;
}) {
    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_900Black
    });

    return (
        <>
            <TouchableOpacity 
                style={styles.banner} 
                onPress={() => {
                    props.setImage(null);
                    props.setSlug(null);
                }}
            >
                <AntDesign name="back" size={25} color={'#609966'} />
                <Text style={styles.bannerText}>Scan another item</Text>
            </TouchableOpacity>

            {!props.slug ? 
                <View style={{flex: 1, rowGap: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#609966'}}>
                    <Text style={styles.loadingText}>Loading...</Text>
                    <ActivityIndicator size='large' color='#EDF1D6'/> 
                </View>
            : 
                <WebView
                    style={styles.main}
                    source={{ uri: `http://172.30.6.209:3000/pages/${props.slug}` }}
                />
            }
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#609966'
    },
    banner: {
        padding: 10,
        backgroundColor: "#EDF1D6",
        flexDirection: 'row'
    },
    bannerText: {
        fontSize: 18,
        color: '#609966',
        marginLeft: 5,
        fontFamily:'Lato_900Black'
    },
    loadingText: {
        fontSize: 24,
        color: '#EDF1D6',
        fontFamily:'Lato_900Black'
    }
});
