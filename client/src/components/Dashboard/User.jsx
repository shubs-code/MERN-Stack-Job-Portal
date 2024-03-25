import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';
import JobListCard from '../JobListCard';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const access_token = sessionStorage.getItem("access-token");
  

  useEffect(()=>{
    async function getLectures() {
      const response = await fetch(`${SERVER_URL}/api/user/jobs`,{
        headers:{
          "x-access-token":`${access_token}`
        }
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      setJobs(data);
    }
    getLectures();

  },[])

  return (
    <div  className="block  h-full min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Job Search
      </h5>

        
      <div className="flex flex-wrap justify-center mt-10">
        {jobs.map((_job)=><div onClick={()=>{navigate(`/dashboard/user/job/${_job._id}`)}} className='cursor-pointer' key={_job._id}>
          <JobListCard job={_job}/>
        </div>)
        }
      </div>
      

    </div>
  )
}

export default User