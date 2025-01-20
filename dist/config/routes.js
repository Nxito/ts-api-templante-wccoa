export const cookieExpiryTime = 604800000; //a week
export const authRoutes = {
    baseName: "/",
    routes: {
        auth: {
            baseName: "/auth",
            routes: {
                login: {
                    baseName: "/login"
                },
                logout: {
                    baseName: "/logout"
                }
            }
        },
        dashboard: {
            baseName: "/dashboard"
        }
    }
};
