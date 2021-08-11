import React, {useState, useEffect} from 'react'
import {Alert} from 'react-bootstrap'
import axios from 'axios'

// export const instance = axios.create({})

const withErrorHandler =(Component)=>{
    const ErrorHandler = (props)=>{
        const [error, setError] = useState(null)
        
        
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
       
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error.response);
        });
      
        
        
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        let alert = ''
        if (error) {
            alert = <Alert variant="danger" onClose={() => setError(null)} dismissible>
                   <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                   <p>
                      {error.data.message}
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
