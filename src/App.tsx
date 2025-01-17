import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    // TODO TRGIGER VITE PRELOAD WHEN NEW RELEASE
    window.addEventListener('vite:preloadError', () => {
      window.location.reload(); // for example, refresh the page
    });
  }, []);
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ProgressBarStyle />
        <Router />
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
