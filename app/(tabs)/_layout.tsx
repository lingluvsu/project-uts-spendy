import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

const Colors = {
  icon: '#000000',
  iconInactive: '#8e8e93', 
  activeBackground: '#e0f2ff',
  tabBar: '#ffffff', 
  tabBarBorder: '#e0e0e0', 
};

function TabBarIcon({
  name,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  focused: boolean;
}) {
  const iconColor = focused ? Colors.icon : Colors.iconInactive;

  return (
    <View
      style={[
        styles.tabIconContainer,
        focused && { backgroundColor: Colors.activeBackground },
      ]}>
      <Ionicons name={name} size={26} color={iconColor} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, 
        tabBarActiveTintColor: Colors.icon,
        tabBarInactiveTintColor: Colors.iconInactive,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: Colors.tabBarBorder,
          height: 80,
          paddingBottom: 20, 
          paddingTop: 10,
        },
      }}>

      <Tabs.Screen
        name="index" 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="finance" 
        options={{
          title: 'Finance',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'cash' : 'cash-outline'}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore" 
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile" 
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4, 
  },
});