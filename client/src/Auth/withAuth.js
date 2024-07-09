// // hoc/withAuth.js

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const withAuth = (Component) => {
//   const AuthComponent = (props) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//       const storedToken = document.cookie
//         .split('; ')
//         .find((row) => row.startsWith('jwt='))
//         ?.split('=')[1];

//       const userId = localStorage.getItem('userId');

//       if (!storedToken || !userId) {
//         navigate('/login', { replace: true });
//       }
//     }, [navigate]);

//     return <Component {...props} />;
//   };

//   return AuthComponent;
// };

// export default withAuth;
