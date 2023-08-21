import Link from 'next/link';
import React from 'react';
import { BsList } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type ProblemListWidgetProps = {
   
};

const ProblemListWidget:React.FC<ProblemListWidgetProps> = () => {
   
   return (
			<div className='flex items-center gap-4 justify-center '>
				<div className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer p-2'>
					<FaChevronLeft className='text-white' />
				</div>
				<Link
					href='/'
					className='flex items-center gap-2 w-full max-w-[170px] text-dark-gray-8 mx-auto cursor-pointer font-semibold justify-center'
				>
					<div>
						<BsList className='h-6 w-6 font-bold' />
					</div>
					<p>Problem List</p>
				</Link>
				<div className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer p-2'>
					<FaChevronRight className='text-white' />
				</div>
			</div>
		);
}
export default ProblemListWidget;