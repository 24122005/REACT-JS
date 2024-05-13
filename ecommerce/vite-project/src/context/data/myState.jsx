import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, deleteDoc, doc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';


function MyState(props) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })


  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Added successfully");
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData()
      // closeModal()
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

    // setproducts("")
  }

  const [product, setproduct] = useState([]);


  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
   
      );


      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setproduct(productArray)
        setLoading(false);
      });

      return () => data;

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  useEffect(() => {
    getProductData(); 
  }, []);


  //update product function

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      window.location.href = '/dashboard'
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      
    }
    // setProducts("")
  }

  const deleteProduct = async () => {
    setLoading(true)
      try {
       await deleteDoc(doc(fireDB, "products", products.id));
       toast.success('Product Deleted successfully'); 
       getProductData()
       setLoading(false)
    } catch (error) {
       console.log(error)
       setLoading(false)
    }
  }

  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
      edithandle, updateProduct, deleteProduct}}>
      {props.children}
    </MyContext.Provider>
  )
}


export default MyState