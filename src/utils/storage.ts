//En el storage siempre piden el key y value, EL KEY VA A BUSAR EN EL STORAGE SI ES IGUAL. Como si fuera un objeto


//GET, vamos a buscar con la key el valor en el localstorage. Vamos a obteenr el value, que esta guardado en el kay tal.
//Si esta en el localstorage reotrname en el valor, sino, busca en els ession stirga y develveme el valor, y viceversa. Si lcalstorage es undefined se asa al otro. Si exste lo va a cambiar todo ese string a JSON y eso es lo que se va a retorna. SINO EXISTE NINGUNO DE LOS DOS, me manda por defecto
const get = (key: any, defaultValue: any) => {
	const value = localStorage.getItem(key) || sessionStorage.getItem(key);
	return value ? JSON.parse(value) : defaultValue;
};


//SET: va a recibir, el key, value y session(si se va a guardar en el sessionstorgae) si no envian ese parametro de session va a ser false, sino ps va a ser true. 
const set = (key: any, value: any, session: boolean = false) => {
	//si sesison es true, lo va a poner en el sessionstorage en caso de que sea false su nombre va a ser localstorage. 
	const storage = session ? sessionStorage : localStorage;
	//del valor que me das ara guaradar, lo tiene que pasar a string, hace el parse. para guardarlo,ya que en el stirage le enviamos el objeto
	const parsed = JSON.stringify(value);
	//en el storage, si es local o session de lo que le hayamos enviado, setitem, para guardar, (lo busca y si no lo encuentra va a poner el key nuevo, y como valor va a aponer el valor parseado) Y LO GUARDA
	storage.setItem(key, parsed);
};

export default {
	get,
	set,
};