import { BackDrop } from "../BackDrop/BackDrop";
import { GrClose } from "react-icons/gr";
import React from "react";
import { Loader } from "../Loader/Loader";
import './Modal.css';

type TModal = {
    close: VoidFunction,
    onChangeTask: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmitChangedTask: (e: React.FormEvent<HTMLFormElement>) => void,
    onChangeCompleted: (e: React.ChangeEvent<HTMLInputElement>) => void,
    prevText: string,
    isComplited: boolean,
    checkboxLabel: string,
    isLoading: boolean,
    show: boolean
};

export const Modal = ({ close, onChangeTask, onSubmitChangedTask, onChangeCompleted, show, prevText, isComplited, checkboxLabel, isLoading }: TModal) => {
    return (
        <>
            <BackDrop show={show} close={close} />
            <div
                className="Modal"
                style={{ transform: show ? 'translateY(0)' : 'translateY(-100vh)' }}
            >
                <div className="Modal-header">
                    <h2>Edit</h2>
                    <button onClick={close}><GrClose /></button>
                </div>
                {isLoading ? (
                    <Loader show={isLoading} />
                ) : (
                    <form className="Modal-main" onSubmit={onSubmitChangedTask}>
                        <input
                            onChange={onChangeTask}
                            type="text"
                            value={prevText}
                        />
                        <label>
                            <p>{checkboxLabel}</p>
                            <span>
                                <p>Да</p>
                                <input type="checkbox" checked={isComplited} onChange={onChangeCompleted} />
                            </span>
                            
                        </label>
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
        </>
    );
};
