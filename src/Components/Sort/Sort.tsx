import React from 'react';
import './Sort.sass';

type TSort = {
    onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

export const Sort = ({ onChangeSort }: TSort) => {
    return (
        <div className="Sort">
            <select onChange={onChangeSort}>
                <option value="all">All</option>
                <option value="complited">Complited</option>
                <option value="notComplited">Not Complited</option>
            </select>
        </div>
    );
};