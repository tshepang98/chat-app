import React from 'react';

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp
        </h1>
        <form>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Full Name</span>
                </label>
                <input type='text' placeholder='John Doe' className='w-full input input-border h-10'/>
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type='text' placeholder='JohnDoe' className='w-full input input-border h-10'/>
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type='text' placeholder='enter password' className='w-full input input-border h-10'/>
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Confirm Password</span>
                </label>
                <input type='text' placeholder='confirm password' className='w-full input input-border h-10'/>
            </div>
            
            <div>
                <button className='btn btn-block btn-sm mt-2'>SignUp</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
