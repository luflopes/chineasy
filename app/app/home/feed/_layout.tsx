import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";


export default function Layout() {

  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          title: "Hello, Lucas",
          headerRight: () => <TouchableOpacity onPress={() => {router.push('./feed/modal')}}>
          <MaterialCommunityIcons name="plus-circle-outline" size={30} color={"#FFFFFF"} style={{marginRight:10}}/>
          </TouchableOpacity>,
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
      <Stack.Screen
        name="modal"
        
        options={{
          // Set the presentation mode to modal for our modal route.
          title: "Cadastrar Aula",
          presentation: "modal",
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#1A282F', // Altere para a cor desejada
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Altere para a cor desejada
          },
        }}
      />
            <Stack.Screen
        name="class/[id]"
        options={{
          // Hide the header for all other routes.
          title: "",
          headerShown: true,
          headerTitleAlign: 'left',
          headerRight: () => <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} onPress={() => {router.push('./feed/modal')}}>
          <Ionicons name="information-circle-outline" size={24} color={"gray"} style={{marginRight:20}}/>
          <Entypo name="dots-three-horizontal" size={24} color="gray" />
          </TouchableOpacity>,
          headerLeft: () => <TouchableOpacity onPress={() => {router.push('./feed/modal')}}>
          <Ionicons name="close" size={24} color={"gray"} style={{marginRight:20}}/>
          </TouchableOpacity>,
          headerStyle: {
            backgroundColor: '#1A282F', // Altere para a cor desejada
          },
        }}
      />

    </Stack>
  );
}

 