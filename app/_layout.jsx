import { Tabs } from 'expo-router';
import TabBar from '../components/TabBar';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: "Recognition" }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: "Navigation" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Tutorial" }}
      />
    </Tabs>
  );
};

export default _layout;
