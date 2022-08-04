import React, { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { getSingleProduct } from '../../redux/features/singleProductSlice';
import {BsCheck,BsStarFill,BsStarHalf,BsStar} from 'react-icons/bs'
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import Loading from '../LoadingScreen/Loading'
import { addCart } from '../../redux/features/cartSlice';
import { Alert } from '@mui/material';
import './SingleProduct.scss'
import { padding } from '@mui/system';

const SingleProduct = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const {product,isLoading} = useSelector(store => store.singleProduct);

  const [imgMain,setImgMain] = useState('')
  const [colorSelected,setColorSelected] = useState('');
  const [amountSingleProduct,setAmountSingleProduct] = useState(1);
  const [starList,setStarList] = useState([0,1,2,3,4]);
  const [cartItem,setCartItem] = useState({});

  // console.log('product:',product);

  const handleClickAddCartItem = () => {
    const alertFail = document.getElementById('alert-fail');
    const alertSuccess = document.getElementById('alert-product-success');

    if(!colorSelected){
      alertFail.classList.add('show');
      alertFail.classList.add('showAlert');
      alertFail.classList.remove('hide');

    }else{
      dispatch(addCart(cartItem));
      alertSuccess.classList.add('show');
      alertSuccess.classList.add('showAlert');
      alertSuccess.classList.remove('hide');
    }

    setTimeout(() => {
      alertFail.classList.add('hide');
      alertFail.classList.remove('show');
      alertSuccess.classList.add('hide');
      alertSuccess.classList.remove('show');
    },4000)
  }

  useEffect(() => {
    dispatch(getSingleProduct(id))
  },[])
  
  useEffect(() => {
    if(Object.entries(product).length>0){
      setImgMain(product.images[0].url);
    }
  },[product])

  useEffect(() => {
    const {id,name,price,images,description,company,colors,stock,stars,reviews,category,shipping} = product;
        setCartItem(() => {
            return{
                img:images,
                id,
                name,
                category,
                shipping,
                price,
                color:colorSelected,
                stock,
                company,
                amountCart:amountSingleProduct,
            }
        })
        // console.log(cartItem,'cartItem')
    },[colorSelected,amountSingleProduct,product])
  
  const {name,price,images,description,company,colors,stock,stars,reviews,category,shipping} = product;
  return (
      <>
          <div id='alert-fail' className='alert hide'>
            <Alert data-aos="fade-left" sx={{position:"fixed",
                        top:"20px",
                        right:"20px",
                        padding: "1rem 2rem",
                      }}
                      severity="error">Please enter product color!</Alert>
          </div>
          <div id='alert-product-success' className='alert hide'>
            <Alert data-aos="fade-left" sx={{position:"fixed",
                        top:"20px",
                        right:"20px",
                        padding: "1rem 2rem",
                      }}
                      severity="success">Add product Successfully!</Alert>
          </div>
        
          <section className='title-section'>
              <div className='section-center'>
                  <h3>
                      <Link to='/'>Home</Link><Link to='/products'>/ Products</Link> / {name}
                  </h3>
              </div>
          </section>
          {isLoading && <Loading/>}
          {Object.entries(product).length>0 &&
          <div className='section section-center page'>
              <Link to='/products' className='btn'>back to products</Link>
              <div className='product-center'>
                  <section className='img-section'>
                      <img src={imgMain} alt='main_img' className='main'/>
                      <div className='gallery'>
                          {images.map((img) => {
                              const {id,url} = img;
                              return (
                                  <img key={id} src={url} alt='' className={`${imgMain===url ? 'active':''}`} onClick={() => setImgMain(url)}/>
                              )
                          })}
                      </div>
                  </section>
                  <section className='content'>
                      <h2>{name}</h2>
                      <div className='review'>
                          <div className='stars'>
                              {starList.map((starItem) => {
                                  let temp = stars - starItem;
                                  
                                  if(temp >= 1){
                                      return(
                                          <span key={starItem}><BsStarFill/></span>
                                      )
                                  }
                                  else if(temp >0 && temp<1){
                                      return(
                                          <span key={starItem}><BsStarHalf/></span>

                                      )
                                  }
                                  else{
                                      return(
                                          <span key={starItem}><BsStar/></span>

                                      )

                                  }
                              })}
                          </div>
                          <p className='reviewer'>
                              ({reviews} customer reviewers)
                          </p>
                      </div>
                      <h5>${price/100}</h5>
                      <p className='description'>{description}</p>
                      <p className='info'>
                          <span>available:</span>{stock} products in stock
                      </p>
                      <p className='info'>
                          <span>SKU:</span> {id}
                      </p>
                      <p className='info'>
                          <span>brand:</span> {company}
                      </p>
                      <hr/>
                      <div className='colors-single-product info'>
                          <span>colors:</span>
                          <div style={{display:'flex'}}>
                              {colors.map((color,index) => {
                                  
                                  return(
                                      <button key={index} type='button' className={`${colorSelected === color ? 'color-btn active':'color-btn'}`} 
                                          style={{backgroundColor:`${color}`}} onClick={() => setColorSelected(color)}>
                                          <BsCheck className='check-icon'/>
                                      </button>
                                  )
                              } )}
                          </div>
                      </div>
                      <div className='btn-cart-container'>
                          <div className='amounts-btn'>
                              {amountSingleProduct===1 ? 
                              <button disabled  type='button' className='dec-btn' >
                                  <AiOutlineMinus/>
                              </button>
                              : 
                              <button  type='button' className='dec-btn' onClick={() => setAmountSingleProduct(amountSingleProduct-1)}>
                                  <AiOutlineMinus/>
                              </button>
                              }
                              <h2>{amountSingleProduct}</h2>
                              {amountSingleProduct===stock ?
                              <button disabled  type='button' className='inc-btn' >
                                  <AiOutlinePlus/>
                              </button>
                              :
                              <button  type='button' className='inc-btn' onClick={() => setAmountSingleProduct(amountSingleProduct+1)}>
                                  <AiOutlinePlus/>
                              </button>
                              }
                          </div>
                          {/* <Link to='/cart' className='btn' onClick={() => handleAddCartItem(cartItem)}>add to cart</Link> */}
                          <button  className='btn' onClick={() => handleClickAddCartItem()}>add to cart</button>

                      </div>
                  </section>
              </div>
          </div>}
                      
      </>
  )
}

export default SingleProduct