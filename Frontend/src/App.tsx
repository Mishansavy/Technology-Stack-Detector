// import { useState } from "react";
// import axios from "axios";
// import { Search, Server, Loader2 } from "lucide-react";

// const App = () => {
//   const [url, setUrl] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     setIsLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8000/api/analyze/", {
//         url,
//       });
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         "Error fetching data. Please ensure the URL is valid and try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
//       <meta
//         name="description"
//         content="Detect backend technologies powering a website with our easy-to-use tool."
//       />
//       <link rel="author" href="https://mishanshah.com.np/" />

//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-block p-2 bg-white rounded-full shadow-lg mb-6">
//             <Server className="w-12 h-12 text-indigo-600" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Backend Technology Detector
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Discover the technology stack powering any website
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <form onSubmit={handleSubmit} className="relative">
//             <div className="flex items-center space-x-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Enter website URL (e.g., example.com)"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   required
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     <span>Detecting...</span>
//                   </>
//                 ) : (
//                   <span>Detect Stack</span>
//                 )}
//               </button>
//             </div>
//           </form>

//           {error && (
//             <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
//               {error}
//             </div>
//           )}

//           {result && (
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">
//                 Detected Technologies
//               </h3>
//               {result.backend_technologies.length > 0 ? (
//                 <div className="grid gap-3">
//                   {result.backend_technologies.map((tech, index) => (
//                     <div
//                       key={index}
//                       className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
//                         <span className="text-gray-800">{tech}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-600">
//                   No backend technologies detected.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         <footer className="text-center text-gray-600">
//           <p>
//             Powered by{" "}
//             <a
//               href="https://memeorbit.com/"
//               className="text-indigo-600 hover:text-indigo-700 font-medium"
//             >
//               MemeOrbit
//             </a>
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Search, Server, Loader2 } from "lucide-react";

interface Result {
  backend_technologies: string[];
  frontend_technologies: string[];
}

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const response = await axios.post<Result>(
        "http://localhost:8000/api/analyze/",
        {
          url,
        }
      );
      setResult(response.data);
    } catch (err) {
      setError(
        "Error fetching data. Please ensure the URL is valid and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <meta
        name="description"
        content="Detect technologies powering a website with our easy-to-use tool."
      />
      <link rel="author" href="https://mishanshah.com.np/" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-white rounded-full shadow-lg mb-6">
            <Server className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Technology Stack Detector
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover the backend and frontend technology stack powering any
            website
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <span>Detect Stack</span>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-8">
              {/* Backend Technologies */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                  Detected Backend Technologies
                </h3>
                {result.backend_technologies.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {result.backend_technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                          <span className="text-gray-800">{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No backend technologies detected.
                  </p>
                )}
              </div>

              {/* Frontend Technologies */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                  Detected Frontend Technologies
                </h3>
                {result.frontend_technologies.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {result.frontend_technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                          <span className="text-gray-800">{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No frontend technologies detected.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-gray-600 text-sm sm:text-base">
          <p>
            Powered by{" "}
            <a
              href="https://memeorbit.com/"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              MemeOrbit
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
