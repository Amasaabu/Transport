import React, {useState, useEffect} from 'react'
import {Alert} from 'react-bootstrap'
import axios from 'axios'
const withErrorHandler =(Component)=>{
    const ErrorHandler = (props)=>{
        const [error, setError] = useState(null)
        
        
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
       
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            console.log(error.response)
            setError(error.response);
        });
      
        
        
        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(reqInterceptor);
        //         axios.interceptors.response.eject(resInterceptor);
        //     };
        // }, [reqInterceptor, resInterceptor]);

        let alert = ''
        console.log(error)
        if (error) {
            console.log(error)
            alert = <Alert variant="danger" onClose={() => setError(null)} dismissible>
                   <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                   <p>
                       Change this and that and try again. Duis mollis, est non commodo
                       luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                     Cras mattis consectetur purus sit amet fermentum.
              </p>
               </Alert>
        }
        return (
            <>
            {alert}
                <Component {...props}/>
            </>
        )
    }
    return ErrorHandler
}

export default withErrorHandler
