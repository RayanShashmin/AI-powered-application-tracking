// "use client";
// import { useRouter } from "next/navigation";

// const Main = () => {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.refresh(); // Refresh the page after logout
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="w-full h-16 bg-teal-500 flex items-center justify-between px-5">
//         <h1 className="text-white text-lg font-semibold">fakebook</h1>
//         <button
//           className="border-none outline-none py-2 px-5 bg-white rounded-full font-bold text-sm cursor-pointer hover:bg-gray-100 transition-colors"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </header>

//       {/* Dashboard Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-800 text-white p-5">
//           <h2 className="text-lg font-semibold mb-5">Dashboard</h2>
//           <nav className="space-y-3">
//             <a href="#" className="block hover:bg-gray-700 p-2 rounded transition-colors">
//               Home
//             </a>
//             <a href="#" className="block hover:bg-gray-700 p-2 rounded transition-colors">
//               Profile
//             </a>
//             <a href="#" className="block hover:bg-gray-700 p-2 rounded transition-colors">
//               Messages
//             </a>
//             <a href="#" className="block hover:bg-gray-700 p-2 rounded transition-colors">
//               Settings
//             </a>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-5 bg-gray-100">
//           <h2 className="text-2xl font-bold mb-5">Welcome to Your Dashboard</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {/* Example Cards */}
//             <div className="bg-white p-5 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">Card 1</h3>
//               <p className="text-gray-600">This is an example card.</p>
//             </div>
//             <div className="bg-white p-5 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">Card 2</h3>
//               <p className="text-gray-600">This is another example card.</p>
//             </div>
//             <div className="bg-white p-5 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">Card 3</h3>
//               <p className="text-gray-600">This is yet another example card.</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React, { useEffect } from 'react'

function App(){
    const[count,setcount] = useEffect(0)
}
const decrementFunction = () => {
    setcount(count - 1)
}
const incrementFunction = () => {
    setcount(count + 1)
}


export default function page() {
  return (
    <div>
        <p>Counter</p>
        <button  onClick={incrementFunction}>+</button>
        <button onClick={decrementFunction}>-</button>
        <p>{count}</p>
    </div>
  )
}
