import React, { useState } from 'react';
import Botones from './components/Botones';
import Formula from './components/Formula';
import Resultado from './components/Resultado';
import Historial from './components/Historial';
import {useTransition, animated, config} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalculator, faHistory} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
    const [formula, setFormula] = useState(0);
    const [resultado, setResultado] = useState(0);
    const [operaciones, setOperaciones] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [historialVisible, setHistorialVisible] = useState(false);
    const [historialVacio, sethistorialVacio] = useState(true);

    const transition = useTransition(historialVisible, {
        from: {x: 0, y: -10, opacity: 0},
        enter: {x: 0, y: 0,opacity: 1 },
        leave: {x: 0, y: 10,opacity: 0},
        reverse: historialVisible,
        exitBeforeEnter: true,
        config: config.stiff
        
    })

    const handleDecimal = () => {
        if (formula === 0){
            handleValues('0.')
        }
        else if (formula === 'Operacion Erronea'){
            handleValues('0.')
        }
        else if (operaciones.length > 1 && /[+|?/|?x]$/.test(operaciones)){
            handleValues('0.')
        }
        else if (/[-]$/.test(operaciones)){
            handleValues('0.')
        }
        else {
            handleValues('.')
        }
    }

    const handleValues = (e) => {
        operaciones.push(e)
        let firstIndex = operaciones[0] 
        let lastIndex = operaciones[operaciones.length - 1]
        let penultimateIndex = operaciones[operaciones.length - 2]

        if ((lastIndex === '-' || /[+|?/|x]/.test(lastIndex)) && (penultimateIndex === '-' || /[+|?/|x]/.test(penultimateIndex) )){
            operaciones.splice(operaciones.length - 2, 1)
        }
        else if (/[+|?/|x]/.test(firstIndex)){
            operaciones.splice(0)
            operaciones.push('0', e)
        }
        else if (operaciones.length >= 16){
            operaciones.splice(operaciones.length - 1, 1)
            return setResultado('Max digit')
        }
        else if ((lastIndex === '.' && penultimateIndex === '.') || (penultimateIndex === '0.' && lastIndex === '.')){
            operaciones.splice(operaciones.length - 1, 1)
        }
        
        let str = ''
        for (let index = 0; index < operaciones.length; index++) {
            str += operaciones[index]  
        }
        setFormula(str) 
        setResultado(e)
    }

    const handleDelete = () => {
        if (formula === 0 || formula.length === 1) {
            setFormula(0)
            operaciones.splice(0)
        }
        else if (formula === 'Operacion Erronea' || formula === '0.' || formula.includes("=")){
            setFormula(0)
            setResultado(0)
            setOperaciones([])   
        }
        else {
            operaciones.splice(operaciones.length - 1,1)
            let str = ''
            for (let index = 0; index < operaciones.length; index++) {
                str += operaciones[index]  
            }
            setFormula(str)
        }
    }
 
    const handleIgual = () => {
        if (formula === 0){
            setFormula(0)
            setResultado(0)

        }
        else if (formula === 'Operacion Erronea'){
            setFormula(0)
            setResultado(0)
            setOperaciones([])
        }
        else {
            let replace = formula
                .replace(/[-]/g,'-')
                .replace(/[+]/g,'+')
                .replace(/[/]/g,'/')
                .replace(/[x]/g,'*')

            if (/^[+|-|?/|?*]/.test(replace)){
                setFormula('Operacion Erronea')
                setResultado('Presiona AC')
                setOperaciones([])
            }
            else if (/[+|-|?/|?*]$/.test(replace)){
                setFormula('Operacion Erronea')
                setResultado('Presiona AC')
                setOperaciones([])
            }
            else if (replace[0] === '-' && replace.length === 1){
                setFormula('Operacion Erronea')
                setResultado('Presiona AC')
                setOperaciones([])
            }
            else if (replace[replace.length - 1] === '-'  && replace.length > 1){
                setFormula('Operacion Erronea')
                setResultado('Presiona AC')
                setOperaciones([])
            }
            else if (replace.includes('=')){
                let indexOfIgual = formula.indexOf('=')
                setResultado(formula.slice(indexOfIgual + 2))
            }
            else {
                try {
                    eval(replace)    
                } catch (error) {
                    setFormula('Operacion Erronea')
                    setResultado('Presiona AC')
                    setOperaciones([])
                    return console.log(`error: ${error}`);
                }

                let result = eval(replace)
                setFormula(`${replace}= ${result}`)
                setResultado(result)    
                setOperaciones([result])
                historial.push(`${replace}= ${result}`)
                sethistorialVacio(false)
            }  
        } 
    }

    const handleHistorial = (e) => {
        e === 'true'?  setHistorialVisible(true) : setHistorialVisible(false);   
    }

    const handleDeleteHistorial = () => {
        setHistorial([])
        sethistorialVacio(true)
    }

    const handleAC = () => {
        setFormula(0)
        setResultado(0)
        setOperaciones([])
    }


  return (
        <div className='contenedor'>
            <h1>Simple Calculator with React</h1>
            <p>Enjoy!</p>
            <div className='calculadora'>
                <div className='historial-boton'>
                    {historialVisible? (
                        <button 
                            onClick={() => handleHistorial('false')}>
                            <FontAwesomeIcon icon={faCalculator} />
                        </button>
                    ):(
                        <button 
                            onClick={() => handleHistorial('true')}>
                                <FontAwesomeIcon icon={faHistory} />
                        </button>
                    )}
                </div>
                <div className='formula-resultado'>
                    <Formula 
                        formula={formula} 
                    />

                    <Resultado 
                        resultado={resultado} 
                    />
                </div>
                
                {transition((style, item) => 
                    item? (
                        <animated.div style={style} className='animated'>
                            <Historial 
                                handleDeleteHistorial={handleDeleteHistorial}
                                historial={historial}
                                historialVacio={historialVacio} />
                        </animated.div>
                    ) : (
                        <animated.div style={style} className='animated'>
                            <Botones 
                                handleValues={handleValues}
                                handleIgual={handleIgual}
                                handleAC={handleAC}
                                handleDecimal={handleDecimal}
                                handleDelete={handleDelete} 
                            />
                        </animated.div>
                    )
                )}
            </div>     
        </div>  
  );
}

export default App;
