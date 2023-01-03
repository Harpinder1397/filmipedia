import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';

const TestTask = () => {
  const [defTime, setDefTime] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [pause, setPause] = useState(false);

  const handleStart = () => {
    const secDiff = defTime?.sec - 60;
    const diff = defTime?.sec % 60;
    const multiplier = defTime?.sec / 60;
    if (secDiff < 0 ) return setCurrentTime(defTime)
    if (diff > 0 && multiplier < 1) return setCurrentTime({min: defTime.min + 1, sec: diff}) 
    if (multiplier > 1) return setCurrentTime({min: (defTime.min + parseInt(multiplier, 10)), sec: diff})
  }

  useEffect(() => {
    if (pause) return null;
    const startTimer = setInterval(() => {
      setCurrentTime({...currentTime, sec: currentTime?.sec - 1})
    }, 1000)
    return () => {
      clearInterval(startTimer)
    }
  }, [currentTime?.sec, pause])

  return (
    <>
      <div>
        <Input 
          type="number" 
          value={defTime?.min || ''} 
          onChange={(e) =>  setDefTime({ ...defTime, min: parseInt(e.target.value, 10)})}
        />
        <Input type="number" value={defTime?.sec || ''} onChange={(e) => setDefTime({ ...defTime, sec: parseInt(e.target.value, 10)})} />
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={() => setPause(!pause)}>Resume</Button>
        <Button onClick={handleStart}>Reset</Button>
      </div>
      <div> 
        {
          currentTime?.min ?
          <>
            {currentTime?.min} : {currentTime?.sec}
          </>
          : null
        }
        
      </div>
    </>
  )
}

export default TestTask