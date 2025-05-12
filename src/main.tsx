import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/animations.css'
import './styles/variables.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { createPortal } from 'react-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/sonner'
import 'leaflet/dist/leaflet.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        {
            createPortal(
                <Toaster />, 
                document.querySelector("body")!
            )
        }

        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </>
)
