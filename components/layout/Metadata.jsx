import React from 'react'
import { Helmet } from 'react-helmet-async'
export default function Metadata({title}) {
  return (
    <div>
        <Helmet>
            <title>{`${title}-Ecom cart`}</title>
        </Helmet>
    </div>
  )
}
