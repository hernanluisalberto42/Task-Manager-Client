import { TASK_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETED_TASK,
    STATE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK} from '../../types';

export default (state, action)=>{
    switch(action.type){
        case TASK_PROJECT:
            return {
                ...state,
                taskProject: action.payload
                //taskProject: state.taskProject.filter(task=>task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                taskProject: [action.payload,...state.taskProject],
                errorTask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask:true
            }
        case DELETED_TASK:
            return {
                ...state,
                taskProject: state.taskProject.filter(task=>task.idTask !== action.payload)
            }
        case UPDATE_TASK:    
        case STATE_TASK:
            return {
                ...state,
                taskProject: state.taskProject.map(task=>(task.idTask === action.payload.idTask ? action.payload : task))
            }
        case CURRENT_TASK:
            return {
                ...state,
                taskSelected: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                taskSelected: null
            }

        default:
            return state;
    }
}