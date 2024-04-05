"use client"
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthUser } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { backend_url, getAccessToken } from '@/lib/utils';


export type TUserContext = {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: {children: ReactNode}) => {

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(`${backend_url}/api/v1/user/details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  }

  const { isLoading, error, data: user } = useQuery({
    queryKey: ['getUserDetails'],
    queryFn,
  })

  const logout = useAuth().logout;
  const router = useRouter();
  if(error){
    logout(router);
  }

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);