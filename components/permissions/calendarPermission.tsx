import { useCalendarPermissions } from "expo-calendar";
import PermissionsLayout from "./permissionLayout";

export default function CalendarPermission() {

    const [permission, requestPermission] = useCalendarPermissions();
    return(
        <PermissionsLayout
            icon="calendar-outline"
            title="Calendario"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}     


