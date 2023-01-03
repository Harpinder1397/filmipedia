import React from 'react';

const SingleThread = ({thread, handleThreadClick}) => {

	return (
        <div 
            className="thread-container" 
            onClick={() => handleThreadClick(thread.id)}
        >
            <div className="d-flex justify-content-between thread-meta">
                <span>
                {thread.from}
                </span>
                <span className="thread-date">
                {thread.date}
                </span>
            </div>
            <div className="thread-message">
                {thread.message}
            </div>
			
		</div>
	)
}

export default SingleThread;