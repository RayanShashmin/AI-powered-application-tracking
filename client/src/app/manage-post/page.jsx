"use client";

import { useState, useEffect } from "react";

export default function ManagePosts() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`, {
        credentials: "include",
      });
      const data = await response.json();
      setJobs(data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleEdit = (job) => {
    setEditingJob({ 
      ...job,
      postDate: job.postDate ? job.postDate.split('T')[0] : '', // Format date for input
      deadlineDate: job.deadlineDate ? job.deadlineDate.split('T')[0] : '' // Format date for input
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const { _id, __v, ...jobData } = editingJob;
  
      for (const key in jobData) {
        if (key !== "photo" || !jobData[key]?.startsWith?.("/uploads/")) {
          formData.append(key, jobData[key]);
        }
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${_id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      
      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(jobs.map(job => job._id === _id ? updatedJob.data : job));
        alert("Job updated successfully!");
        setEditingJob(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          alert("Job deleted successfully!");
          fetchJobs();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("An error occurred while deleting the job.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mt-19">Manage Job Posts</h1>
          <p className="text-gray-600 mt-2"></p>
        </div>

        {editingJob ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Edit Job Post</h2>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingJob.fullName || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager Email</label>
                  <input
                    type="email"
                    value={editingJob.hiringManagerEmail || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, hiringManagerEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={editingJob.jobPostTitle || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobPostTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    value={editingJob.companyName || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, companyName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    value={editingJob.jobDepartment || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobDepartment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={editingJob.jobLocation || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobLocation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    value={editingJob.jobType || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    value={editingJob.jobSalary || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobSalary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                  />
                </div>

                {/* Added Date Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Date *</label>
                  <input
                    type="date"
                    value={editingJob.postDate || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, postDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Date *</label>
                  <input
                    type="date"
                    value={editingJob.deadlineDate || ''}
                    min={editingJob.postDate} // Ensure deadline is after post date
                    onChange={(e) => setEditingJob({ ...editingJob, deadlineDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <textarea
                  value={editingJob.shortJobDescription || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, shortJobDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  value={editingJob.jobDescription || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, jobDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-blue-600 transition-all outline-none"
                  rows="5"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Your Job Listings</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job._id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-3 md:mb-0">
                        <h3 className="font-semibold text-gray-800">{job.jobPostTitle}</h3>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-gray-600 gap-x-4 gap-y-1">
                          <span>{job.companyName}</span>
                          <span>•</span>
                          <span>{job.jobLocation}</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {job.jobType}
                          </span>
                          <span>•</span>
                          <span>Posted: {new Date(job.postDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Deadline: {new Date(job.deadlineDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">You haven't posted any jobs yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}