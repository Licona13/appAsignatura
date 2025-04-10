import PermissionsLayout from "./permissionLayout";
import * as MediaLibrary from 'expo-media-library'

export default function GalleryPermissions() {

        const [permission, requestPermission] = MediaLibrary.usePermissions();
    

    return(
        <PermissionsLayout
            icon="images-outline"
            title="Galería"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}

