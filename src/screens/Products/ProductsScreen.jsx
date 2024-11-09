"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import { Grid2 } from '@mui/material'

import Card from '../../components/Cards/Card';
import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';

import axios from '../../axios'

function ProductsScreen() {
    const router = useRouter();

    useEffect(() => {

        setLoading(true)
        axios.get('/product/get-all-products').then((response) => {
            console.log(response)
            setProducts(response.data.productList);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setSnackbarMessage(error.response.data.message || error.message || "Something went wrong");
            setSnackbarServity("error");
            setSnackbarState(true);
          })

    }, [])

    const [loading, setLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('Testing alerts');
    const [snackbarServity, setSnackbarServity] = useState('info');
    const [products, setProducts] = useState([]);

    const changeSnackbarState = () => {
        setSnackbarState(false)
      }

      const viewAProductInDetail = (productId)=>{

        console.log(productId)
        router.push(`/product/${productId}`);

      }

    return (
        <>
        <Loader openState={loading} />
        <Snackbar message={snackbarMessage} openStatus={snackbarState} severity={snackbarServity} onCloseFunction={changeSnackbarState} />

            <Grid2 container >

                {products.map((product)=>{
                    return <Grid2 m={1.8} >
                    <Card key={product._id} 
                    productId={product._id}
                    imageLink={'https://e7.pngegg.com/pngimages/454/1021/png-clipart-consumer-electronics-gadget-advanced-electronics-electronic-component-others-electronics-laptop-thumbnail.png'}
                    productName={product.name}
                    productDescription={product.description}
                    viewBtnFn={viewAProductInDetail}
                    />
                </Grid2>
                })}

                


            </Grid2>

        </>

    )
}

export default ProductsScreen