export const logout = () => {
    // Clear all authentication data
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
  
    // Redirect to home page
    window.location.href = "/"
  }
  
  export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("isAuthenticated") === "true"
  }
  
  export const getUserRole = (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("userRole")
  }
  
  export const getUserInfo = () => {
    if (typeof window === "undefined") return null
  
    return {
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      role: localStorage.getItem("userRole"),
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    }
  }
  