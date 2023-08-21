import Topbar from '@/components/Topbar/Topbar';
import React, { useEffect, useState } from 'react';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from '@/utils/problems';
import { DBProblem, Problem } from '@/utils/types/problem';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

type ProblemPageProps = {
	problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {

	return (
		<div>
			<Topbar problemPage />
			<Workspace problem={problem} />
		</div>
	);
};
export default ProblemPage;

// fetch the local data
// SSG
// getStaticPaths => this creates the dynamic routes for the problems
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((pid) => ({
		params: { pid },
	}));
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];
	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}
