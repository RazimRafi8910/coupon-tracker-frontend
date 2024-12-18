import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

// const routes = createBrowserRouter([
//   {
//     path: '/',
//     element: <App/>,
//     children: [
//       {
//         path: '/',
//         element:(<AuthProvider><UserHomePage/></AuthProvider>)
//       },
//       {
//         path: '/user/login',
//         element:(<UserLogin/>)
//       },
//       {
//         path: '/manager/login',
//         element:(<ManagerLogin/>)
//       },
//       {
//         path: '/manager',
//         element:(<ManagerHomePage/>)
//       },
//       {
//         path: '/coordinator',
//         element:(<CoordinatorHomePage/>)
//       },
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
