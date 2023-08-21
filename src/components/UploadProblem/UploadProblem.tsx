import { firestore } from '@/firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import React from 'react';

type UploadProblemProps = {};

const UploadProblem: React.FC<UploadProblemProps> = () => {
	const [inputs, setInputs] = React.useState({
		id: '',
		title: '',
		difficulty: '',
		category: '',
		order: '',
		videoId: '',
		link: '',
		likes: 0,
		dislikes: 0,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newProblem = { ...inputs, order: parseInt(inputs.order) };
		await setDoc(doc(firestore, 'problems', inputs.id), newProblem);
		alert('Problem uploaded successfully');
	};

	return (
		<form className='p-6 flex flex-col max-w-sm gap-3' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Problem ID'
				name='id'
				value={inputs.id}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Title'
				name='title'
				value={inputs.title}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Difficulty'
				name='difficulty'
				value={inputs.difficulty}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Category'
				name='category'
				value={inputs.category}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Order'
				name='order'
				value={inputs.order}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Video ID (Optional)'
				name='videoId'
				value={inputs.videoId}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>
			<input
				type='text'
				placeholder='Problem Link (Optional)'
				name='link'
				value={inputs.link}
				onChange={(e) =>
					setInputs({ ...inputs, [e.target.name]: e.target.value })
				}
			/>

			<button
				type='submit'
				className='bg-brand-orange py-2 rounded-lg hover:bg-white'
			>
				Push to Database
			</button>
		</form>
	);
};
export default UploadProblem;
