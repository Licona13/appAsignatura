import { useCameraPermissions } from "expo-camera";
import PermissionsLayout from "./permissionLayout";


export default function CameraPermission() {

    const [permission, requestPermission] = useCameraPermissions();

    console.log(permission);

    return(
        <PermissionsLayout
            icon="camera-outline"
            title="Cámara"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}