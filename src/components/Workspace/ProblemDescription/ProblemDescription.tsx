import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import { DBProblem, Problem } from '@/utils/types/problem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { get } from 'http';
import { set } from 'firebase/database';
import { toast } from 'react-toastify';

type ProblemDescriptionProps = {
	problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
	const { currentProblem, loading, problemDifficultyClass } =
		useGetCurrentProblem(problem.id);
	const { liked, disliked, starred, solved, setUserData } = useGetUserDataForCurrentProblem(problem.id)
	const [user] = useAuthState(auth);

	const handleLike = async () => {
		if(!user){
			toast.error('Please login to like the problem',{position:'top-left',theme:'dark'})
			return
		}
	}

	return (
		<div className='bg-dark-layer-1 my'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div
					className={
						'bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer'
					}
				>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>
								{problem.title}
							</div>
						</div>
						{!loading && currentProblem && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentProblem.difficulty}
								</div>
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<BsCheck2Circle />
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
									onClick={handleLike}
								>
									<AiFillLike
										className={`cursor-pointer ${
											liked ? 'text-dark-blue-s' : ''
										}`}
									/>
									<span className='text-xs'>{currentProblem.likes}</span>
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'>
									<AiFillDislike
										className={`cursor-pointer ${
											disliked ? 'text-dark-blue-s' : ''
										}`}
									/>
									<span className='text-xs'>{currentProblem.dislikes}</span>
								</div>
								<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '>
									<TiStarOutline />
								</div>
							</div>
						)}
						{loading && (
							<div className='mt-3 flex space-x-2 '>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div
								dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
							/>
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{problem.examples.map((example, index) => (
								<div key={example.id}>
									<p className='font-medium text-white '>
										Example {index + 1}:{' '}
									</p>
									{example.img && (
										<div className='my-2'>
											<Image
												src={example.img}
												alt={''}
												className='mt-3'
												width='600'
												height='600'
											/>
										</div>
									)}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong>{' '}
											{example.inputText}
											<br />
											<strong>Output:</strong> {example.outputText} <br />
											<strong>Explanation:</strong> {example.explanation}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-5 pb-8'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc'>
								<div
									dangerouslySetInnerHTML={{ __html: problem.constraints }}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState(true);
	const [problemDifficultyClass, setProblemDifficultyClass] =
		useState<string>('');
	useEffect(() => {
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore, 'problems', problemId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty.toLowerCase() === 'easy'
						? 'bg-olive text-olive'
						: problem.difficulty.toLowerCase() === 'medium'
						? 'bg-dark-yellow text-dark-yellow'
						: 'bg-dark-pink text-dark-pink'
				);
			}
			setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);
	console.log(currentProblem);
	return { currentProblem, loading, problemDifficultyClass };
}

function useGetUserDataForCurrentProblem(problemId: string) {
	const [userData, setUserData] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});
	const [user] = useAuthState(auth);
	useEffect(() => {
		const getUserDataForCurrentProblem = async () => {
			const userRef = doc(firestore, 'users', user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const userData = userSnap.data();
				const {
					solvedProblems,
					likedProblems,
					dislikedProblems,
					starredProblems,
				} = userData!;
				setUserData({
					liked: likedProblems.includes(problemId),
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};
		if (user) getUserDataForCurrentProblem();
		return () =>
			setUserData({
				liked: false,
				disliked: false,
				starred: false,
				solved: false,
			});
	}, [problemId, user]);
	return { ...userData, setUserData };
}
