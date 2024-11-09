"use client"
import React, { useEffect, useState } from 'react'

import { Grid2, Grid, Typography } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';

import AttributeComponet from '../../components/AttributComponent/AttributeComponet'

import axios from '../../axios'

function ProductScreen({ producId }) {

    const [loading, setLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('Testing alerts');
    const [snackbarServity, setSnackbarServity] = useState('info');
    const [product, setProduct] = useState([]);
    const [productVariantAttributes, setProductVariantAttributes] = useState([])

    const changeSnackbarState = () => {
        setSnackbarState(false)
    }

    useEffect(() => {

        setLoading(true);
        axios.get(`/product/get-a-product?productId=${producId}`).then((response) => {
           
            setProduct(response.data.product);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setSnackbarMessage(error.response.data.message || error.message || "Something went wrong");
            setSnackbarServity("error");
            setSnackbarState(true);
        })

        setLoading(true);
        axios.get(`/product/get-a-product-attributes?productId=${producId}`).then((response) => {
            
            setProductVariantAttributes(response.data.attributes);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setSnackbarMessage(error.response.data.message || error.message || "Something went wrong");
            setSnackbarServity("error");
            setSnackbarState(true);
        })



    }, [])

    const selectAVariant = (attirbuteKey,attributeVal)=>{
        
        
        const existingVariant = product.variant.attributes;
        
        const remainingAttributes = existingVariant.filter(item => item._id !== attirbuteKey);
        
        let attributesArray = [];
        for(let i=0;i<remainingAttributes.length;i++){
            attributesArray.push({attribute:remainingAttributes[0]._id,attributeValue:remainingAttributes[0].value})
        }
        attributesArray.push({attribute:attirbuteKey,attributeValue:attributeVal});
        let searchQry = {
            productId:product._id,
            attributeArray:attributesArray
        }
        
        setLoading(true);
        axios.post(`/product/get-a-product-variant-by-attributes`,searchQry).then((response) => {
           
            setProduct(response.data.product);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setSnackbarMessage(error.response.data.message || error.message || "Something went wrong");
            setSnackbarServity("error");
            setSnackbarState(true);
        })
        
    }


    return (
        <>
            <Loader openState={loading} />
            <Snackbar
                message={snackbarMessage}
                openStatus={snackbarState}
                severity={snackbarServity}
                onCloseFunction={changeSnackbarState}
            />
            <Grid container>
                <Grid sm={12} md={6} lg={6} bgcolor={''}>

                    <img src={product.variant?.imageLink || null} alt={product.name} width={'45%'} />
                </Grid>
                <Grid md={6} lg={6} bgcolor={''}>
                    <Typography variant='h4'>{product.name}</Typography>
                    <Grid container mt={3}>
                        <Grid item md={12}>
                            <Typography>Price:&nbsp;{product.variant?.price || "NILL"}</Typography>
                        </Grid>
                        <Grid item md={12} mt={1}>
                            <Typography>{product.variant?.stock || "NILL"} items left</Typography>
                        </Grid>
                        <Grid item md={12} mt={1}>
                            <Typography>Description:&nbsp;{product.description || "NILL"}</Typography>
                        </Grid>
                        <Grid item md={12} mt={1}>
                            <Typography>SKU:&nbsp;{product.variant?.sku || "NILL"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                {productVariantAttributes.map((prodAttr) => {
                    return <Grid item md={12} mt={1}>
                        <AttributeComponet attributeId={prodAttr.attributeId} attributeName={prodAttr.attribute} attributeValues={prodAttr.values} productAttribute={product.variant?.attributes||[]} selectedBtnFn={selectAVariant} />
                    </Grid>
                })}

            </Grid>
        </>
    );

}

export default ProductScreen