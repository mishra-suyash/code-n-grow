import { problems } from '@/utils/problems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import next from 'next/types';
import React from 'react';
import { BsList } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type ProblemListWidgetProps = {
   
};

const ProblemListWidget:React.FC<ProblemListWidgetProps> = () => {
	const router = useRouter();

   const handleProblemChange = (isForward:boolean) => {
		const {order}=problems[router.query.pid as string]
		const direction=isForward?1:-1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find(key=>problems[key].order===nextProblemOrder)
		console.log('nextProblemKey', nextProblemKey);
		if(isForward && !nextProblemKey){
			const firstProblemKey = Object.keys(problems).find(key=>problems[key].order===1)
			router.push(`/problems/${firstProblemKey}`)
		}
		else if(!isForward && !nextProblemKey){
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		}
		else{
			router.push(`/problems/${nextProblemKey}`)
		}

	}


   return (
			<div className='flex items-center gap-4 justify-center '>
				<div
					className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer p-2'
					onClick={() => handleProblemChange(false)}
				>
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
				<div
					className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer p-2'
					onClick={() => handleProblemChange(true)}
				>
					<FaChevronRight className='text-white' />
				</div>
			</div>
		);
}
export default ProblemListWidget;