import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar';
import React, { useEffect,useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
   const authModal = useRecoilValue(authModalState)
	const [pageLoading, setPageLoading] = useState(true);
   const [user,loading,error] = useAuthState(auth)
	const router = useRouter();
	useEffect(() => {
		if (user) {
			router.replace('/');
		}
		if(!loading && !user){
			setPageLoading(false)
		}
	},[user,router,loading])
	if(pageLoading) return <div className="h-screen bg-black">
		<div className="flex items-center justify-center h-full">
			<Image src='/logo-full.png' alt='logo' width={150} height={50} />
		</div>
	</div>

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
            <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
					<Image src='/hero.png' alt='logo' width={750} height={750}  />
            </div>
            {authModal.isOpen &&<AuthModal />}
			</div>
		</div>
	);
};
export default AuthPage;
