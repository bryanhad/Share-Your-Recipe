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
import HomePage from "./pages/HomePage/HomePage.tsx"
import RecipeDetailsPage from "./pages/RecipeDetails/RecipeDetailsPage.tsx"
import MyProfilePage from "./pages/MyProfile/MyProfilePage.tsx"
import ZodSignUpPage from "./pages/Auth/SignUp/ZodSignUpPage.tsx"
import ZodLoginPage from "./pages/Auth/Login/ZodLoginPage.tsx"
import { UserContext } from "./context/UserContext.tsx"

export default function App() {
    const {userState} = useContext(UserContext)

    const RequireAuth = ({ children }: { children: React.ReactElement }) => {
        return userState ? children : <Navigate to={"/login"} />
    }

    const LoggedInCantEnter = ({children}: {children: React.ReactElement}) => {
        return userState ? <Navigate to={"/"} /> : children
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />

                <Route
                    path="create"
                    element={
                        <RequireAuth>
                            <Create />
                        </RequireAuth>
                    }
                />

                <Route
                    path="my-profile"
                    element={
                        <RequireAuth>
                            <MyProfilePage />
                        </RequireAuth>
                    }
                />

                <Route
                    path="login"
                    element={
                        <LoggedInCantEnter>
                            <ZodLoginPage />
                        </LoggedInCantEnter>
                    }
                />
                <Route
                    path="sign-up"
                    element={
                        <LoggedInCantEnter>
                            <ZodSignUpPage />
                        </LoggedInCantEnter>
                    }
                />

                <Route path="recipes">
                    <Route path=":id" element={<RecipeDetailsPage />} />
                </Route>

                <Route path="search">
                    <Route index element={<Search />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}
