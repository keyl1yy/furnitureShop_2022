import React,{useState,useEffect} from 'react'
import Loading from '../LoadingScreen/Loading'
import { Link } from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import {BsCheck} from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts,getProducts } from '../../redux/features/productsSlice'

const getTypeRender = () => {
    const data = localStorage.getItem('typeRender');
    if(data === 'true'){
        return true
    }else if(data === 'false'){
        return false
    }else{
        return true
    }
}

const getSortType = () => {
  const data = localStorage.getItem('sortType')
  return data ? data : 'price-lowest'
}

const Products = () => {
    
    const {isLoading, products, dataDefault} = useSelector((store) => store.products);
    const dispatch = useDispatch();

    const [sortType,setSortType] = useState(getSortType());
    const [queryTemp,setQueryTemp] = useState('');
    const [category,setCategory] = useState('all');
    const [company,setCompany] = useState('all');
    const [color,setColor] = useState('all');
    const [price,setPrice] = useState(309999)
    const [shipping,setShipping] = useState(false);



    const [isTypeRender,setIsTypeRender] = useState(getTypeRender());
    
    useEffect(() => {
        localStorage.setItem('typeRender',isTypeRender)
    },[isTypeRender])

    // functions

    const handleSearchTemp = (data) => {
      if(queryTemp !== ''){
        data = data.filter((item) => {
            return item.name.toLowerCase().indexOf(queryTemp.toLowerCase()) !== -1;
            // return item.name.toLowerCase() === queryTemp.toLowerCase();
        }); 
      }
      dispatch(setProducts(data));
      return data
    } 
    
    const handleClickCategory = (data) => {
      const categories = document.getElementsByName('category')
        
        categories.forEach((categoryItem) => {
            if(categoryItem.classList.contains('active')){
                categoryItem.classList.remove('active')
            }
            if(categoryItem.value === category){
                categoryItem.classList.add('active')
            }
        })

        if(category !== 'all'){
            data = data.filter((item) => item.category === category)
        }
        
        dispatch(setProducts(data));
        return data
    }

    const handleSelectCompany = (data) => {
      if(company !== 'all'){
          data = data.filter((item) => item.company === company)
      }
      dispatch(setProducts(data));
      return data;
    }

    const handleSelectColor = (data) => {
      const colors = document.getElementsByName('color')
      colors.forEach((colorItem) => {
          if(colorItem.classList.contains('active')){
              colorItem.classList.remove('active')
          }
          if(colorItem.value === color){
              colorItem.classList.add('active');
          }
      })

      if(color !== 'all'){
          data = data.filter((item) => {
              return item.colors.includes(color);
          })
      }
      
      dispatch(setProducts(data));
      return data;
    }

    const handleChangePrice = (data) => {
      data = data.filter((item) => item.price <= price)
      dispatch(setProducts(data));
      return data;
    }

    const handleCheckShipping = (data) => {
      if(shipping){
          data = data.filter((item) => item.shipping === shipping)
      }
      dispatch(setProducts(data));
      return data;
    }

    const handleChangeSortType = (data) => {
      // console.log('sortType:',sortType);
      // console.log('dataSortType:',data);
      const dataSort = [...data]
      if(sortType === 'price-lowest'){
        // console.log('type:',1);
        dataSort.sort((a,b) => {
          return a.price - b.price
        })
      }
      else if(sortType === 'price-highest'){
        // console.log('type:',2);
        dataSort.sort((a,b) => b.price - a.price)
      }
      else if(sortType === 'name-a'){
        dataSort.sort((a,b) => {
          if(a.name < b.name) return -1
          return 0
        })
      }
      else{
        dataSort.sort((a,b) => {
          if(a.name > b.name) return -1
          return 0
        })
      }

      localStorage.setItem('sortType',sortType);
      dispatch(setProducts(dataSort));
  }

    const handleClearFilter = () => {
      setQueryTemp('');
      setCompany('all');
      setColor('all');
      setCategory('all');
      setPrice(309999);
      setShipping(false);
      window.scrollTo(0, 0)
    }
    
    useEffect(() => {
      let data = dataDefault;
      data = handleSearchTemp(data);
      data = handleClickCategory(data);
      data = handleSelectCompany(data);
      data = handleSelectColor(data);
      data = handleChangePrice(data);
      data = handleCheckShipping(data);
      handleChangeSortType(data);
    },[queryTemp,category,company,color,price,shipping,sortType])

    useEffect(() => {
      window.scrollTo(0, 0)
    },[])

    return (
        <>
           <section className='title-section'>
                <div className='section-center'>
                    <h3>
                        <Link to='/'>Home</Link> / products
                    </h3>
                </div>
            </section>
            <section className='section-center products-section'>
                <div className='classify-options'>
                    <div className='content'>
                        <form>
                            <div className='form-control'>
                                <input type='text' name='text' placeholder='Search' className='search-input' value={queryTemp} onChange={(e) => setQueryTemp(e.target.value)}/>
                            </div>
                            <div className='form-control'>
                                <h5>category</h5>
                                <div className='wrap-category'>
                                    <button type='button' name='category' className='null active' value='all' onClick={(e) => setCategory(e.target.value)}>all</button>
                                    <button type='button' name='category' value='office' className='null' onClick={(e) => setCategory(e.target.value)}>office</button>
                                    <button type='button' name='category' value='living room' className='null' onClick={(e) => setCategory(e.target.value)}>living room</button>
                                    <button type='button' name='category' value='kitchen' className='null' onClick={(e) => setCategory(e.target.value)}>kitchen</button>
                                    <button type='button' name='category' value='bedroom' className='null' onClick={(e) => setCategory(e.target.value)}>bedroom</button>
                                    <button type='button' name='category' value='dining' className='null' onClick={(e) => setCategory(e.target.value)}>dining</button>
                                    <button type='button' name='category' value='kids' className='null' onClick={(e) => setCategory(e.target.value)}>kids</button>
                                </div>
                            </div>
                            <div className='form-control'>
                                <h5>company</h5>
                                <select name='company' className='company' value={company} onChange={(e) => setCompany(e.target.value)}>
                                    <option value='all'>all</option>
                                    <option value='marcos'>marcos</option>
                                    <option value='liddy'>liddy</option>
                                    <option value='ikea'>ikea</option>
                                    <option value='caressa'>ceresa</option>
                                </select>
                            </div>
                            <div className='form-control'>
                                <h5>colors</h5>
                                <div className='colors'>
                                    <button type='button' name='color' value='all' className='all-btn active' onClick={(e) => setColor(e.target.value)}>all</button>
                                    <button type='button' name='color' value='#ff0000' className='color-btn' style={{backgroundColor:"#ff0000"}} onClick={(e) => setColor(e.target.value)}>
                                        <BsCheck className='check-icon'/>
                                    </button>
                                    <button type='button' name='color' value='#00ff00' className='color-btn' style={{backgroundColor:"#00ff00"}} onClick={(e) => setColor(e.target.value)}>
                                        <BsCheck className='check-icon'/>
                                    </button>
                                    <button type='button' name='color' value='#0000ff' className='color-btn' style={{backgroundColor:"#0000ff"}} onClick={(e) => setColor(e.target.value)}>
                                        <BsCheck className='check-icon'/>
                                    </button>
                                    <button type='button' name='color' value='#000' className='color-btn' style={{backgroundColor:"#000"}} onClick={(e) => setColor(e.target.value)}>
                                        <BsCheck className='check-icon'/>
                                    </button>
                                    <button type='button' name='color' value='#ffb900' className='color-btn' style={{backgroundColor:"#ffb900"}} onClick={(e) => setColor(e.target.value)}>
                                        <BsCheck className='check-icon'/>
                                    </button>
                                </div>
                            </div>
                            <div className='form-control'>
                                <h5>price</h5>
                                <p className='price'>${price/100}</p>
                                <input type='range' min='0' max='309999' name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className='form-control shipping'>
                                <label htmlFor='shipping'>
                                    free shipping
                                </label>
                                <input id='shipping' type='checkbox' name='shipping' checked={shipping}  onClick={() => setShipping(!shipping)}/>
                            </div>
                        </form>
                        <button type='button' className='clear-btn' onClick={handleClearFilter}>clear filter</button>
                    </div>
                </div>
                <div>
                    <section className='nav-product'>
                        <div className='btn-container'>
                            <button className={`${isTypeRender ? 'active' : ''}`} onClick={() => setIsTypeRender(true)}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <button className={`${!isTypeRender ? 'active' : ''}`} onClick={() => setIsTypeRender(false)}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <p>{products.length} products found</p>
                        <hr/>
                        <form>
                            <label htmlFor="sort">sort by</label>
                            <select name='sort' id='sort' className='sort-input' onChange={(e) => setSortType(e.target.value)} value={sortType}>
                                <option value='price-lowest'>price (lowest)</option>
                                <option value='price-highest'>price (highest)</option>
                                <option value='name-a'>name (a - z)</option>
                                <option value='name-z'>name (z - a)</option>
                            </select>
                        </form>
                    </section>
                    {isLoading && <Loading/>}
                    {products.length===0 && <h5>Sorry, no products matched your search</h5>}
                    <section className='wrap-product-center'>
                        <div className={`${isTypeRender ? 'products-container' : 'products-container-column'}`}>
                            {products.map((product) => {
                                const {id,name,price,image,description} = product;
                                const text = description.slice(0,150)
                                return(
                                    <article key={id} className='featured'>
                                        <div className='container'>
                                            <img src={image} alt={name}/>
                                            <Link to={`/products/${id}`} className='link'>
                                                <BiSearchAlt2/>
                                            </Link>
                                        </div>
                                        {isTypeRender && 
                                        <div className='footer-featured'>
                                            <h5>{name}</h5>
                                            <p>${price/100}</p>
                                        </div>}
                                        
                                        {!isTypeRender && <div>
                                            <h4>{name}</h4>
                                            <h5>${price/100}</h5>
                                            <p>{text}...</p>
                                            
                                            <Link to={`/products/${id}`} className='btn'>
                                                details
                                            </Link>
                                            
                                        </div>}
                                    </article>
                                )
                            })}
                        </div>
                    </section>

                </div>
            </section>
        </>
    )
}

export default Products
