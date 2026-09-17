import React from 'react';
import { UserProfile, NavigationTab } from '../types';
import { ProfileScreen } from './ProfileScreen';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onSelectTab: (tab: NavigationTab) => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onSelectTab,
  onLogout
}) => {
  return (
    <ProfileScreen
      user={user}
      onUpdateUser={onUpdateUser}
      onLogout={onLogout}
      setCurrentTab={onSelectTab}
    />
  );
};
