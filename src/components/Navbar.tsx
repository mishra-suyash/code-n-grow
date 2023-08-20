import { authModalState } from '@/atoms/authModalAtom';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type NavbarProps = {
   
};

const Navbar:React.FC<NavbarProps> = () => {
   const setAuthModalState=useSetRecoilState(authModalState)
   const handleClick = () => {
      setAuthModalState((oldState)=>({...oldState,isOpen:true}))
   }
   
   return <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
      <Link href='/' className='flex items-center justify-center h-20 '>
         <img src='/logo-full.png' alt='logo' className='h-12' />
      </Link>
      <div className="flex items-center">
         <button className='bg-brand-orange text-white px-4 py-2 md:px-4 text-sm font-medium rounded-lg hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange cursor-pointer border-2 border-transparent transition duration-200' onClick={handleClick}>Sign In</button>
      </div>
      
   </div>
}
export default Navbar;