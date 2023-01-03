import React from 'react';

const SingleMessage = ({message}) => {

	return (
        <div 
            className={`single-message-container ${message.owned && "ml-40"}`}
        >
            <div className="d-flex justify-content-between thread-meta">
                <span>
                {message.from}
                </span>
                <span className="thread-date">
                {message.date}
                </span>
            </div>
            <div className="thread-message">
                {message.message}
            </div>
		</div>
	)
}

export default SingleMessage;