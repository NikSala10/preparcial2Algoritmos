import { Observer } from '../types/store';
import  {reducer } from './reducer'
import storage from '../utils/storage';

//gestiona los estados, es el jefe, gestiona para que el estado haga un cambio, tambien los guarda.  Tiene el estado anterior y nuevo, por ello hace el cambio. GESTIONA!! TIENE TODO
//reducer, distoacht, son o que se neesita para que ocurrra


//El estado global, appState
//Estado Inicial
//EL APPSTATE ES: un objeto que tiene elemntos que se van a necesitar en la pagina. AQUI ABAJO, INITALAPASTATE. A medida que baya navegano va a ir guardando, cosas que son repetitivas, valores que se necesitan.
const initialAppState =  {
    taskItems: []
};



//Gestión del storage, para añadir al storage o editar, y para obtener del storage. Mira el storage. Storage.get, viene de un archhivo del proyecto, funcione spara reutilizar el set y get, para que solo se haga una vez. Storage no se guardan los objetos, se guardan en strign. EL GET para obtenerlo como JSON y ni como string. Lo mismo con set, se envia en JSON pero hace el cambio a string. Funcione
export let appState = storage.get('TASKS', initialAppState)

const persistStore = (state: any) => {
    storage.set('TASKS', state)
}


//Inicializar la lista de observadores
let observers: Observer[] = [];



//Crear el dispatch
//para utilizar una acción
export const dispatch = (action:any) =>  {
    const clone = JSON.parse(JSON.stringify(appState));
    //en el reducer el currentAction recibe la action y el currentState recibe el clone
    //El reducer devuelve el estado nuevo, con los cambios de la acción que le enviamos
    const newState = reducer(action, clone);
    //APPSTATE, despues de la action el stado nuevo, va a ser el estado que tenemos ahora. Osea se cambia el estado de base. Al añadir el nueov elemento, va a ser el estado que va a tener actualmente. 
    appState = newState;
    //LIN40: se envia al storage el nuevo estado, osea aqui se llama la funcion PERSISTSTORE y se le pasa el uevo estado, para que se cambie el estado anterior que tenia en el storage, guardar el nuevo elemento, o cambio.
    persistStore(newState)
    //Se recorre la lista de los observers y se renderiza cada uno de los observers, como se lo habiamos especificado en el type de observers, que van a tener esa funcion que se llama render
    observers.forEach((o) => o.render());
};

//Agregar los observadores para los interesados, los suscritos Van a  rendereizar (cuano haga una accion los observadores se van a volver a renderizr para que se vean los cambios) en un momento necesario. Guardan los componentes, para que cuando haya un cambio de esa acción, lo vuelva a renderizar y se vea. Son necesarios para que cuando se realiza una accion, se cambie ese estado y se vea, por eso esta en el STORE

//El addObserver: añade observadores
//newObserver: es el observador nuevo

//Hace una cipia de los observadores que ya tenemos guardados (...), los tres puntitos con los observers, es donde estan los guardados, s ehace una nueva lista donde esta la cipia de los observadores, y el nuevo observadore que estamos haciendo. 
export const addObserver = (newObserver: any) =>  {

    //Corchetes despues del =   //Lista que va a tener la copia de los observadores guardados antes y se va a concatenar con un nuevo observer. LOS CORCHETES DICE QUE ES UNA LISTA, ARRAY. PRESENTE!!! LOS CORCHETES SON UNA LISTA. DENTRO DE ESA LISTA, VAN A TENER LA COPIA Y LO VA A CONCATENAR CON EL NUEVO. [1,2,3,4] = [1,2,3,4, 5] o|| [1, 2, 3, 4] => ESTA ES LA LISTA numbers = [[1, 2, 3, 4](COPIA DE LA LISTA), 5(DATO NUEVO)]
    
   
    observers = [...observers, newObserver];
};