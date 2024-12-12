import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import UserHomePage from './pages/UserHomePage.jsx'
import ManagerLogin from './pages/ManagerLogin.jsx'
import UserLogin from './pages/UserLogin.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import AuthProvider from './components/AuthProvider.jsx'
import ManagerHomePage from './pages/ManagerHomePage.jsx'
import CoordinatorHomePage from './pages/CoordinatorHomePage.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element:(<AuthProvider><UserHomePage/></AuthProvider>)
      },
      {
        path: '/user/login',
        element:(<UserLogin/>)
      },
      {
        path: '/manager/login',
        element:(<ManagerLogin/>)
      },
      {
        path: '/manager',
        element:(<ManagerHomePage/>)
      },
      {
        path: '/coordinator',
        element:(<CoordinatorHomePage/>)
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes}>
      <App />
      </RouterProvider>
      </Provider>
  </StrictMode>,
)
