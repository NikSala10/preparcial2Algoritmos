import '../TaskItem/taskItem'
import TaskItem, { AttributeTaskItem } from '../TaskItem/taskItem';
import { addObserver, appState, dispatch } from '../../store/store';
import storage from '../../utils/storage';

class TaskList extends HTMLElement {
  taskitems: TaskItem[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);
  }

  static get observedAttributes() {
    return ['container'];
  }

  attributeChangedCallback(propName: string, oldValue: string | undefined, newValue: string | undefined) {
    if (propName === 'form') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  createTaskItem() {
    // Limpiamos el array de taskitems antes de llenarlo
    this.taskitems = [];

    // Separamos las tareas en dos grupos: Pendientes y Completadas
    const pendingTasks = appState.taskItems.filter((task: any) => task.state === 'pending');
    const completedTasks = appState.taskItems.filter((task: any) => task.state === 'completed');

    // Creamos los elementos de tareas pendientes
    pendingTasks.forEach((task: any) => {
      const taskitem = this.ownerDocument.createElement('task-item') as TaskItem;
      taskitem.setAttribute(AttributeTaskItem.titletask, String(task.title));
      taskitem.setAttribute(AttributeTaskItem.description, String(task.description));
      taskitem.setAttribute(AttributeTaskItem.state, String(task.state));
      this.taskitems.push(taskitem);
    });

    // Creamos los elementos de tareas completadas
    completedTasks.forEach((task: any) => {
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
        <style>
          /* Estilos opcionales para los contenedores */
          .container { display: flex; flex-direction: column; }
          .pending-tasks, .completed-tasks { margin-bottom: 16px; }
          h3 { font-size: 18px; margin: 8px 0; }
        </style>
        <div class="container">
          <div class="pending-tasks">
            <h3>Pending Tasks</h3>
            <div class="pending-task-list"></div>
          </div>
          <div class="completed-tasks">
            <h3>Completed Tasks</h3>
            <div class="completed-task-list"></div>
          </div>
        </div>
      `;

      // Creamos los elementos de las tareas
      this.createTaskItem();

      // Seleccionamos los contenedores de tareas pendientes y completadas
      const pendingTaskContainer = this.shadowRoot.querySelector('.pending-task-list');
      const completedTaskContainer = this.shadowRoot.querySelector('.completed-task-list');

      // Iteramos sobre las tareas y las añadimos a sus respectivos contenedores
      this.taskitems.forEach((taskItem) => {
        if (taskItem.getAttribute(AttributeTaskItem.state) === 'pending') {
          pendingTaskContainer?.appendChild(taskItem);
        } else if (taskItem.getAttribute(AttributeTaskItem.state) === 'completed') {
          completedTaskContainer?.appendChild(taskItem);
        }
      });
    }
  }
}

customElements.define('task-list', TaskList);
export default TaskList;
