import * as ImagePicker from 'expo-image-picker';
import {Button} from 'react-native';

export default function ImagePickerButton() {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          quality: 1,
          allowsMultipleSelection: false,
          base64: true,
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if(result.canceled) {
            alert("You did not select an image.");
        }
        else {
            console.log(result.assets[0].base64);
        }
    };

    return (
        <Button
            title="Pick image"
            onPress={pickImageAsync}
        />
    );
}