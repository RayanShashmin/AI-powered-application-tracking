"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJob() {
  const [fullName, setFullName] = useState("");
  const [hiringManagerEmail, setHiringManagerEmail] = useState("");
  const [jobPostTitle, setJobPostTitle] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shortJobDescription, setShortJobDescription] = useState("");
  const [photoFile, setPhotoFile] = useState(null); // Store the file object
  const [photoPreview, setPhotoPreview] = useState(null); // For preview
  const router = useRouter();

  const handleGetStartedClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Photo size exceeds 5MB limit. Please upload a smaller image.");
        return;
      }
      setPhotoFile(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result); // Set preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("hiringManagerEmail", hiringManagerEmail);
    formData.append("jobPostTitle", jobPostTitle);
    formData.append("jobDepartment", jobDepartment);
    formData.append("jobLocation", jobLocation);
    formData.append("jobType", jobType);
    formData.append("jobSalary", jobSalary);
    formData.append("jobDescription", jobDescription);
    formData.append("companyName", companyName);
    formData.append("shortJobDescription", shortJobDescription);
    if (photoFile) formData.append("photo", photoFile);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`;
      console.log("Posting to:", url);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
        router.push("/");
      } else {
        console.error("Response error:", responseData);
        alert(`Error: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while posting the job. Check the console for details.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-100 text-center py-45 px-6">
        <h2 className="text-lg font-semibold text-indigo-600">Subheader</h2>
        <h1 className="text-4xl font-bold text-gray-900 my-4">Post a job here!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
        <button
          onClick={handleGetStartedClick}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition"
        >
          Get started
        </button>
      </div>

      {/* Form Section */}
      <div
        id="form-section"
        className="flex min-h-screen items-center justify-center p-6"
        style={{
          backgroundColor: "#f9fafb",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Post a Job</h1>
          <p className="text-sm mb-6 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Your Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Hiring Manager Email</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={hiringManagerEmail}
                onChange={(e) => setHiringManagerEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Job Post Title *</label>
              <input
                type="text"
                placeholder="Enter your job title"
                value={jobPostTitle}
                onChange={(e) => setJobPostTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Job Department *</label>
                <input
                  type="text"
                  placeholder="Development"
                  value={jobDepartment}
                  onChange={(e) => setJobDepartment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Job Location *</label>
                <input
                  type="text"
                  placeholder="New York"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Job Type *</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Job Salary</label>
                <input
                  type="text"
                  placeholder="Salary"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Job Description *</label>
              <textarea
                placeholder="Provide a detailed description of the job..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Company Name *</label>
              <input
                type="text"
                placeholder="Your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Short Job Description *</label>
              <textarea
                placeholder="Explain the job you're hiring for in just a few sentences."
                value={shortJobDescription}
                onChange={(e) => setShortJobDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-[#693cf0] focus:border-[#693cf0] transition-all"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Company Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              />
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-semibold hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}