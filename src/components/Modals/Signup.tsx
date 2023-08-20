import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword, } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
   const router = useRouter()
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
		setAuthModalState((oldState) => ({ ...oldState, type: type }));
	};
	const [inputs, setInputs] = useState({
		email: '',
		displayName: '',
		password: '',
	});
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
      if(!inputs.email || !inputs.displayName || !inputs.password) return (toast.warning('Please fill all the fields', {
			position: 'top-center',
			autoClose: 3000,
			theme: 'dark',
		}))

      const { email, displayName, password } = inputs;
      try {
         const newUser = await createUserWithEmailAndPassword(email,password)
         if(!newUser) return;
         router.push('/')
      } catch (error:any) {
         toast.error(error.message, {
						position: 'top-center',
						autoClose: 3000,
						theme: 'dark',
					});
      }
	};

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
				Create An Account account
			</h3>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-600 mb-2'
				>
					Email
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
					htmlFor='displayName'
					className='block text-sm font-medium text-gray-600 mb-2'
				>
					Display Name
				</label>
				<input
					type='displayName'
					name='displayName'
					id='displayName'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='Suyash Mishra'
					onChange={handleChangeInput}
				/>
			</div>
			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-600 mb-2'
				>
					Password
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
				{loading?'Registering...':'Sign Up'}
			</button>
			<div className='text-sm font-medium text-gray-500'>
				Already Registered?
				<a
					className='text-blue-700 hover:underline cursor-pointer'
					onClick={() => handleClick('login')}
				>
					&nbsp;Login
				</a>
			</div>
		</form>
	);
};
export default Signup;
