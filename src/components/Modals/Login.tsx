import React, { useState,useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
   const router = useRouter()
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
		setAuthModalState((oldState) => ({ ...oldState, type: type }));
	};
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});
   const [signInWithEmailAndPassword, user, loading, error] =
			useSignInWithEmailAndPassword(auth);
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!inputs.email || !inputs.password) return toast.warning('Please fill all the fields', {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
      const { email, password } = inputs;
      try {
         const user = await signInWithEmailAndPassword(email,password)
         if(!user) return;
         router.push('/')
      } catch (error:any) {
         toast.error(error.message, {
						position: 'top-center',
						autoClose: 3000,
						theme: 'dark',
					});
      }
   }
   useEffect(() => {
      if(error){
         toast.error(error.message, {
						position: 'top-center',
						autoClose: 3000,
						theme: 'dark',
					});
      }
   },[error])
	return (
		<form action='' className='space-y-6 px-6 py-4' onSubmit={handleSubmit}>
			<h3 className='text-xl font-medium text-white'>
				Sign In to your account
			</h3>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-600 mb-2'
				>
					Your Email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='yourname@company.com'
					onChange={handleChangeInput}
				/>
			</div>
			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-600 mb-2'
				>
					Your Password
				</label>
				<input
					type='password'
					name='password'
					id='password'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='********'
					onChange={handleChangeInput}
				/>
			</div>
			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange-s '
			>
				{loading?'Loading...':'Sign In'}
			</button>
			<button className='flex w-full justify-end'>
				<a
					href='#'
					className='text-sm block text-slate-500 hover:underline w-full text-right'
					onClick={() => handleClick('forgotPassword')}
				>
					Forgot Password
				</a>
			</button>
			<div className='text-sm font-medium text-gray-500'>
				Not Registered?
				<a
					className='text-blue-700 hover:underline cursor-pointer'
					onClick={() => handleClick('register')}
				>
					&nbsp;Create Account
				</a>
			</div>
		</form>
	);
};
export default Login;
