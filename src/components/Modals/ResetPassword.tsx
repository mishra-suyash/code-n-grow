import React, { use, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(auth);

	useEffect(() => {
		if (error) {
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 3000,
				theme:"dark"
			});
		}
	}, [error]);

	const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
		setAuthModalState((oldState) => ({ ...oldState, type: type }));
	};

	const [inputs, setInputs] = useState({
		email: '',
	});
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		console.log(inputs);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputs.email === '') return toast.error('Email is required', {
			position: 'top-center',
			autoClose: 3000,
			theme:"dark"
		});
		const success = await sendPasswordResetEmail(inputs.email);
		if (success) {
			toast.success('Email sent successfully', {
				position: 'top-center',
				autoClose: 3000,
				theme:"dark"
			});
		}
	};

	return (
		<form
			className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8'
			onSubmit={handleSubmit}
		>
			<h3 className='text-xl font-medium  text-white'>Reset Password</h3>
			<p className='text-sm text-white '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll
				send you an e-mail allowing you to reset it.
			</p>
			<div>
				<label
					htmlFor='email'
					className='text-sm font-medium block mb-2 text-gray-300'
				>
					Your email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
					onChange={handleChangeInput}
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange-s hover:bg-brand-orange border-2 border-transparent hover:border-white transition duration-200 `}
			>
				{loading ? 'Sending Email...' : 'Reset Password'}
			</button>
			<div className='text-sm font-medium text-gray-500'>
				Remember your password?&nbsp;
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
export default ResetPassword;
