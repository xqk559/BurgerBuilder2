import {useState, useEffect} from 'react';

export default HttpClient => {
    const [error, setError] = useState(null);
        const reqInterceptor = HttpClient.interceptors.request.use(
            req => {
                setError(null);
                return req;
            }
        );
        const resInterceptor = HttpClient.interceptors.response.use(
            res => res, err => setError(err)
        );
        useEffect(()=>{
            return () => {
                HttpClient.interceptors.request.eject(reqInterceptor);
                HttpClient.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]); 

        const errorConfirmedHandler = () => {
            setError(null);
        };
            return [error, errorConfirmedHandler];
        }