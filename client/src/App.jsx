import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainRoutes from "./Container/MainRoutes";

import { Provider } from 'react-redux';
import store from './redux/store'; 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/*" element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
