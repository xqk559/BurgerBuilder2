// import React from 'react';
// import Modal from '../../Components/UI/Modal/Modal';
// import useHttpErrorHandler from '../../hooks/http-error-handler';
// import ReactAux from '../ReactAux';

// const WithErrorHandler = (WrappedComponent, axios) => {
//     return props => {
//         const [error, clearError] = useHttpErrorHandler(axios);

//         return (
//           <ReactAux>
//             <Modal show={error} modalClosed={clearError}>
//               {error ? error.message : null}
//             </Modal>
//             <WrappedComponent {...props} />
//           </ReactAux>
//         );
//       };
//     };

// export default WithErrorHandler;