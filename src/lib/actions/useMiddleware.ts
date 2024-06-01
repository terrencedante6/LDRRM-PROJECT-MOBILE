import { ROLES } from "./roles";

const { ADMINISTRATOR, RESCUER, STAFF } = ROLES;

const checkRole = (userRole: any, allowedRoles: any) => {
  return allowedRoles.includes(userRole);
};

const getDefaultRoute = (userRole: any) => {
  switch (userRole) {
    case ADMINISTRATOR:
      return "/application";
    case RESCUER:
      return "/application";
    case STAFF:
      return "/application/requests";
    default:
      return "/application/employees";
  }
};

export const useAuthMiddleware = (allowedRoles: any, currentUser: any) => {
  // if allowed return true else return default route
  const allowed = checkRole(currentUser.roles.role, allowedRoles);
  const defaultRoute = getDefaultRoute(currentUser.roles.role);
  return {
    allowed,
    defaultRoute,
  };
};
