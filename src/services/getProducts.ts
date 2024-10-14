export const getProducts = async () => {
    try {
        const allProducts = await fetch('https://fakestoreapi.com/products').then(res => res.json());
        return allProducts;
    
        
    } catch (error) {
        console.error(error);
    }
}
//fetch: ES UNA PETICIÓN QUE LA HACE ASINCRONICAMNETE, FETCH DEVUELVE UNA PROMESA

//ASYNC: las dos cosas se hagan al tiempo. La funcion sea asincrona
//ASYNC, cuando hay un await dentro hay que poner el async
//CUANDO ME APARECE UN ERROR DE LA PROMESA, S EPONE ASYNC Y AWAIT, AWAIT siempre va antes de lo que devuelve una pomesa, y async va a antes de la función

//Cuando hay una erroe que se devuelve una promesa, se utiliza un await, porque el fetch normalmente utiliza una promesa, para que haga el mecanismo bien

//THEN: propiedad de las promesas

//DENTRO DEL THEN: funcion dentro del parametro, coge esa respuesta y esa respuesta se pasa a JSON, OSEA ME LO DA EN JSON