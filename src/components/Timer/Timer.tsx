import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { TimerIcon } from '../Icons/Icons';
import { AiFillCloseSquare, AiOutlinePause, AiOutlinePlaySquare } from 'react-icons/ai';

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
	const [showTimer, setShowTimer] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [startTime, setStartTime] = useState<number>(0);
	const [time, setTime] = useState<number>(0);

	const formatTime = (time: number): string => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? '0' + hours : hours}:${
			minutes < 10 ? '0' + minutes : minutes
		}:${seconds < 10 ? '0' + seconds : seconds}`;
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (isPaused) return;
		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer, isPaused]);

	const handleTimerClick = () => {
		if (isPaused) {
			setTime(startTime);
			setIsPaused(false);
		} else {
			setStartTime(time);
			setIsPaused(true);
		}
	};
   const handleClose = () => {
      setShowTimer(false)
      setTime(0)
      setStartTime(0)
   }
	return (
		<div>
			{showTimer ? (
				<div className='flex items-center space-x-2 bg-dark-fill-3 py-1.5 cursor-pointer hover:bg-dark-fill-2 p-2 rounded-md'>
					<div>{formatTime(time)}</div>
					<div
						className='text-white  hover:scale-110 hover:text-brand-orange'
						onClick={() => handleTimerClick()}
					>
						{!isPaused ? <AiOutlinePause /> : <AiOutlinePlaySquare />}
					</div>
					<FiRefreshCcw
						className='text-white hover:text-dark-pink hover:scale-110'
						onClick={() => {
							setTime(0);
							setStartTime(0);
						}}
					/>
					<div onClick={handleClose}>
						<AiFillCloseSquare className='text-white hover:text-dark-pink hover:scale-130' />
					</div>
				</div>
			) : (
				<div
					className='flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer'
					onClick={() => setShowTimer(true)}
				>
					<TimerIcon className={'!h-6 !w-6 font-bold'} />
				</div>
			)}
		</div>
	);
};
export default Timer;
