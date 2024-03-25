import React from 'react'

const JobListCard = ({job, user}) => {
  return (
    <div className="p-4 max-w-sm">
    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
        <div className="flex items-center mb-3">
            <div
                className="w-8 h-8 mr-3 p-2 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"></path></svg>
            </div>
            <h2 className="text-white dark:text-white text-lg font-medium">{job?.tittle}</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
            <p className="leading-relaxed text-base text-white dark:text-gray-300 line-clamp-3" >
                {job?.description}
            </p>
            <span className="mt-2 text-black dark:text-white  inline-flex items-center">
              Experience:{job.minExperience}-{job.maxExperience} 
            </span>
            <span className="mt-2 text-black dark:text-white  inline-flex items-center">
              Salary:{job.salary} 
            </span>
            
        </div>
    </div>
</div>
  )
}

export default JobListCard

