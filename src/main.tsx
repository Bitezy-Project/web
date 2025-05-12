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
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {
            createPortal(
                <Toaster />, 
                document.querySelector("body")!
            )
        }

        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </ClerkProvider>
)
