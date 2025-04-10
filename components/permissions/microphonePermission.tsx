import { useEffect, useState } from "react";
import PermissionsLayout from "./permissionLayout";
import { Audio } from "expo-av";

export default function MicrophonePermissions() {
  const [permission, setPermission] = useState<Audio.PermissionResponse | undefined>(undefined);

  // Función para solicitar acceso al microfono
  const requestPermission = async () => {
    const result = await Audio.requestPermissionsAsync();
    setPermission(result);
  };

  useEffect(() => {
    const checkPermission = async () => {
      const result = await Audio.getPermissionsAsync();
      console.log(result);
      setPermission(result);
    };

    checkPermission();
  }, []);

  return (
    <PermissionsLayout
      icon="mic-outline"
      title="Micrófono"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}