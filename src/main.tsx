import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CountPage from './components/CountPage.tsx';
import Error from './components/Error.tsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />
}, {
  path: '/count',
  element: <CountPage />
}, {
  path: '*',
  element: <Error />
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
