import { Actions } from '../types/store';

//TODAS LAS ACCIONES QUE NECESITAMOS HAGAN UN CAMBIO EN EL ESTADO

export const addListTaskItem = (task: any) => {
	return {
		action: Actions.ADD_TASK,
		payload: task
	};
};

export const removeTaskItem = (task: any) => {
	return {
		action: Actions.REMOVE_TASK,
		payload: task
	};
};


export const toggleTaskItem = (task: any) => {
	return {
		action: Actions.TOGGLE_TASK,
		payload: task
	};
};

