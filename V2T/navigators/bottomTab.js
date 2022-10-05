import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Record from '../screens/record/record';
import Roster from '../screens/roster/roster';
import Profile from '../screens/profile/profile';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recording" component={Record} />
      <Tab.Screen name="Roster" component={Roster} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
