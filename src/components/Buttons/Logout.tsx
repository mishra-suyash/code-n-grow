import { FiLogOut } from 'react-icons/fi';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import React ,{ useState,useEffect } from 'react';


type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
   const [isLoading,setIsLoading] = useState(false)
   const [signOut,loading,error] = useSignOut(auth)
   const handleLogout = () => {
      setIsLoading(true)
      signOut()
   };
   useEffect(() => {
			if (!loading && !error) {
				setIsLoading(false);
			}
		}, [loading, error]);

   if(isLoading) {
      return <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand-orange"></div>
   </button>;
   }

	return <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
      <FiLogOut />
   </button>;
};
export default Logout;
