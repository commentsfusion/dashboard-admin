const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  LOGIN: {
    DATA: `${BaseUrl}/auth/login`,
  },
   ADDUSER: {
    DATA: `${BaseUrl}/auth/send-code`,
    VERIFY: `${BaseUrl}/auth/verify-signup`,
  },
   USER: {
    DATA: `${BaseUrl}/user/all`,
    SEARCH: `${BaseUrl}/user/search`,
    ROLE: `${BaseUrl}/user/role`,
    DELETE: `${BaseUrl}/user/delete`,
  
    
  },
 
};
