import { scope_auth0 } from "@/utils/constants";
import { useAuth0 } from "@auth0/auth0-react"

interface LoginOptions {
  connection?: string;
  screenHint?: "signup" | "login";
}

/**
 * Custom hook to manage user authentication with Auth0.
 *
 * Provides:
 * - Current user information
 * - Login and logout functions
 * - Authentication status (isAuthenticated)
 * - Loading state (isLoading)
 * - Access token retrieval
 */
export const useUser = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout, getAccessTokenSilently } = useAuth0()

  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const scope = scope_auth0;

  const login = ({ connection, screenHint }: LoginOptions = {}) => {
    return loginWithRedirect({
      authorizationParams: {
        connection,
        screen_hint: screenHint,
        audience: audience,
        scope: scope
      },
    });
  }

  return {
    user: user,
    login,
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
    isLoading,
    isAuthenticated,
    getAccessTokenSilently: () => getAccessTokenSilently({
      authorizationParams:
      {
        audience: audience,
        scope: scope
      }
    })
  }
}
