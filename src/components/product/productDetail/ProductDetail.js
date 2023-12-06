import React, { useEffect } from 'react'
import './ProductDetail.scss'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from 'dompurify';

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const {id} = useParams();
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {product, isLoading, isError, message} = useSelector((state)=> state.product); //easy way to import multiple selector

  const stockStatus = (quantity) => {
    if(quantity > 0) {
      return <span className='--color-success'>In Stock</span>
    }else{
      return <span className='--color-danger'>Out Of Stock</span>
    }
  }

  useEffect(() => {
    if(isLoggedIn === true) {
      dispatch(getProduct(id))
    }
    if(isError){
      console.log(message);
    }
  }, [isLoggedIn,isError,message,dispatch,id])
  
  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg/>}
        {!isLoading && product && (
          <div class="detail">
            <Card cardClass="group">
              {product?.image ? 
              <img style={{width:"100%"}} src={product.image.filepath} alt={product.image.fileName}/>:
              <p>No image set for this product</p> }
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr/>
            <h4>
              <span className='badge'>Name: </span> &nbsp;
              {product.name}
            </h4>
            <p>
              <b>&rarr; SKU: </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category: </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price: </b> {"$"}{product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock: </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock: </b> {product.quantity* product.price}
            </p>
            <hr/>
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description) // Any script inserted by user wrapping it around dompurify is going to cut the script out and show the raw html
            }}>
            </div>
            <hr/>
            <code className='--color-dark'>Created On: {product.createdAt.toLocaleString('en-US')}</code>
            <br/>
            <code className='--color-dark'>Last Updated: {product.updatedAt.toLocaleString('en-US')}</code>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ProductDetail
