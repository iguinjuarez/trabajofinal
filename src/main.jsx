import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from "./layout/Layout"
import StudentPage from './pages/students/StudentPage';
import FormStudentPage from './pages/students/FormStudentPage';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path:'/student',
        element: <StudentPage />
      },
      {
        path: '/student/form',
        element: <FormStudentPage />
      }
    ]
    }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
