import * as React from 'react';

interface Props {
    addTaskStatus: boolean;
    setAddTaskStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskButton: React.FC<Props> = (props) => {
    return (
        <div className="AddTaskButton__Wrapper">
            <button onClick={() => props.setAddTaskStatus(true)}>Add Task</button>
        </div>
    )
}

export default AddTaskButton