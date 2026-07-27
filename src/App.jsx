import AppRouter from './router/AppRouter.jsx';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Toaster position="top-right" reverseOrder={false} />

      <Box sx={{ p: 3 }}>
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
}

export default App;























