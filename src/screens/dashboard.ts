import '../components/TaskItem/taskItem'
import '../components/TaskListI/taskList'
import '../components/taskForm/taskFomr'
import { getProducts } from '../services/getProducts';
import { appState } from '../store/store';
import  {addObserver} from '../store/store';

class Dashboard extends HTMLElement {
	
    dataProducts: any[] = [];
        constructor()  {
            super();
            this.attachShadow( {mode: 'open'});
            addObserver(this);
           
        }
    
        async connectedCallback() {
           
            this.render();
            
        }

        createCardsProduct ()  {
           

                
        }
        createCardsShoppingItem ()  {
            
        }


        render()  {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
               
                <div class="container-tasks">
                    <taskform-component></taskform-component>
                    <task-list>
                        <task-item></task-item>
                    </task-list>
                </div>
               
                `;
                
               
            };
            
        }
    
    }

customElements.define('app-dashboard', Dashboard);