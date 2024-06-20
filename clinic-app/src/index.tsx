import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Palette } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export const queryClient = new QueryClient()


const theme = createTheme({
  palette:{
    primary:{
      main: "#0f0f0f"
    },
    secondary:{
      main: "#f0f0f0"
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <BrowserRouter>
         <QueryClientProvider client={queryClient}>
           <App />
         </QueryClientProvider>
       </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();