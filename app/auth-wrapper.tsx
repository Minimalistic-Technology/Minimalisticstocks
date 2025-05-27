// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import axios from "axios";

// export default function AuthWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
        
//         const res = await axios.get("http://localhost:5000/auth/check-auth", {
//           withCredentials: true,
//         });
     
//         const publicPages = ["/login", "/signup", "/"];
        
//         if (publicPages.includes(pathname)) {
//           router.push("/dashboard");
//         } else {
//           setLoading(false);
//         }
//       } catch (error) {
   
//         const publicPages = ["/login", "/signup", "/"];
//         const protectedRoutes = ["/dashboard", "/profile", "/settings"];
        
//         if (protectedRoutes.some(route => pathname.startsWith(route))) {

//           router.push("/login");
//         } else if (publicPages.includes(pathname)) {
          
//           setLoading(false);
//         } else {
          
//           router.push("/login");
//         }
//       }
//     };
    
//     checkAuth();
//   }, [pathname, router]);
  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-700">Loading...</p>
//         </div>
//       </div>
//     );
//   }
  
//   return <>{children}</>;
// }