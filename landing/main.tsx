import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider.tsx';
import { NotificationProvider } from '../src/components/Notification/NotificationProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark'>
      <NotificationProvider duration={10000} maxNotifications={6} placement='bottom-right'>
        <App />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
);
