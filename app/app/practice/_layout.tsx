import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          title: "Praticar escrita",
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#1A282F', // Altere para a cor desejada
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Altere para a cor desejada
          },
        }}
      />
    </Stack>
  );
}