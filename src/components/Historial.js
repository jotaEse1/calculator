import React from 'react';
import {useTransition, animated, config} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const Historial = ({handleDeleteHistorial, historial, historialVacio}) => {
    const transition = useTransition(historialVacio, {
        from: {x: 0, y: -10, opacity: 0},
        enter: {x: 0, y: 0,opacity: 1 },
        leave: {x: 0, y: 10,opacity: 0},
        reverse: historialVacio,
        exitBeforeEnter: true,
        config: config.stiff
    })

    return (
        <div className='historial'>
            <div className='historial-boton'>
                <button onClick={() => handleDeleteHistorial()} ><FontAwesomeIcon icon={faTrashAlt}/></button> 
            </div>
            <div className='historial-calculos'>
                {transition((style, item) => 
                    item? (
                        <animated.p style={style} className='historial-p'>Aún no hay historial</animated.p> 
                    ):(
                        historial.map((e,y) => <animated.p style={style} key={y + 1}>{e}</animated.p>)
                    ) 
                )}
                
            </div>            
        </div>
    );
};

export default Historial;