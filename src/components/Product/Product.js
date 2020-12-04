import React, {useReducer} from 'react';
import './Product.css';

//para establecer un número constante de decimales
const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}
//toLocalString para convertir de un número a una cadena con dos decimales
//Se unsa undefined para usar la configuración regional del sistema en lugar de especificar una configuración regional
//reduce se usa para reducir la matriz a un solo valor. Para encontrar la suma de todos los números de una matriz
function getTotal(cart) {
  const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions)
}

const products = [
    {
      emoji: '🍦',
      name: 'helado de crema',
      price: 1.5,
      id: 1
    },
    {
      emoji: '🍩',
      name: 'biscocho',
      price: 2.5,
      id: 2
    },
    {
      emoji: '🍉',
      name: 'sandia',
      price: 4,
      id: 3
    }
  ];
  
  function cartReducer(state, action){
    switch(action.type){
      case 'add':
        return[...state, action.final];
      case 'remove':
        const productIndex = state.findIndex(item => item.name === action.product.name);
        if(productIndex<0){
          return state;
        }
        const update = [...state];
        update.splice(productIndex, 1);  //para eliminar si está en 1 elimina 1 elemento
        return update;
      default:
        return state;
    }
  }

  const reducer = key => key + 1;
  export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
    const [id, updateId] = useReducer(reducer, 0);
  
      function add(product) {
      const final = {...product,  id: `${product.name}-${id}`}  //se crea el objeto final para crear id únicos
      setCart({final, type:'add'});  //setCart llama a la función reductora y el producto es el segundo argumento en cartReducer
      updateId();  
    }
  
    function remove(product){
      setCart({product, type: 'remove'});
    }

   console.log(cart)    

    return(
      <div className="wrapper">
        <div className="flex-large">
          <strong>Carrito de Compras :</strong> {cart.length} (items totales)
          <div>
            <strong>Productos a Comprar: </strong>
              {cart.map((item)=>(
                <span key={item.id}>{item.name}, </span>
                
               ))}  
          </div>   
          <div><strong>Total:</strong> USD {getTotal(cart)}</div>    
        </div>
        
  
        <div>
          {products.map(product => (
            <div key={product.name}>
              <div className="product">
                <span role="img" aria-label={product.name}>{product.emoji}</span>
                <p>Producto: {product.name}</p>
                <p>Precio: USD {product.price}</p>
              </div>
              <button 
               onClick={() => add(product)}>
                  Añadir
               </button>
              <button
              onClick={()=> remove(product)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    )
  }