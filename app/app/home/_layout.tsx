import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="feed"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
    </Stack>
  );
}
