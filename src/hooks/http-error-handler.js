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
            } // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };
            return [error, errorConfirmedHandler];
        }