import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBackspace} from '@fortawesome/free-solid-svg-icons'


const Botones = ({handleValues, handleAC, handleIgual, handleDecimal, handleDelete}) => {
    return (
        <div className='botones'>
            <div className='row-1'>
                <button onClick={() => handleAC()} value='AC'>AC</button>
                <button onClick={(e) => handleValues(e.target.value)} value='+' name='operators'>+</button>    
            </div>
            <div className='row-2'>
                <button onClick={(e) => handleValues(e.target.value)} value='7'>7</button>
                <button onClick={(e) => handleValues(e.target.value)} value='8'>8</button>
                <button onClick={(e) => handleValues(e.target.value)} value='9'>9</button>
                <button onClick={(e) => handleValues(e.target.value)} value='-' name='operators'>-</button>    
            </div>
            <div className='row-3'>
                <button onClick={(e) => handleValues(e.target.value)} value='4'>4</button>
                <button onClick={(e) => handleValues(e.target.value)} value='5'>5</button>
                <button onClick={(e) => handleValues(e.target.value)} value='6'>6</button>
                <button onClick={(e) => handleValues(e.target.value)} value='x' name='operators'>x</button>    
            </div>
            <div className='row-4'>
                <button onClick={(e) => handleValues(e.target.value)} value='1'>1</button>
                <button onClick={(e) => handleValues(e.target.value)} value='2'>2</button>
                <button onClick={(e) => handleValues(e.target.value)} value='3'>3</button>
                <button onClick={(e) => handleValues(e.target.value)} value='/' name='operators'>/</button>    
            </div>
            <div className='row-5'>
                <button onClick={(e) => handleValues(e.target.value)} value='0'>0</button>
                <button onClick={(e) => handleDecimal(e.target.value)} value='.'>.</button>
                <button onClick={() => handleDelete()} value='d'><FontAwesomeIcon icon={faBackspace}/></button>              
                <button onClick={() => handleIgual()} value='res'>=</button><br />    
            </div>   
        </div>
    );
};

export default Botones;