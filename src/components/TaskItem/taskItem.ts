import { removeTaskItem, toggleTaskItem } from "../../store/actions";
import { addObserver, dispatch } from '../../store/store';
export enum AttributeTaskItem{
    "titletask" = "titletask",
    "description" = "description",
    "state" = "state",
  
}

class TaskItem extends HTMLElement {

	titletask?: string;
    description?: string;
    state?: boolean;

	static get observedAttributes() {
        return Object.values(AttributeTaskItem);
    }
   
    attributeChangedCallback(propName : AttributeTaskItem, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeTaskItem.state:
                this.state = newValue === "true";
                break;
           
            default:
                this[propName] = newValue;
                break;
        
    }
    }
	constructor(){
		super();
		this.attachShadow({mode: "open"});
        addObserver(this)
	}
	
    connectedCallback() {
        this.render();
    }

    
    
    render() {
        if (this.shadowRoot) {
  
            
            this.shadowRoot.innerHTML = `
                <div class="task" style="background-color: ${this.state ? 'green' : 'inherit'};">
                    <h4>${this.titletask}</h4>
                    <p>${this.description}</p>
                    <p>${this.state ? 'Completada' : 'Pendiente'}</p>
                    <input type="checkbox" ${this.state ? 'checked' : ''} id="checkbox">
                    <button id="delete">Eliminar</button>
                </div>
            `;
            const buttonDeleteTask = this.shadowRoot?.querySelector('#delete')
            buttonDeleteTask?.addEventListener('click', () =>  {
                dispatch(removeTaskItem(
                     {
                        title : this.titletask,
                        description: this.description,
                        state: this.state
                     }
                ))
            });
            const checkbox = this.shadowRoot.querySelector('#checkbox') as HTMLInputElement;
            checkbox?.addEventListener('click', () => {
                dispatch(toggleTaskItem(
                     {
                        title : this.titletask,
                        description: this.description,
                        state: !this.state
                     }
                )

                )
                
            });
        }
    }
}

customElements.define('task-item', TaskItem);
export default TaskItem;