import '../TaskItem/taskItem'
import TaskItem, {AttributeTaskItem} from '../TaskItem/taskItem';
import { addObserver, appState, dispatch } from '../../store/store';
import storage from '../../utils/storage';
class TaskList extends HTMLElement  {
	taskitems: TaskItem[] =  [];
	
    constructor()  {
        super();
        this.attachShadow( {mode: 'open'});
		addObserver(this)
    }

    static get observedAttributes() {
        return ['container'];
    }

    attributeChangedCallback(propName : string, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === 'form') {
            this.render(); 
          }
    }
    
	connectedCallback() {
		this.render();

	
		}
	
		createTaskItem ()  {
            appState.taskItems.forEach((task: any) => {
                const taskitem = this.ownerDocument.createElement('task-item') as TaskItem;
                taskitem.setAttribute(AttributeTaskItem.titletask, String(task.title));
                taskitem.setAttribute(AttributeTaskItem.description, String(task.description));
                taskitem.setAttribute(AttributeTaskItem.state, String(task.state));
                this.taskitems.push(taskitem);
             
                });

                
        }

	render() {
		if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        
			<div class="container"></div>
    `;

	this.createTaskItem();
	const container = this.shadowRoot?.querySelector('.container');
	this.taskitems.forEach((task) => {
		container?.appendChild(task);
	});
	}

}
};

customElements.define('task-list', TaskList);
export default TaskList;