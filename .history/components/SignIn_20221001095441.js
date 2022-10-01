import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { supabaseClient } from "./utils/supabase-client";
import { useRouter } from "next/router";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signIn = async () => {
    if (email === "" || password === "") {
      toast("Please fill in all fields");
    }
    try {
      let { user, error } = await supabaseClient.auth.signIn({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      if (user) {
        router.push("/add_inventory");
      }
    } catch (error) {
      console.log("object");
      toast(error.error_description || error.message);
    }
  };

  return (
    <div>
      <h3 className="my-4">Sign In</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={signIn}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={signIn}
                className="bg-primary hover:bg-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              {/* <a
                className="inline-block align-baseline font-bold text-sm"
                href="#"
              >
                Forgot Password?
              </a> */}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default SignIn;
