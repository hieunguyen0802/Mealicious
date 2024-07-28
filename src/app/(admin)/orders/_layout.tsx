import { Stack } from "expo-router";
import { Link, Tabs } from "expo-router";

export default function ProductStack() {
  return (
    <Stack>
     
       <Stack.Screen
        name="list"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
