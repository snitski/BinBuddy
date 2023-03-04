import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

const uploadImage = async (uri: string) => {
    console.log('Uploading image...');
    const res = await FileSystem.uploadAsync('http://172.30.6.226:5000', uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'image',
        httpMethod: 'POST',
    });
    console.log('Image uploaded!');

    return JSON.parse(res.body);
};

export default function ImagePickerButton() {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsMultipleSelection: false,
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.canceled) {
            alert('You did not select an image.');
        } else {
            console.log(result.assets[0]);

            uploadImage(result.assets[0].uri);
        }
    };

    return <Button title="Pick image" onPress={pickImageAsync} />;
}
