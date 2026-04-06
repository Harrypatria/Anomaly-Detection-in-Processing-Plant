/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('petroguard_auth') === 'true';
  });
  const [isDashboardLaunched, setIsDashboardLaunched] = useState<boolean>(() => {
    return localStorage.getItem('petroguard_launched') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('petroguard_auth', 'true');
  };

  const handleLaunch = () => {
    setIsDashboardLaunched(true);
    localStorage.setItem('petroguard_launched', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDashboardLaunched(false);
    localStorage.removeItem('petroguard_auth');
    localStorage.removeItem('petroguard_launched');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!isDashboardLaunched) {
    return <LandingPage onLaunch={handleLaunch} />;
  }

  return (
    <div className="antialiased">
      <Dashboard onLogout={handleLogout} />
    </div>
  );
}
