import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Slot, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { NotesProvider } from '@/components/notes/notesContext';

// Prevent splash screen from hiding early
SplashScreen.preventAutoHideAsync();

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <TouchableOpacity onPress={onLogout} style={{ marginRight: 15 }}>
      <Feather name="log-out" size={24} color="#8B4513" />
    </TouchableOpacity>
  );
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) {
        router.replace('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (isAuthenticated === null) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NotesProvider>
        <Drawer
          screenOptions={{
            headerStyle: { backgroundColor: 'gray' },
            headerTintColor: '#F1EFEC',
            headerTitleStyle: { fontWeight: 'bold' },
            drawerStyle: { backgroundColor: 'bisque' },
            drawerActiveTintColor: '#8B4513',
            drawerInactiveTintColor: '#333',
            headerRight: () => <LogoutButton onLogout={handleLogout} />,

          }}
        >
          <Drawer.Screen name="login" options={{ drawerItemStyle: { display: "none" }, title: "Iniciar Sesión" }} />
          
          <Drawer.Screen
            name="index"
            options={{
              title: "Home",
              drawerLabel: "Home",
              drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />

          <Drawer.Screen
            name="menuApi"
            options={{
              title: "API Rick y Morty",
              drawerLabel: "Rick y Morty",
              drawerIcon: ({ color, size }) => <Ionicons name="people-circle" size={size} color={color} />,
            }}
          />
          
          <Drawer.Screen
            name="gallery"
            options={{
              title: "Galería",
              drawerLabel: "Galería",
              drawerIcon: ({ color, size }) => <Ionicons name="images" size={size} color={color} />,
            }}
          />
         
          <Drawer.Screen
            name="permissions"
            options={{
              title: "Permisos",
              drawerLabel: "Permisos",
              drawerIcon: ({ color, size }) => <Ionicons name="checkmark-done-sharp" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="notes"
            options={{
              title: "Notas",
              drawerLabel: "Notas",
              drawerIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="historyLocations"
            options={{
              title: "Ubicaciones",
              drawerLabel: "Ubicaciones",
              drawerIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="characters"
            options={{
              
              title: "Personajes",
              drawerLabel: "Personajes",
              drawerIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="locations"
            options={{
              
              title: "Ubicaciones",
              drawerLabel: "Ubicaciones",
              drawerIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="location"
            options={{
              
              title: "Ubicacion",
              drawerLabel: "Ubicacion",
              drawerIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
              drawerItemStyle: { display: 'none' }
            }}
          />

          <Drawer.Screen
            name="episodes"
            options={{
              
              title: "Episodios",
              drawerLabel: "Episodios",
              drawerIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer>
        <StatusBar style="auto" />
      </NotesProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}
