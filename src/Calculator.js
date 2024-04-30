import React, {useState, useEffect} from 'react'
import './Calculator.css';

export default function Calculator() {

    const [disvalue, setDisvalue] = useState('');

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        const { key } = event;
        if (key === 'Enter') {
            handleButton('=');
        } else if ((key >= '0' && key <= '9') || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
            
            handleButton(key);
        } else if (key === 'Backspace') {
            
            setDisvalue(disvalue.slice(0, -1));
        }
    };
    
    const handleButton = (value) =>  {
        if(value === 'C') {
            setDisvalue('');
        }
        else if(value === '=') {
            try {
                const result = eval(disvalue);
                setDisvalue(result.toString());
            }
            catch(error) {
                setDisvalue('Error');
            }
        }
        else if(value === 'Del') {
            setDisvalue(disvalue.slice(0, -1));
        }
        else {
            setDisvalue(disvalue + value);
        }
    }

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C', 'Del'
        ];

  return (
    <div className='outer'>
        <div className='output'>
            <textarea value={disvalue} disabled></textarea>
        </div>
        <div className='buttons'>
            {buttons.map((button, index) => (
                <button key={index} onClick={() => handleButton(button)}>{button}</button>
            ))}
        </div>
    </div>
  )
}
