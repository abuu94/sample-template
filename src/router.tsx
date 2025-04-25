import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";

// import AboutPage from "./pages/AboutPage";
// import MenuPage from "./pages/MenuPage";
// import ContactPage from "./pages/ContactPage";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";

import { LoginForm } from "./components/login-form";
import AuthLayout from "./components/AuthLayout";

import FoodsPage from "./pages/FoodsRepo/FoodsPage";
import UsersPage from "./pages/UsersRepo/UsersPage";
import TestPage from "./pages/TestRepo/TestPage";
// import FinishedFoodPage from "./pages/FoodsRepo/FinishedFoodPage";
// import OrderedFoodPage from "./pages/FoodsRepo/OrderedFoodPage";
// import UsersPage from "./pages/UsersRepo/UsersPage";
// import AdminsPage from "./pages/UsersRepo/AdminsPage";
// import DevelopersPage from "./pages/UsersRepo/DevelopersPage";
// import ProjectPage from "./pages/projectRepo/ProjectPage";
// import ProjectManagement from "./pages/projectRepo/ProjectManagement";
// import ProjectReport from "./pages/projectRepo/ProjectReport";

export const router = createBrowserRouter([
    {path:'/',element: <HomePage/>},
    // {path:'/about',element: <AboutPage/>},
    // { path: '/menu', element: <MenuPage /> }, // Add the menu route
    // { path: '/contact', element: <ContactPage /> }, // Add the contact route

    {path:'/login',element: <AuthLayout/>,
        children:[{path:'/login',element: <LoginForm/>}]},

  

     {path:'/',element: <AppLayout/>,
        children:[
            {path:'/',element:< Navigate to="/dashboard"/>},
            {path:'/dashboard',element: <Dashboard/>},

            {path:'/items',element: <FoodsPage/>},
            {path:'/users',element: <UsersPage/>},
            {path:'/tests',element: <TestPage/>},
            // {path:'/finished-foods',element: <FinishedFoodPage/>},

            
            // {path:'/users',element: <UsersPage/>},
            // {path:'/admins',element: <AdminsPage/>},
            // {path:'/developers',element: <DevelopersPage/>},

            // {path:'/projects',element: <ProjectPage/>},
            // {path:'/project-management',element: <ProjectManagement/>},
            // {path:'/project-report',element: <ProjectReport/>},
        ]},
]);