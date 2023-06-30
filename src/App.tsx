import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
} from "react-router-dom"
import Home, { recipesLoader } from "./pages/Home.tsx"
import RootLayout from "./layout/RootLayout.tsx"
import PageNotFound from "./pages/PageNotFound.tsx"
import RecipeDetail from "./pages/RecipeDetail.tsx"
import Create from "./pages/Create.tsx"
import Search from "./pages/Search.tsx"
import { useContext } from "react"
import { CurrentUserContext } from "./context/CurrentUserContext.tsx"
import LoginPage from "./pages/Login/LoginPage.tsx"
import SignUpPage from "./pages/SignUp/SignUpPage.tsx"

export default function App() {
    const {
        state: { currentUser },
    } = useContext(CurrentUserContext)

    const RequireAuth = ({ children }: { children: React.ReactElement }) => {
        return currentUser ? children : <Navigate to={"/login"} />
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} loader={recipesLoader}/>

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

                <Route path="login" element={<LoginPage />} />
                <Route path="signUp" element={<SignUpPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}
