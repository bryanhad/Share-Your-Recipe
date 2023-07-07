import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { FormContextProvider } from "./context/FormContext.tsx"
import { ThemeContextProvider } from "./context/ThemeContext.tsx"
import { NavbarContextProvider } from "./context/NavBarContext.tsx"
import { ToastContextProvider } from "./context/ToastContext.tsx"
import { UserContextProvider } from "./context/UserContext.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <ThemeContextProvider>
        <ToastContextProvider>
            <NavbarContextProvider>
                    <UserContextProvider>
                        <FormContextProvider>
                            <App />
                        </FormContextProvider>
                    </UserContextProvider>
            </NavbarContextProvider>
        </ToastContextProvider>
    </ThemeContextProvider>
    // </React.StrictMode>,
)
