import * as React from 'react';

interface Props {
    taskId: number;
    removeTask: (id: number) => void;
}

const RemoveTaskButton: React.FC<Props> = (props) => {
    return (
        <button className="RemoveTaskButton" onClick={() => props.removeTask(props.taskId)}>Remove</button>
    )
}

export default RemoveTaskButton