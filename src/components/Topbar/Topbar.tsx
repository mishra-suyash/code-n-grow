import React, { use } from 'react';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
	const [user, loading, error] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleSignInClick = () => {
		setAuthModalState((oldState) => ({ ...oldState, isOpen: true,type:'login' }));
	}

	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div
				className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}
			>
				<Link href='/' className='h-[30px] flex-1'>
					<img src='/logo-full.png' alt='Logo' className='h-full' />
				</Link>

				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						<a
							href='mishrasuyash.vercel.app'
							target='_blank'
							rel='noreferrer'
							className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
						>
							Premium
						</a>
					</div>
					{!user && (
						<Link href='/auth' onClick={handleSignInClick}>
							<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>
								Sign In
							</button>
						</Link>
					)}
					{user && (
						<div className='cursor-pointer group relative '>
							<img
								src={user.photoURL || '/avatar.png'}
								alt='avatar'
								className='h-8 w-8 rounded-full object-cover'
							/>
							<div className='absolute -top-2 -right-2 w-3 h-3 rounded-full bg-green-500 border-2 border-white group-hover:bg-green-500'></div>
							<div className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
					{user&&<Logout />}
				</div>
			</div>
		</nav>
	);
};
export default Topbar;
