import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearreviewdeleted } from '../slices/productsSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/loader';
import Sidebar from './sidebar'
import { MDBDataTable } from 'mdbreact'
import { DeleteReviewAction, getReviewsAction } from '../action/productsaction';
import { clearError } from '../slices/productslice';

export default function ReviewList() {
    const { loading = true, products = [], reviews = [], error, isReviewDeleted, } = useSelector((state) => state.productsReducerState);
    const { error: producterror } = useSelector((state) => state.productReducerState);
    // console.log("reviews",reviews)
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();
    const setProduct = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                }, 
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],

            rows: []
        }

    reviews.map((item) => {
            data.rows.push({
                id: item.id,
                user: item.submittedBy,
                rating: item.rating,
                comment: item.comment,
                actions: (
                    <>
                        <Button onClick={(e) => deleteHandler(e, item.id)} className='btn btn-danger py-1 px-2 ml-2'>
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
        dispatch(DeleteReviewAction(productId, id))
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviewsAction(productId))
    }
    useEffect(() => {
        if (isReviewDeleted) {
            toast("Review Deleted successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearreviewdeleted());
                    }

                })
            return;
        }
        if (error) {
            toast("Error is Review delete", {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearError())
                }
            })
            return
        }
        // dispatch(getReviewsAction(productId))
    }, [dispatch, error, isReviewDeleted, producterror])
    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>

                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Review List</h1>
                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label >Product ID</label>
                                    <input
                                        type="text"
                                        onChange={e => setProductId(e.target.value)}
                                        value={productId}
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
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
