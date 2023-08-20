import React, { useEffect, useState } from 'react';
import { problems } from '@/mockProblems/problems';
import { BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';


type ProblemsTableProps = {
   
};

const ProblemsTable:React.FC<ProblemsTableProps> = () => {
   const [youtubePlayer,setYoutubePlayer] = useState({isOpen:false,videoId:''})
   const handleYoutubeClick = (videoId:string) => {
      setYoutubePlayer({isOpen:true,videoId})
   }
   const closePlayer = () => {
      setYoutubePlayer({isOpen:false,videoId:''})
   }
   useEffect(() => {
      window.addEventListener('keydown',(e) => {
         if(e.key === 'Escape'){
            closePlayer()
         }
      })
   })
   
   return (
			<>
				<tbody className='text-white'>
					{problems.map((problem, idx) => {
						const difficultyColor =
							problem.difficulty === 'Easy'
								? 'text-dark-green-s'
								: problem.difficulty === 'Medium'
								? 'text-dark-yellow'
								: 'text-dark-pink';
						return (
							<tr
								className={`${idx % 2 === 1 ? 'bg-dark-layer-1' : ''}`}
								key={problem.id}
							>
								<th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
									<BsCheckCircle
										fontSize={'18'}
										width='18'
										className='inline-block mr-1 text-green-500'
									/>
								</th>
								<td className='px-6 py-4'>
									<Link
										href={`/problems/${problem.id}`}
										className='hover:text-blue-600 cursor-pointer'
									>
										{problem.title}
									</Link>
								</td>
								<td className={`px-6 py-4 ${difficultyColor}`}>
									{problem.difficulty}
								</td>
								<td className='px-6 py-4'>{problem.category}</td>
								<td
									className='px-6 py-4'
									onClick={() => handleYoutubeClick(problem.videoId || '')}
								>
									{problem.videoId ? (
										<AiFillYoutube
											fontSize={'28'}
											className='cursor-pointer hover:text-red-600'
										/>
									) : (
										<p className='text-gray-400 font-semibold'>Coming Soon</p>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
				{youtubePlayer.isOpen && (
					<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center '>
						<div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={closePlayer}></div>
						<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
							<div className='w-full h-full flex items-center justify-center relative'>
								<div className='w-full relative'>
									<IoClose
										fontSize={'35'}
										className='cursor-pointer absolute -top-16 right-0'
                              onClick={closePlayer}
									/>
									<YouTube
										videoId={youtubePlayer.videoId}
										loading='lazy'
										iframeClassName='w-full min-h-[500px]'
									/>
								</div>
							</div>
						</div>
					</tfoot>
				)}
			</>
		);
}
export default ProblemsTable;