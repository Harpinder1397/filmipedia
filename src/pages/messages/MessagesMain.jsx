import React from 'react';
import SingleMessage from "./SingleMessage";
import { Input } from "antd";

const MessagesMain = ({messages}) => {

	return (
        <div className="messagesMain-container">
            <div className="messagesMain-singleMsg-container">
                {
                    messages && messages.length && messages.map((message) => 
                        <SingleMessage message={message} />
                    )
                }
            </div>
            <div className="text-area">
                <Input.TextArea type="text"/>
            </div>
        </div>
	)
}

export default MessagesMain;