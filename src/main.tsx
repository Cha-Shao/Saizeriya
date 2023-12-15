import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SelectCustomerCount from './components/SelectCustomerCount.tsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />
}, {
  path: '/count',
  element: <SelectCustomerCount />
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
