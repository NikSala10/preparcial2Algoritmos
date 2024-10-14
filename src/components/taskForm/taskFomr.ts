import { dispatch } from "../../store/store";
import { addListTaskItem } from "../../store/actions";

class TaskForm extends HTMLElement  {
    constructor()  {
        super();
        this.attachShadow( {mode: 'open'})
    }

    static get observedAttributes() {
        return ['form'];
    }

    attributeChangedCallback(propName : string, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === 'form') {
            this.render(); 
          }
    }
    connectedCallback() { 
        this.render();

    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
             <h1>ADD TASK</h1>
    		<form action="">
				<input id="title" type="text" placeholder="escribe el titulo de tu tarea">
				<input id="description" type="text" placeholder="escribe la descripcion">
				<input id="submitSend" type="submit" value="agregar">
    		</form>
            `;

            
        const buttonsubmit = this.shadowRoot?.querySelector('form');
        const title = this.shadowRoot?.querySelector('#title') as HTMLInputElement;
        const description = this.shadowRoot?.querySelector('#description') as HTMLInputElement;
        buttonsubmit?.addEventListener('submit',() =>  {
            dispatch(addListTaskItem(
                 {
                    title: title ? title.value : 'No title',
                    description: description ? description.value : 'No description',
                    state: false,
                 }
            ))
        });

        }
    }

}

customElements.define('taskform-component',TaskForm);
export default TaskForm;