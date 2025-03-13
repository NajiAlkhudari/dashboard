"use client";
import { useSelector } from "react-redux";

const withPermission = (WrappedComponent, requiredPermission) => {
  return (props) => {
    const userPermissions = useSelector((state) => state.me.userPermissions);

    const hasPermission =
      (userPermissions & requiredPermission) === requiredPermission;

    if (hasPermission) {
      return <WrappedComponent {...props} />;
    } else {
      return <div>You do not have permission to view this content.</div>;
    }
  };
};

export default withPermission;
