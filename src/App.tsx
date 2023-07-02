import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
} from "react-router-dom"
import RootLayout from "./layout/RootLayout.tsx"
import PageNotFound from "./pages/PageNotFound.tsx"
import Create from "./pages/Create.tsx"
import Search from "./pages/Search.tsx"
import { useContext } from "react"
import { CurrentUserContext } from "./context/CurrentUserContext.tsx"
import LoginPage from "./pages/Login/LoginPage.tsx"
import SignUpPage from "./pages/SignUp/SignUpPage.tsx"
import HomePage from "./pages/HomePage/HomePage.tsx"
import RecipeDetailsPage from "./pages/RecipeDetails/RecipeDetailsPage.tsx"

export default function App() {
    const {
        state: { currentUser },
    } = useContext(CurrentUserContext)

    const RequireAuth = ({ children }: { children: React.ReactElement }) => {
        return currentUser ? children : <Navigate to={"/login"} />
    }

    // const LoggedInCantEnter

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage/>}/>

                <Route
                    path="create"
                    element={
                        <RequireAuth>
                            <Create />
                        </RequireAuth>
                    }
                />

                <Route path="recipes">
                    <Route path=":id" element={<RecipeDetailsPage />} />
                </Route>

                <Route path="search">
                    <Route index element={<Search />} />
                </Route>

                <Route path="login" element={<LoginPage />} />
                <Route path="sign-up" element={<SignUpPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}
