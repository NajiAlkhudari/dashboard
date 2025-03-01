// "use client";
// import {  useSelector } from "react-redux";
// import Error from "@/components/partials/Error";

// const withGuard =(Component) =>
// {
//     const Wrapper = (props)=>{
//         const { isAuthenticated } =useSelector (state => state.auth)

//         return isAuthenticated ?
//         (
//             <Component {...props} />

//         ) : 
//         (
//            <Error />
//         );
//     };
//     return  Wrapper ;
// }



// export default withGuard;

// "use client";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Error from "@/components/partials/Error";

// const withGuard = (Component) => {
//   const Wrapper = (props) => {
//     const { isAuthenticated } = useSelector((state) => state.auth);
//     const [showError, setShowError] = useState(false);

//     useEffect(() => {
//       if (!isAuthenticated) {
//         const timer = setTimeout(() => {
//           setShowError(true); // بعد تأخير عرض الخطأ
//         }, 10); // يمكنك تعديل الوقت هنا (2000ms = 2 ثواني)

//         // تنظيف التايمر إذا تغيرت حالة المصادقة
//         return () => clearTimeout(timer);
//       } else {
//         setShowError(false); // إعادة تعيين إذا تم تسجيل الدخول
//       }
//     }, [isAuthenticated]);

//     return showError ? <Error /> : <Component {...props} />;
//   };

//   return Wrapper;
// };

// export default withGuard;
