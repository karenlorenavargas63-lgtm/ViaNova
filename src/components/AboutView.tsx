import React from 'react';
import { AboutScreen } from './AboutScreen';
import { NavigationTab } from '../types';

interface AboutViewProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onSelectTab }) => {
  return <AboutScreen setCurrentTab={onSelectTab} />;
};
