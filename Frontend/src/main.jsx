import { createRoot } from 'react-dom/client';
import './index.css';
import router from "./App.jsx";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer /> 
  </>
);
