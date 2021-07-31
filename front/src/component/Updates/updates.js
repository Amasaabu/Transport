import React from 'react'
import Update from './Update/update'

const Updates = (props) => {
    return (
        <div>
            <h2 style={{ fontWeight: '500', marginTop: '30px', color: '#006E60',marginLeft: '50px' }}>Updates</h2>
            {props.contents.map((it, id)=><Update key={id} {...it} />)}
        </div>
    )
}

export default Updates
