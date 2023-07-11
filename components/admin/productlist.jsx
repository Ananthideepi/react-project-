import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ClearerrorAdminproduct } from '../slices/productsSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/loader';
import Sidebar from './sidebar'
import { MDBDataTable } from 'mdbreact'
import { DeleteNewProduct, GetAdminproductAction } from '../action/productsaction';
import { clearProductdeleted } from '../slices/productsSlice';
export default function Productlist() {
    const { loading = true, products = [], error,isProductDeleted, } = useSelector((state) => state.productsReducerState);
    const { error:producterror } = useSelector((state) => state.productReducerState);
    const dispatch = useDispatch();
    const setProduct = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc"
                }, {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                }, {
                    label: "Action",
                    field: "Action",
                    sort: "asc"
                }
            ],
            rows: []
        }

        products.forEach((item) => {
            data.rows.push({
                id: item.id,
                name: item.name,
                price: `${item.price}`,
                stock: item.stock,
                Action: (
                    <><Button>
                        <Link to={`/admin/product/${item.id}`} className='"btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        </Button>
                        <Button onClick={(e)=>deleteHandler(e,item.id)}className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        })
        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(DeleteNewProduct(id))
     
    }
    useEffect(() => {
        if (isProductDeleted) {
            toast("Product Deleted successfully",
              {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "success",
                onOpen: () => {
                  dispatch(clearProductdeleted());
                }
      
              })
            return;
          }
        if (error ||producterror) {
            toast("errorin productList showing " || "error in product Delete" , {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(ClearerrorAdminproduct())
                }
            })
            return
        }
   
    }, [dispatch, error,isProductDeleted,producterror])
    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>

                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className="my-4">ProductList</h1>
                    <>
                        {loading ? <Loader /> :

                            <MDBDataTable className='px-3' bordered striped hover data={setProduct()} />

                        }
                    </>

                </div>

            </div>



        </div>
    )
}
