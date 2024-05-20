import { ChangeEvent } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import './Task.sass';

type TTask = {
    value: string,
    onChecked: (isChecked: boolean) => void,
    onDelete: VoidFunction,
    btnEdit: VoidFunction,
    checked: boolean
};

export const Task = ({ value, onChecked, onDelete, checked, btnEdit }: TTask) => {
    const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        onChecked(isChecked);
    };

    return (
        <div className="Task">
            <div className="task__content">
                <label>
                    <input 
                        className="checkbox" 
                        value={value} 
                        type="checkbox" 
                        checked={checked}
                        onChange={handleCheckedChange}
                    />
                    <p 
                        style={{ textDecoration: checked ? 'line-through' : 'none' }}
                    >
                        {value}
                    </p>
                </label>
            </div>
            <div className="task__functional">
                <button onClick={btnEdit} className='btn-edit'>
                    <BiSolidEdit className="task__functional-icon"/>
                </button>
                <button className='btn-delete' onClick={onDelete}>
                    <MdOutlineDelete className="task__functional-icon"/>
                </button>
            </div>
        </div>
    );
};