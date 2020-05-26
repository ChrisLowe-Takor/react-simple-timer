import React, { useState, useEffect } from 'react';
import { useInterval } from './useInterval';

const Timer: React.FC = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useInterval( () => {
        if (seconds === 59) {
            setSeconds(0);
            setMinutes(minutes + 1)
        } else {
            setSeconds(seconds + 1)
        }
    }, isRunning ? 1000 : null)

    useEffect(() =>{
        if (minutes === 60) {
            setMinutes(0)
            setHours(hours + 1)
        }
    }, [minutes]);

    const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0')

    return (
        <React.Fragment>
            <div className="timer-container">
                { zeroPad(hours, 2) } : { zeroPad(minutes, 2)} : { zeroPad(seconds, 2)}
            </div>

            { isRunning ?
                <button onClick={() => {
                    setIsRunning(false);
                }}>Stop</button>
            :
                <React.Fragment>
                    <div style={{display: 'inline-block'}}>
                    <button onClick={() => {
                        setIsRunning(true);
                    }}>Start</button>

                    { seconds > 0 || minutes > 0 ?
                        <button style={{marginLeft: '30px'}} onClick={() => {
                            setSeconds(0);
                            setMinutes(0);
                            setHours(0);
                            setIsRunning(false);
                        }}>Reset</button>
                    : null}
                    </div>
                </React.Fragment>
            }

            
        </React.Fragment>
    )
};

export default Timer;