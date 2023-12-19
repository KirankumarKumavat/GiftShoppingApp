/**
 * Simple alert used in app
 */
import { Alert, ConstantsText } from './importLibrary'
export default function showSimpleAlert(message) {
    Alert.alert(
        ConstantsText.appName,
        message,
        [
            { text: "OK", onPress: () => { } }
        ],
        { cancelable: false }
    );
}