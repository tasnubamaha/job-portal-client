import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const JobApply = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    console.log(id, user);

    const submitJobApplication = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;

        console.log(linkedIn, github, resume);
        
        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedIn,
            github,
            resume
        }

        fetch(' https://job-portal-server-sage-two.vercel.app/job-applications', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
        .then(res => res.json())
        .then(data => {
           if(data.insertedId){
             Swal.fire({
            position: "top-end",
            title: "Your work has been saved!!",
            showConfirmButton: false,
            icon: "success",
            timer: 1500
        });
        navigate('/myApplications')
           }
        })
    }
    return (
     
          <div className="card bg-base-100 w-full shadow-2xl">
          <h1 className="text-3xl font-bold text-center mt-20">Apply Job and Good Luck!</h1>
            <div className="card-body">
              <form onSubmit={submitJobApplication} className="fieldset mb-20">
                <label className="fieldset-label ml-114">LinkedIn URL</label>
                <input type="url" name='linkedIn' className="input ml-114" placeholder="LinkedIn URL" />
                <label className="fieldset-label ml-114">GitHub URL</label>
                <input type="url" name='github' className="input ml-114" placeholder="GitHub URL" />
                <label className="fieldset-label ml-114">Resume URL</label>
                <input type="url" name='resume' className="input ml-114" placeholder="Resume URL" />
                <button className="btn btn-neutral mt-4 w-50 ml-128">Apply</button>
              </form>
            </div>
          </div>
      
    );
};

export default JobApply;