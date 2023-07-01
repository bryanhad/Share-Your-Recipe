import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { FormContextProvider } from "./context/FormContext.tsx"
import { ThemeContextProvider } from "./context/ThemeContext.tsx"
import { CurrentUserProvider } from "./context/CurrentUserContext.tsx"
import { NavbarContextProvider } from "./context/NavBarContext.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <ThemeContextProvider>
        <NavbarContextProvider>
            <CurrentUserProvider>
                <FormContextProvider>
                    <App />
                </FormContextProvider>
            </CurrentUserProvider>
        </NavbarContextProvider>
    </ThemeContextProvider>
    // </React.StrictMode>,
)
