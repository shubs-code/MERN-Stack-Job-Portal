import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import JobListCard from '../JobListCard';


const Admin = () => {
  
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("access-token");
  const username = sessionStorage.getItem("username");

  const [tabIndex, setTabIndex] = useState(0);

  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);


  const forbidenCall = ()=>{
    // move the user to login page if forbidden request is made.
    sessionStorage.setItem("access-token","")
    navigate("/login");

  }
  useEffect(()=>{
    async function getCategories() {
      const response = await fetch(`${SERVER_URL}/api/admin/categories`,{
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
      console.log(data);
      setCategories(data);
    }

    async function getJobs() {
      const response = await fetch(`${SERVER_URL}/api/admin/jobs`,{
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
      console.log(data);
      setJobs(data);
    }
    async function getApplications() {
      const response = await fetch(`${SERVER_URL}/api/admin/applications`,{
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
      console.log(data);
      setApplications(data);
    }


    if(tabIndex == 0 ){
      getJobs();
    }else if(tabIndex == 1){
      getCategories();
    }else{
      getApplications();
    }

  },[tabIndex])
  return (
    <div  className="block  h-full min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Admin Dashboard
      </h5>
      <div className='flex w-full '>
            <button onClick={()=>{setTabIndex(0)}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Jobs</button>
            <button onClick={()=>{setTabIndex(1)}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Categories</button>
            <button onClick={()=>{setTabIndex(2)}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Applications</button>
      </div>
      <div className='mt-4'>
        {
          tabIndex==0 && (
            <div>
              <span className='font-semibold'>Jobs</span>
              <div className='min-h-60 max-h-[80vh] py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full overflow-y-auto'>
                <div className="flex flex-wrap justify-center mt-10">
                  {jobs.map((_job)=><JobListCard job={_job}/>)}
                </div>
              </div>
              <button onClick={()=>{navigate("/dashboard/admin/job")}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Job</button>
            </div>
          )
        }
        {
          tabIndex==1 && (
            <div>
              <span className='font-semibold '>Categories</span>
              <div className='min-h-60 max-h-80 py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full overflow-y-auto'>
                  {categories.map((_cat)=><CategoriesListComponent key={_cat?._id} category={_cat}/>)}
              </div>
              <button onClick={()=>{navigate("/dashboard/admin/category")}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Category</button>
            </div>
          )
        }
                {
          tabIndex==2 && (
            <div>
              <span className='font-semibold '>Applications</span>
              <div className='min-h-60 max-h-80 py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full overflow-y-auto'>
                  {applications.map((_application)=><ApplicationListComponent key={_application?._id} application={_application}/>)}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

const CategoriesListComponent = ({category})=>{

  return(
    <div className="pb-3 sm:pb-4 border-0 border-b-2 mb-2" key={category?._id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               {category?.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {category?.description}
            </p>
         </div>
      </div>
   </div>
  )
}

const ApplicationListComponent = ({application})=>{

  return(
    <div className="pb-3 sm:pb-4 border-0 border-b-2 mb-2" key={application?._id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Applied by: <span className='text-slate-600'>{application?.user?.username}</span>
            </p>
            <p className="text-sm  truncate dark:text-gray-400">
               Status: <span className='text-slate-600'>{application?.status}</span>
            </p>
         </div>
      </div>
   </div>
  )
}

export default Admin