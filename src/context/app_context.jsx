import AuthProvider from "./auth/auth_context";

export default function AppProvider({children}){
    return<AuthProvider>{children}</AuthProvider>
}