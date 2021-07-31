import React from 'react'
import BookItem from './BookItem/bookItem'

const BookItems = (props) => {
    return (
        <>
            {props.bookItems.map(it=><BookItem clicked={()=>props.clicked(it._id)} key={it._id} {...it}/>)}
        </>
    )
}

export default BookItems
