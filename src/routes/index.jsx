import { createBrowserRouter} from "react-router-dom";
import {PATH_ABOUT, PATH_SERVICE, PATH_TODO} from "./path.jsx";

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<h1>Tunggu sebentar...</h1>}>
            <Component {...props} />
        </Suspense>
    );

import {lazy, Suspense} from "react";

import Todo from "../pages/Todo.jsx";
import TodoForm from "../pages/TodoForm.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Service from "../pages/service.jsx";
const About = Loadable(lazy(() => import('../pages/About.jsx')));



const router = createBrowserRouter([
    {
        path: PATH_TODO.index,
        element: <Todo/>
    },
    {
      path : PATH_TODO.form,
      element: <TodoForm/>
    },
    {
        path : PATH_TODO.formEdit,
        element: <TodoForm/>
    },
    {
        path: PATH_ABOUT.index,
        element: <About/>
    },
    {
        path: PATH_SERVICE.index,
        element: <Service/>
    }
]);

export default router

