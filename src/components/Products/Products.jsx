       
    import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';

    
    const Products = () => {
      const [products,setProducts] = useState([]);
      useEffect ( () =>{
fetch('/fakeData.json')
.then(res => res.json())
.then(data => setProducts(data));
      }

       ,[])
      
      return (
        <section className='px-12'>
          
         <div className='mt-20'>

  <h1 className='text-center text-4xl font-semibold'>Our Products</h1>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10'>{
  products?.map(product=>(
               <Product
               key={product.id}
                product={product}>
               </Product>
              ))}
  </div>
         </div>
        </section>
      )
    }
    
    export default Products