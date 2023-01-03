import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import './messages.less'
import MessagesSideBar from './MessagesSideBar';
import MessagesMain from './MessagesMain';

const chat = [
	{
		id: 1,
		from: 'Amrinder',
		message: 'hi everyone',
		date: '21-07-2021'
	},
	{
    id: 2,
		from: 'Singh',
		message: 'hi testing',
		date: '22-07-2021',
	}
]

const messages = [
  {
    id: 1,
    feed: [
      {
        from: 'Singh',
        message: 'hi testing',
        date: '21-07-2021',
        owned: false
      },
      {
        from: 'Singh',
        message: 'hi testing',
        date: '21-07-2021',
        owned: true
      }
    ]
  },
  {
    id: 2,
    feed: [
      {
        from: 'Singh',
        message: 'hi testing',
        date: '22-07-2021',
        owned: true
      },
      {
        from: 'Singh',
        message: 'hi testing',
        date: '22-07-2021',
        owned: false
      }
    ]
  }
]

const Messages = () => {
  const [selectedThread, setSelectedThread] = useState([])
  const handleThreadClick = (id) => {
    const selectedThread = messages.find((item) => item.id === id).feed
    setSelectedThread(selectedThread);
  }

  useEffect(() => {
    handleThreadClick(1)
  }, [])

  return (
    <div className="message-container">
      <Row>
        <Col span={6}>
          <MessagesSideBar chat={chat} handleThreadClick={handleThreadClick} />
        </Col>
        <Col span={18}>
          <MessagesMain messages={selectedThread} />   
        </Col>
      </Row>
    </div>
  )
}

export default Messages;