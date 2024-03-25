import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { SERVER_URL } from '../config';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event)=>{
    event.preventDefault()
    const username = event.target.username.value;
    const password = event.target.password.value;

    if(username == ""){
        toast.warning("username is required!")
        return;
    }
    else if(password == ""){
        toast.warning("password is required!")
        return;
    }

    const form_data = {username,password};
    console.log(form_data)

    async function signin() {
        const response = await fetch(`${SERVER_URL}/api/auth/signin/`,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(form_data)
            }
        );
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          const response_body = await response.json()
          toast.error(response_body.message)
          return;
        }
        const response_body = await response.json()
        console.log(response_body);
        sessionStorage.setItem("access-token",response_body.accessToken);
        sessionStorage.setItem("username",response_body.username);
        if(response_body.roles.indexOf("ROLE_USER") != -1){
            navigate("/dashboard/user")
            toast.success("logged in successfully")
        }else if(response_body.roles.indexOf("ROLE_ADMIN") != -1){
            navigate("/dashboard/admin")
            toast.success("logged in successfully")
        }
      }
      signin();
}

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""></input>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <NavLink to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Login