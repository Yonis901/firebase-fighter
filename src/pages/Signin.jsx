import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';



const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


const Signin = () => {
    const [user, setUser] = useState(null);
     const [show, setShow] = useState(false);
    //  const [email, setEmail] = useState(null); 
    const emailRef = useRef(null);
    
    
    
// Google Signin 
     const handleGoogleSignin = ()=> {
        signInWithPopup(auth, googleProvider)
       .then(res => {
                console.log(res);
                setUser(res.user);
                toast.success("Signin with Google Successfull!");
            })
            .catch((e)=>{
                console.log(e);
               toast.error(e.message);
            })
     };

    //  GitHub Signin 
    const handleGitHubSignin = (e)=>{
        e.preventDefault();
        // console.log("GIthub Clicked");
        signInWithPopup(auth, gitHubProvider)
        .then(res => {
                console.log(res);
                setUser(res.user);
                console.log(res.user);
                toast.success("Signin with GitHub Successfull!");
            })
            .catch((e)=>{
                console.log(e);
               toast.error(e.message);
            })

    };



    
        const handleSignin = (e)=> {
            e.preventDefault();
            const email = e.target.email?.value;
            const password = e.target.password?.value;
            // console.log("signin function entered.", {email, password});
    
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
            }
    
    
    
            signInWithEmailAndPassword(auth, email, password).then(res => {
                if(!res.user?.emailVerified){
                    toast.error("Your email is not verified.")
                    return;
                }
                console.log(res);
                setUser(res.user);
                toast.success("Signin Successfull!");
            })
            .catch((e)=>{
                console.log(e);
               toast.error(e.message);
            })
        };


const handleSignOut = ()=>{


    console.log("Signout clicked")
    signOut(auth).then(()=> {
        toast.success("Sign Out Successfull!")
        setUser(null);
    }).catch(e => {
        toast.error(e.message);
    })

}

const handleFrogetPassword =()=> {
console.log(emailRef.current.value);
const email = emailRef.current.value;
 sendPasswordResetEmail(auth, email).then(() => {
    toast.success("Check you email to reset password.");
 }).catch(e=> {
    toast.error(e.message);
 })
};


    return (

      <div className="hero bg-blue-500 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            </div>
            <div className="card bg-white/15 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl">

                {user?
                (
                    <div className='text-center space-y-3 p-5'>
                        <img className='rounded-full p-4 mx-auto ' src={user?.photoURL || "data:image/jpeg;base64,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"} alt="" />
                        <h2 className='text-xl font-semebold'>{user?.displayName}</h2>
                        <p className='text-white'>{user?.email}</p>
                        <button onClick={handleSignOut}  className={"btn bg-blue-500 hover:bg-purple-500  text-white"}>Sign Out</button>
                    </div>
                    

                ):(
            <div className="card-body">
                <form onSubmit={handleSignin} > 
                <fieldset className="fieldset text-white">
                <label className="label">Email</label>
                <input ref={emailRef} type="email" name='email' className="input bg-white/10 backdrop-blur-sm" placeholder="Email" />
                <label className="label">Password</label>
               <div className='relative'>
                 <input type={show? "text": "password"} name='password' className="input bg-white/10 backdrop-blur-sm" placeholder="Password" />
                 <span onClick={()=> setShow(!show)} className='absolute right-8 top-[14px] cursor-pointer z-20'>
                    {show? <FaEye/>: <IoEyeOff/>}
                 </span>
               </div>
                <div><button onClick={handleFrogetPassword} type='button' className="link link-hover">Forgot password?</button></div>
                <button className="btn btn-neutral mt-4">Sign in</button>
                </fieldset>
                <p className='text-white'>New to our webstie? <Link to={"/signup"} className="hover:text-purple-500 text-white">SignUp</Link></p>
                </form>

                {/* Divider */}
                <div className="flex w-full flex-col">
                <div className="divider text-white">OR</div>
                </div>

                {/* Google */}
                <button onClick={handleGoogleSignin} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Continue with Google
                </button>


                {/* GitHub */}
                <button onClick={handleGitHubSignin} className="btn bg-black text-white border-black">
                <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                Continue with GitHub
                </button>
            </div>

                    )
                }

            </div>
        </div>
        </div>
    );
};

export default Signin;