// // Login.jsx
// import React from "react";

// const Login = () => {
//   const handleGoogleLogin = () => {
//     window.open("http://localhost:5000/api/auth/google", "_self");
//   };

//   return (
//     <div className="">
//       <div>
//         <h1 className="text-white text-3xl font-bold">Welcome to cerlia</h1>
//       </div>
//       <div className="min-h-screen flex items-center justify-center bg-[#090440] text-white">
//         <div className="bg-[#1e1b4b] p-10 rounded-xl shadow-lg text-center space-y-6">
//           <h1 className="text-3xl font-bold">Sign in with Google</h1>
//           <button
//             onClick={handleGoogleLogin}
//             className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
//           >
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

//client/src/pages/auth/Login.jsx
import React from "react";
import { LogIn } from "lucide-react"; // Keeping this import, though not used in the final button

const Login = () => {
  const handleGoogleLogin = () => {
    // Ensure this URL is correct for your backend
    window.open("https://cerlia-playground.vercel.app/api/auth/google", "_self");
  };

 

  return (
    // Main container with a deeper, more vibrant gradient background
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 
                    px-4 py-8 sm:py-12 font-inter"
    >
      {" "}
      {/* Added font-inter for a clean look */}
      {/* Main Title and Slogan */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight sm:tracking-wide leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Welcome to
            </span>
            <span className="font-extrabold text-purple-400 drop-shadow-xl animate-pulse">
              Snappy MVP
            </span>
          </h1>
          <p className="mt-4 text-md sm:text-lg max-w-2xl mx-auto font-medium text-gray-400">
            {/* Your creativity, powered by a smart workflow
            
            */}

            From Idea to Prototype, Fast and Effortless.
          </p>
        </div>
      </div>
      {/* Login Card Container - Enhanced Glassmorphism/Dark Theme */}
      <div
        className="w-full max-w-md 
                      bg-white/5 border border-white/10 
                      backdrop-blur-xl rounded-3xl 
                      p-8 sm:p-10 shadow-2xl shadow-indigo-900/40 
                      text-center space-y-8 sm:space-y-10 
                      transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
      >
        {" "}
        {/* Subtle hover effect for the card */}
        {/* Sign In Title */}
        <h2
          className=" text-2xl sm:text-3xl font-bold text-white tracking-tight 
                       bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text"
        >
          Sign in to continue
        </h2>
        {/* Google Login Button - Significantly improved */}
        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer flex items-center justify-center gap-4 w-full 
                     py-3.5 sm:py-4 px-6 
                     bg-white text-gray-900 font-semibold text-lg rounded-xl 
                     shadow-lg shadow-white/10 
                     transition-all duration-300 ease-in-out 
                     hover:bg-gray-100 hover:shadow-xl hover:shadow-white/20 
                     active:scale-[0.98] active:bg-gray-200 
                     focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {/* Google Icon SVG - Slightly adjusted for better visual weight */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" // Slightly larger for better visibility
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 7.6 29.3 6 24 6 12.9 6 4 14.9 4 26s8.9 20 20 20c11 0 20-8.9 20-20 0-1.2-.1-2.3-.4-3.5z"
            />
            <path
              fill="#e53935"
              d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 7.6 29.3 6 24 6c-7.5 0-14 3.4-18.3 8.7z"
            />
            <path
              fill="#4caf50"
              d="M24 46c5.3 0 10.1-1.9 13.8-5l-6.4-5.3C29.7 37.9 27 39 24 39c-5.3 0-9.7-3.4-11.3-8l-6.6 5C9.9 42.3 16.4 46 24 46z"
            />
            <path
              fill="#1565c0"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5.2-5.7 6.7l6.4 5.3c-.5.4 7.3-5.3 7.3-14.5 0-1.2-.1-2.3-.4-3.5z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
        {/* Disclaimer Text */}
        <p className="text-gray-400 text-sm sm:text-base opacity-70">
          You’ll be redirected to Google for authentication.
        </p>
      </div>
    </div>
  );
};

export default Login;
