"use client";
import Link from "next/link";

const jobPosts = [
  { title: "Software Engineer", company: "TechCorp", location: "San Francisco, CA", logo: "https://via.placeholder.com/50" },
  { title: "Product Manager", company: "Innovate Inc.", location: "New York, NY", logo: "https://via.placeholder.com/50" },
  { title: "UI/UX Designer", company: "DesignPro", location: "Remote", logo: "https://via.placeholder.com/50" },
  { title: "Data Scientist", company: "DataWorks", location: "Boston, MA", logo: "https://via.placeholder.com/50" },
];

const JobCard = ({ job }) => (
  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-md">
    <div className="flex items-center space-x-4">
      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <p className="text-gray-600">{job.company} • {job.location}</p>
      </div>
    </div>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Apply Now
    </button>
  </div>
);

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('3.jpg')" }}> 
      <div className=""></div>

      <div className="relative text-center text-black p-6 mt-28">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Find Your Dream Job</h1>
        <p className="text-2xl mt-4 drop-shadow-md">Search among thousands of jobs across multiple industries.</p>

        <div className="mt-6 flex justify-center">
          <div className="flex bg-white rounded-full p-2 shadow-lg w-[500px]">
            <input type="text" placeholder="Job title, keywords..." className="flex-grow px-4 py-3 text-gray-800 outline-none rounded-l-full" />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">Search</button>
          </div>
        </div>
      </div>

      <div className="relative mt-12 w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Job Posts</h2>
        <div className="space-y-6">
          {jobPosts.map((job, index) => <JobCard key={index} job={job} />)}
        </div>
      </div>
    </div>
  );
}

