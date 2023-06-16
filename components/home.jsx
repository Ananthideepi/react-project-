  import React, { useEffect, useState } from 'react'
import Metadata from './layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsaction } from './action/productsaction'
import Loader from './layout/loader';
import Homeproduct from './products/homeproduct';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination"

export default function Home() {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.productsReducerState);
    // console.log("home_products",products)
    const [currentpage, setCurrentpage] = useState(1);

    const currentpageno = (pageno) => {
        setCurrentpage(pageno)
    }
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProductsaction(null,null,null,null,currentpage))
    }, [error, dispatch ,currentpage])
//   console.log("total.length",products?.length)
//   console.log("currentpage",currentpage)
    return (

        <>

            {loading ? <Loader /> :
                <div className=''>
                    <Metadata title={"Buy Best Product"} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">

                        <div className="row">
                            {products && products.map((item) =>(
                            // console.log("item",item),
                                <Homeproduct col={3} key={item.id} item={item} />)
                            )
                            }
                        </div>

                    </section>

                    {products?.length >0  && products?.length >3 ?
                    <div className='d-flex justify-content-center mt-4'>
                        <Pagination 
                            activePage={currentpage}
                            itemsCountPerPage={3}
                            totalItemsCount={products?.length}
                            // pageRangeDisplayed={5}
                            onChange={currentpageno}
                            nextPageText={"Next"}
                            firstPageText={"First"}
                            lastPageText={"Last"}
                            // ....bootstap framework classs.....
                            itemClass={"page-item"}
                            linkClass={"page-link"}
                            >
                                
                        </Pagination> 

                    </div>
                    : null }
                </div>
            }
        </>
    )
}
