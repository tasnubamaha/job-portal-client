import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';


const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    



    useEffect(() => {
        
  
        axios.get(`https://job-portal-server-sage-two.vercel.app/job-application?email=${user.email}`, { withCredentials: true})
        .then(res => {
            if (Array.isArray(res.data)) {
              setJobs(res.data);
            } else {
              console.error("Unexpected response:", res.data);
              setJobs([]); // Fallback to empty array
            }
          })
          
        
    }, [user.email])
    return (
        <div>
            <h2 className='text-2xl'>My Applications: {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                         Array.isArray(jobs) && jobs.map(job => (
                            <tr key={job._id}>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img
                                    src={job.company_logo}
                                    alt="company" />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{job.title}</div>
                                <div className="text-sm opacity-50">{job.location}</div>
                                </div>
                            </div>
                            </td>
                            <td>{job.company_name}</td>
                                <td>{job.location}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">X</button>
                                </th>
                            </tr>
                         )
                            )
                    }
                   
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default MyApplications;