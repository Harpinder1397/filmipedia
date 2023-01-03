import React from 'react';
import SingleThread from "./SingleThread";

const MessagesSideBar = ({chat, handleThreadClick}) => {

	return (
		<div className="sideBar-container">
			{
				chat && chat.length && chat.map((thread) => 
					<SingleThread thread={thread} handleThreadClick={handleThreadClick} />
				)
			}
		</div>
	)
}

export default MessagesSideBar;