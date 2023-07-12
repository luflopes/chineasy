import { Stack } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function search() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: true,
          headerTitleAlign: 'center',
          title: "Pesquisar",
          
        }}
      />
    </Stack>
  );
}