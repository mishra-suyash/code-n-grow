import { set } from 'firebase/database';
import React, { useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModal';

type PreferenceNavbarProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNavbar: React.FC<PreferenceNavbarProps> = ({setSettings,settings}) => {
	const [isFullScreen, setIsFullScreen] = React.useState(false);
	const handleFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			setIsFullScreen(false);
		} else {
			document.documentElement.requestFullscreen();
			setIsFullScreen(true);
		}
	}
	const handleSettingsClick = () => {
		setSettings({ ...settings, settingsModalIsOpen: true });
	}

	useEffect(() => {
		function exitHandler() {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}
		if(document.addEventListener){
			document.addEventListener('fullscreenchange', exitHandler);
			document.addEventListener('webkitfullscreenchange', exitHandler);
			document.addEventListener('mozfullscreenchange', exitHandler);
			document.addEventListener('MSFullscreenChange', exitHandler);
		}
	},[isFullScreen])

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
			<div className='flex items-center text-white pl-3'>
				<button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium'>
					<div className='flex items-center px-1'>
						<div className='text-xs text-label-2 dark:text-dark-label-2'>
							JavaScript
						</div>
					</div>
				</button>
			</div>

			<div className='flex items-center m-2'>
				<button
					className=' preference-button group'
					onClick={handleSettingsClick}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preference-tooltip'>Settings</div>
				</button>

				<button className='preference-button group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? (
							<AiOutlineFullscreen />
						) : (
							<AiOutlineFullscreenExit />
						)}
					</div>
					<div className='preference-tooltip'>Full Screen</div>
				</button>
			</div>
			{settings.settingsModalIsOpen && (
				<SettingsModal settings={settings} setSettings={setSettings} />
			)}
		</div>
	);
};
export default PreferenceNavbar;
