"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="mt-20 flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">AI Recruit</span>
        </h1>
        <div className="flex items-center space-x-4">
        
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-6 px-6 py-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-sm">
          <nav>
            <ul className="space-y-4">
              <li className="text-blue-600 font-semibold">Dashboard</li>
              <li>Job Listings</li>
              <li>Applications</li>
              <li>Interviews</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>

        {/* Content Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Job Postings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Posting Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Software Engineer</h3>
              <p className="text-gray-500 mt-2">12 applications received</p>
             
            </div>
            {/* Job Posting Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Product Manager</h3>
              <p className="text-gray-500 mt-2">8 applications received</p>
             
            </div>
            {/* Job Posting Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Data Scientist</h3>
              <p className="text-gray-500 mt-2">5 applications received</p>
             
            </div>
          </div>

          {/* Post a Job Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Post a Job and Find the Best Talent
            </h3>
            <p className="text-gray-200 mb-6">
              Reach thousands of qualified candidates with just one click. Post your job now and let AI Recruit handle the rest.
            </p>
            <button
              className="w-full lg:w-auto px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              onClick={() => router.push("/post-job")} // Redirect to post a job page
            >
              Post a Job
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">Notifications</h3>
          <ul className="space-y-2">
            <li className="text-gray-600">New application received for Software Engineer.</li>
            <li className="text-gray-600">Interview scheduled for Product Manager role.</li>
            <li className="text-gray-600">Your job posting for Data Scientist is live.</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}