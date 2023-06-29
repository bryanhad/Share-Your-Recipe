import ReactDOM from "react-dom/client"
import "./index.css"
import { FormContextProvider } from "./context/FormContext.tsx"
import { ThemeContextProvider } from "./context/ThemeContext.tsx"
import { CurrentUserProvider } from "./context/CurrentUserContext.tsx"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <ThemeContextProvider>
        <CurrentUserProvider>
            <FormContextProvider>
                <App />
            </FormContextProvider>
        </CurrentUserProvider>
    </ThemeContextProvider>
    // </React.StrictMode>,
)
