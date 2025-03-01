


"use client";
import { useSelector } from "react-redux";

export const Permissions = {
  CanAddCompany: 1,
  CanEditCompany: 2,
  CanDeleteCompany: 4,
  CanReadCompany: 8,
  CanAddClient: 16,
  CanEditClient: 32,
  CanDeleteClient: 64,
  CanReadClient: 128,
  CanAddSupscription: 256,
  CanEditSupscription: 512,
  CanDeleteSupscription: 1024,
  CanReadSupscription: 2048,
  CanEditAgentPercentage: 4096,
  CanAddAgent: 8192,
  CanEditAgent: 16384,
  CanDeleteAgent: 32768,
  CanReadAgent: 65536,
  IsAdmin: 131072,
};


export const useHasPermission = (requiredPermission) => {
  const userPermissions = useSelector((state) => state.me.userPermissions);
  return (userPermissions & requiredPermission) === requiredPermission;
  
}

