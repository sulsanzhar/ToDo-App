import React from 'react';
import './Form.sass';

type TForm = {
    resetInp: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};

export const Form = ({ onChange, onSubmit, resetInp }: TForm) => {
    return (
        <form className='Form' onSubmit={onSubmit}>
            <input 
                className='inp' 
                type="text" 
                placeholder='Напишите задачу...'
                onChange={onChange}
                value={resetInp}
            />
            <button className='btn' type='submit'>+</button>
        </form>
    );
};