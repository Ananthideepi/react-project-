import React from 'react'
import { useSelector } from 'react-redux'


export default function ProductReview({ reviews=[] }) {
   
//   console.log("aaa",reviews)
    return (
        <div>
            <div class="reviews w-75">
                <h3>Other's Reviews:</h3>
                <hr />
                {reviews && reviews.map((item,i) => (

                    <div key={i} class="review-card my-3">
                        <div class="rating-outer">
                            <div class="rating-inner" style={{width:`${item.rating/5*100}%`}}></div>
                        </div>
                        <p class="review_user">by {item.submittedBy} </p>
                        <p class="review_comment">{item.comment}</p>

                        <hr />
                    </div>
                ))}

            </div>
        </div>
    )
}
