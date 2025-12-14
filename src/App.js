import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { FormProvider } from './context/FormContext';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <FormProvider>
        <Layout />
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
