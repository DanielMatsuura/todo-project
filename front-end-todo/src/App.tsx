import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage/index"
import TodoPage from "./pages/TodoPage"
import { Auth0Provider } from "@auth0/auth0-react"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import HeaderBar from "./components/layout/HeaderBar"
import { scope_auth0 } from "./utils/constants"

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN!}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: scope_auth0,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={false}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="flex flex-col h-screen">
                  <HeaderBar />
                  <div className="flex-1 overflow-auto">
                    <TodoPage />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  )
}

export default App
