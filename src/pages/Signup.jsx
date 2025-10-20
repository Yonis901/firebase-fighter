import React, { useState } from 'react';
import { Link } from 'react-router';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

const Signup = () => {
    const [show, setShow] = useState(false);




    const handleSignup = (e)=> {
        e.preventDefault();
        const name = e.target.name?.value;
        const photo = e.target.photo?.value;
        const email = e.target.email?.value;
        const password = e.target.password?.value;
        console.log("signup function entered.", {name, photo, email, password});

        if(password.length < 8){
            toast.error("Password should be at least 6 Digit.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,}$/;
        if(!passwordRegex.test(password)){
            toast.error(
                "❌ Password must be at least 8 characters long and include uppercase, lowercase, number, and special symbol."
            );
            return;
        };




        // Step 1: create user
        createUserWithEmailAndPassword(auth, email, password).then(res => {
            // Step-2:  Uptade Profile 
            updateProfile(res.user, {
                 displayName: name, photoURL: photo,
            }).then(res => {
                // Step-3: Email Verification 
                sendEmailVerification(res.user).then(res => {
                    console.log(res);
                    toast.success("Signup Successfull! Check your Email to Activate your account.");
                }).catch(e => {
                    toast.error(e.message);
                })
        
            }).catch((e)=> {
                toast.error(e.message);
            })

        })
        .catch((e)=>{
            console.log(e.code);

            const errorCode = e.code; 

           if(errorCode === "auth/email-already-in-use"){
            toast.error("User already exist in database.");
           }else if(errorCode === "auth/weak-password"){
            toast.error("Password most be 8 characters.");
           }else if(errorCode === "auth/invalid-email") {
            toast.error("Invalid email address.");
            } else if (errorCode === "auth/user-disabled") {
            toast.error("Your account has been disabled. Contact support.");
            } else if (errorCode === "auth/user-not-found") {
            toast.error("No account found with this email. Please sign up first.");
            } else if (errorCode === "auth/wrong-password") {
            toast.error("Incorrect password. Try again!");
            } else if (errorCode === "auth/too-many-requests") {
            toast.warn("Too many failed attempts. Please wait and try again later.");
            } else if (errorCode === "auth/network-request-failed") {
            toast.error("Network error. Please check your internet connection.");
            } else if (errorCode === "auth/invalid-credential") {
            toast.error("Invalid credentials. Please try again.");
            } else if (errorCode === "auth/operation-not-allowed") {
            toast.error("This login method is not enabled on the server.");
            } else if (errorCode === "auth/requires-recent-login") {
            toast.info("Please log in again to continue.");
            } else {
            toast.error("Unknown error occurred: " + e.message);
            }
        })

    };





    return (
      <div className="hero bg-blue-500 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            </div>
            <div className="card bg-white/15 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSignup} > 
                <fieldset className="fieldset text-white">
                {/* Name */}
                <label className="label">Name</label>
                <input type="text" name='name' className="input bg-white/10 backdrop-blur-sm" placeholder="Your name" />
                {/* PhotoURL */}
                <label className="label">PhotoURL</label>
                <input type="text" name='photo' className="input bg-white/10 backdrop-blur-sm" placeholder="Your PhotoURL" />
                {/* Email */}
                <label className="label">Email</label>
                <input type="email" name='email' className="input bg-white/10 backdrop-blur-sm" placeholder="Email" />
                {/* Password */}
                <label className="label">Password</label>
               <div className='relative'>
                 <input type={show? "text": "password"} name='password' className="input bg-white/10 backdrop-blur-sm" placeholder="Password" />
                 <span onClick={()=> setShow(!show)} className='absolute right-8 top-[14px] cursor-pointer z-20'>
                    {show? <FaEye/>: <IoEyeOff/>}
                 </span>
               </div>
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Sign Up</button>
                </fieldset>
                <p className='text-white'>Already have an account? <Link to={"/signin"} className=" text-white hover:text-purple-500">Sign in</Link></p>
                </form>
                {/* Divider */}
                <div className="flex w-full flex-col">
                <div className="divider text-white">OR</div>
                </div>

                {/* Google */}
                <button className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Signup;