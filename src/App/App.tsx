import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Form } from '../Components/Form/Form';
import { Task } from '../Components/Task/Task';
import axiosDefault from '../config/DefaultAxios';
import { Modal } from '../Components/UI/Modal/Modal';
import { Sort } from '../Components/Sort/Sort';
import { QuantityTasks } from '../Components/QuantityTasks/QuantityTasks';
import './App.sass';

function App() {
  const [tasks, setTasks] = useState<{value: string, id: string, isComplited: boolean}[]>([]);
  const [taskValue, setTaskValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [changedTaskValue, setChangedTaskValue] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [checkboxLabel, setCheckboxLabel] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const getTasks = async () => {
    try {
      const { data } = await axiosDefault.get('/tasks.json');
      if (data) {
        const dataKeys: string[] = Object.keys(data);        
        const dataArr = dataKeys.map(item => ({
          id: item,
          value: data[item].value,
          isComplited: data[item].isComplited
        }));
        setTasks(dataArr.reverse());
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const capitalizedStr = taskValue.charAt(0).toUpperCase() + taskValue.slice(1);

    const task = {
      value: capitalizedStr,
      isComplited: false
    };

    if (taskValue.trim() !== "") {
      try {
        await axiosDefault.post("tasks.json", task);  
        setTaskValue('');
        getTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert('Заполните поле!');
    }
  };

  const onCheckedHandler = async (isChecked: boolean, id: string) => {
    const changedTask = tasks.find(task => task.id === id);

    if (changedTask) {
      const task = { 
        value: changedTask.value,
        isComplited: isChecked
      };

      try {
        await axiosDefault.put(`https://diploma-e99b8-default-rtdb.firebaseio.com/tasks/${id}.json`, task);
        getTasks();
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const onDeleteHandler = async (id: string, index: number) => {
    try {
      await axiosDefault.delete(`https://diploma-e99b8-default-rtdb.firebaseio.com/tasks/${id}.json`);
      tasks.splice(index, 1);
      setTasks([...tasks]);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const closeHandler = () => {
    setShow(false);
  }; 

  const btnEditHandler = async (id: string) => {
    setShow(true);
    setIsLoader(true);
    try {
      const { data } = await axiosDefault.get(`tasks/${id}.json`);
      setChangedTaskValue(data.value);
      setIsCompleted(data.isComplited);
      setCheckboxLabel(data.isComplited ? 'Хотите убрать флажок?' : 'Хотите поставить флажок?');
      setId(id);
      setIsLoader(false);
    } catch (error) {
      console.error('Error fetching task:', error);
      setIsLoader(false);
    }
  };

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedTaskValue(e.target.value);    
  };

  const onChangeCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
  };

  const onSubmitChangedTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (changedTaskValue.trim() !== '') {
      const task = { 
        value: changedTaskValue,
        isComplited: isCompleted
      };

      try {
        await axiosDefault.put(`https://diploma-e99b8-default-rtdb.firebaseio.com/tasks/${id}.json`, task);
        setShow(false);
        getTasks();
        setChangedTaskValue('');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      alert('Заполните поле или закройте форму!');
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const { data } = await axiosDefault.get('/tasks.json');
      const objectData = Object.keys(data);

      const arr = objectData.map(item => ({
        id: item,
        value: data[item].value,
        isComplited: data[item].isComplited
      }));

      arr.reverse();

      if (e.target.value === 'complited') {
        const complited = arr.filter(task => task.isComplited);
        setTasks([...complited]);
      } else if (e.target.value === 'notComplited') {
        const notComplited = arr.filter(task => !task.isComplited);
        setTasks([...notComplited]);
      } else {
        setTasks([...arr]);
      }
    } catch (error) {
      console.error('Error sorting tasks:', error);
    }
  };

  return (
    <div className='App'>
      <div className="container">
        <h1>TODO LIST</h1>
        <Form 
          resetInp={taskValue} 
          onChange={onChangeHandler} 
          onSubmit={onSubmitHandler}
        />
        <Sort 
          onChangeSort={handleChange}
        />
        <QuantityTasks quantity={tasks.length}/>
        <Modal 
          close={closeHandler}
          show={show}
          onChangeTask={onChangeTask}
          onSubmitChangedTask={onSubmitChangedTask}
          onChangeCompleted={onChangeCompleted}
          prevText={changedTaskValue}
          isComplited={isCompleted}
          checkboxLabel={checkboxLabel}
          isLoading={isLoader} 
        />
        <div className='background__tasks'>
          {
            tasks.length ? (
              tasks.map((item, index) => (
                <Task 
                  key={item.id}
                  value={item.value}
                  onChecked={(isChecked: boolean) => onCheckedHandler(isChecked, item.id)}
                  onDelete={() => onDeleteHandler(item.id, index)}
                  checked={item.isComplited} 
                  btnEdit={() => btnEditHandler(item.id)}
                />
              ))
            ) : (
              <h1>Empty</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
