import { appState } from './store/store';
import './screens/dashboard';
import  {addObserver} from './store/store';


class AppContainer extends HTMLElement {
        constructor()  {
            super();
            this.attachShadow( {mode: 'open'});
           
           
        }
    
       connectedCallback() {
            this.render();
            
        }

      

        render()  {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;
                    const dashboard = this.ownerDocument.createElement('app-dashboard');
                    this.shadowRoot?.appendChild(dashboard);
        }
    }
    
    }
    
customElements.define('app-container',AppContainer);