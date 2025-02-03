import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = useSelector(state => state.rootReducer.user);
    let isUser = false, user_id = null;
    let isToken = false;
    // let status = "Admin";

    if (token) {
        const decoded = jwtDecode(token);
        
        // const { name, roles } = decoded;

        // isManager = roles.includes("Manager");
        // isAdmin = roles.includes("Admin");
        // isAdmin = obj.role === "Администратор";
        // isSuperAdmin = obj.role === "Супер Админ";
        isToken = true;
        isUser = decoded?.user_id ? true : false;
        user_id = decoded?.user_id ? decoded?.user_id : null;

        // if (isAdmin) status = "Администратор";
        // if (isSuperAdmin) status = "Супер Админ";
        // if (isManager) status = "Manager";

        return { token: isToken, isUser, user_id }
    } else {
        return { token: isToken, isUser, user_id };
    }
}