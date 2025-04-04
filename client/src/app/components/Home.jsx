"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const JobCard = ({ job, onViewDetails }) => (
  <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg cursor-pointer">
    <div className="flex justify-between items-start">
      <div className="flex space-x-4">
        <img
          src={job.photo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${job.photo}` : "https://via.placeholder.com/50"}
          alt={job.companyName}
          className="w-14 h-14 rounded-lg object-cover border border-gray-200"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {job.jobPostTitle}
          </h3>
          <p className="text-gray-600 font-medium">{job.companyName}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {job.jobLocation}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {job.jobType}
            </span>
          </div>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-900 hover:text-white transition-colors">
        Apply
      </button>
    </div>
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
      <span className="text-sm text-gray-500">
        Posted: {new Date(job.createdAt).toLocaleDateString()}
      </span>
      <button
        onClick={() => onViewDetails(job)}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        View details →
      </button>
    </div>
  </div>
);

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  // Format dates properly
  const postedDate = new Date(job.postDate || job.createdAt);
  const deadlineDate = job.deadlineDate ? new Date(job.deadlineDate) : null;
  const isExpired = deadlineDate ? deadlineDate < new Date() : false;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{job.jobPostTitle}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={job.photo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${job.photo}` : "https://via.placeholder.com/50"}
            alt={job.companyName}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{job.companyName}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {job.jobLocation}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {job.jobType}
              </span>
              {job.jobSalary && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  {job.jobSalary}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Date Information - Improved visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Posted Date</p>
              <p className="font-medium text-gray-900">
                {postedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
              <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                {deadlineDate ? (
                  deadlineDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                ) : "Not specified"}
              </p>
              {deadlineDate && (
                <p className={`text-xs mt-1 ${isExpired ? 'text-red-500' : 'text-green-600'}`}>
                  {isExpired ? 'This position has closed' : 'Accepting applications'}
                </p>
              )}
            </div>
          </div>

          {/* Job Details - Improved readability */}
          <div className="space-y-4">
            {job.shortJobDescription && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">About This Position</h3>
                <p className="text-gray-800 whitespace-pre-line">{job.shortJobDescription}</p>
              </div>
            )}

            {job.jobDescription && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.jobDescription}</p>
              </div>
            )}

            {job.requirements && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
              </div>
            )}

            {job.responsibilities && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
              </div>
            )}
          </div>

          {/* Footer with apply button */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              {deadlineDate && (
                <p className={`text-sm ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                  {isExpired ? (
                    `Closed on ${deadlineDate.toLocaleDateString()}`
                  ) : (
                    `Open until ${deadlineDate.toLocaleDateString()}`
                  )}
                </p>
              )}
            </div>
            <button 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={isExpired}
            >
              {isExpired ? 'Position Closed' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`, {
          credentials: "include",
        });
        const data = await response.json();
        setJobPosts(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/3.jpg')" }}
    >
      <div className="relative text-center text-black p-6 mt-28">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Find Your Dream Job</h1>
        <p className="text-2xl mt-4 drop-shadow-md">
          Search among thousands of jobs across multiple industries.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="flex bg-white rounded-full p-2 shadow-lg w-[500px]">
            <input
              type="text"
              placeholder="Job title, keywords..."
              className="flex-grow px-4 py-3 text-gray-800 outline-none rounded-l-full"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-12 w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Job Posts</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobPosts.length === 0 ? (
          <p>No job posts available.</p>
        ) : (
          <div className="space-y-6">
            {jobPosts.map((job) => (
              <JobCard 
                key={job._id} 
                job={job} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}