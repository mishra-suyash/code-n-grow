import HomePageContent from '@/components/Home/HomePageContent';
import Topbar from '@/components/Topbar/Topbar'

export default function Home() {
	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				<HomePageContent />
			</main>
		</>
	);
}
