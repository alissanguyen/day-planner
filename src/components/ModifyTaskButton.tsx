import * as React from 'react';
import { ModifyingAction } from '../types';

interface Props {
    taskId: number;
    modifying: boolean;
    modifyTask: (id: number, action: ModifyingAction) => void;
}

const ModifyTaskButton: React.FC<Props> = (props) => {

    const buttonTextButAlsoAction: ModifyingAction = props.modifying ? "Submit" : "Modify"
    return (
        <button className="ModifyTaskButton" onClick={() => props.modifyTask(props.taskId, buttonTextButAlsoAction)}>{buttonTextButAlsoAction}</button>
    )
}

export default ModifyTaskButton