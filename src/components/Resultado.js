import React, { memo } from 'react';

const Resultado = ({resultado}) => {
    return (
        <div className='resultado'>
            <p>{resultado}</p>
        </div>
    );
};

export default memo(Resultado);