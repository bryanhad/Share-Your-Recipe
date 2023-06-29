import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
} from "react-router-dom"
import Home from "./pages/Home.tsx"
import About from "./pages/About.tsx"
import RootLayout from "./layout/RootLayout.tsx"
import DogImage, { dogLoader } from "./pages/DogImage.tsx"
import PageNotFound from "./pages/PageNotFound.tsx"
import RecipeDetail from "./pages/RecipeDetail.tsx"
import Create from "./pages/Create.tsx"
import Search from "./pages/Search.tsx"
import Login from "./pages/Login.tsx"
import {useContext} from 'react'
import { CurrentUserContext } from "./context/CurrentUserContext.tsx"
import Register from "./pages/Register.tsx"

export default function App() {
    const {state:{currentUser}} = useContext(CurrentUserContext)
    console.log(currentUser)

    const RequireAuth = ({ children }: { children: React.ReactElement }) => {
        return currentUser ? children : <Navigate to={"/login"} />
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />

                <Route path="about" element={<About />} />
                <Route path="dog" element={<DogImage />} loader={dogLoader} />
                <Route
                    path="create"
                    element={
                        <RequireAuth>
                            <Create />
                        </RequireAuth>
                    }
                />

                <Route path="recipes">
                    <Route path=":id" element={<RecipeDetail />} />
                </Route>

                <Route path="search">
                    <Route index element={<Search />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register/>}/>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}
