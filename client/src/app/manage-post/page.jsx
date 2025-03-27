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
    setEditingJob({ ...job });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in editingJob) {
        if (key !== "photo" || !editingJob[key].startsWith("/uploads/")) {
          formData.append(key, editingJob[key]);
        }
      }
      // If a new photo is uploaded, it would need a separate state (not implemented here)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${editingJob._id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        alert("Job updated successfully!");
        setEditingJob(null);
        fetchJobs();
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Your Job Posts</h1>
      {editingJob ? (
        <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <input
              type="text"
              value={editingJob.jobPostTitle}
              onChange={(e) => setEditingJob({ ...editingJob, jobPostTitle: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea
              value={editingJob.shortJobDescription}
              onChange={(e) => setEditingJob({ ...editingJob, shortJobDescription: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Job
          </button>
          <button
            type="button"
            onClick={() => setEditingJob(null)}
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
              <div>
                <h3 className="font-semibold">{job.jobPostTitle}</h3>
                <p>{job.companyName} • {job.jobLocation}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}