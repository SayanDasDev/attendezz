import { TNewUser } from "@/types/auth";
import { backend_url, getAccessToken } from "@/lib/utils";
import { signInSchema } from "@/schemas";
import * as z from "zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";


export const useAuth = () => {
  const register = async (values: TNewUser) => {
    const response = await fetch(`${backend_url}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const waAuth = async (waId: string) => {
    try {
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ waId }),
      };
      const response = await fetch(
        `${backend_url}/api/v1/auth/otpless`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const otpVerify = async (otp: string) => {
    const access_token = getAccessToken();
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ otp }),
    };
    const response = await fetch(
      `${backend_url}/api/v1/user/verify`,
      options
    );
    return response.json();
  };
  

  const signin = async (values: z.infer<typeof signInSchema>) => {
    const response = await fetch(
      `${backend_url}/api/v1/auth/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const logout = (router: AppRouterInstance) => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  
    router.push('/signin');
  };

  return { register, otpVerify, waAuth, signin, logout };
};