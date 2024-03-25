import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';

const AddJob = () => {

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false)
    const [categories, setCategories] = useState([]);

    const access_token = sessionStorage.getItem("access-token");

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
          setCategories(data);
        }
        getCategories();
        
      },[])

    const handleSubmit = (event)=>{
        event.preventDefault()

        const title = event.target.title.value;
        const description = event.target.description.value
        const companyName = event.target.companyName.value
        const minExperience = event.target.minExperience.value
        const maxExperience = event.target.maxExperience.value
        const salary = event.target.salary.value
        const category = event.target.category.value

        if(title == ""){toast.warning("title is required!");return;}
        if(description == ""){toast.warning("description is required!");return;}
        if(companyName == ""){toast.warning("companyName is required!");return;}
        if(minExperience == ""){toast.warning("minExperience is required!");return;}
        if(maxExperience == ""){toast.warning("maxExperience is required!");return;}
        if(minExperience > maxExperience ){toast.warning("minimum Experience should be greater than maximum Experience!");return;}
        if(salary == ""){toast.warning("salary is required!");return;}
        if(category == ""){toast.warning("category is required!");return;}
        
        
        const form_data = {title,description,companyName, minExperience, maxExperience, salary, category};
        console.log(form_data)
    
        async function addCategory() {
            setSaving(true);
            const response = await fetch(`${SERVER_URL}/api/admin/job`,
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token":`${access_token}`
                    },
                    method: "POST",
                    body: JSON.stringify(form_data)
                }
            );
            if (!response.ok) {
              setSaving(false);
              const message = `An error occurred: ${response.statusText}`;
              console.error(message);
              const response_body = await response.json()
              toast.error(response_body.message)
              return;
            }else{
                setSaving(false);
                toast.success("job Added successfully")
                navigate("/dashboard/admin");
            }

          }
          addCategory();
    }
    
  return (
    <div  className="block  h-full min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div className='flex items-start justify-start' >
        <NavLink to="/dashboard/admin">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>
        </NavLink>        
        <h5 className="h-full flex items-center justify-center mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span>New Job</span>
        </h5>

    </div>
     <div className='mt-4'>
        <div>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Tittle</label>
                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required=""></input>
                </div>
                <div>
                    <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                    <input type="text" name="companyName" id="companyName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required=""></input>
                </div>
                <div>
                    <label htmlFor="minExperience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Experience</label>
                    <input type="number" min={0} max={30} name="minExperience" id="minExperience" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required=""></input>
                </div>
                <div>
                    <label htmlFor="maxExperience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Experience</label>
                    <input type="number" min={0} max={30} name="maxExperience" id="maxExperience" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required=""></input>
                </div>
                <div>
                    <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                    <input type="number" min={0}  name="salary" id="salary" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1,00,000" required=""></input>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description" required=""></input>
                </div>
                <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={""}>
                    {
                        categories.map((cat)=><option value={`${cat._id}`}  key={cat._id}>{cat?.name}</option>)
                    }
                    
                </select>
                </div>

                {/* <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Save</button> */}
                <button disabled={saving} type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                {
                    saving&&(
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                        </svg>
                    )
                }
                {
                    saving?"Saving":"save"
                }
                
                </button>
            </form>
        </div>
    </div>
  </div>
  )
}

export default AddJob