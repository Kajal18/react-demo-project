import React, { useReducer } from 'react'
import Modal from '../../components/ui/Modal/Modal';
import useHttpErrorHanlder from '../hooks/http-errorHanlder'

const errorHanlder = (WrappedComponent, axios) => {
    const { error, errorConfirmedHandler } = useHttpErrorHanlder(axios)
    return props => {
        return (
            < React.Fragment >
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </ React.Fragment >
        )
    }
}

export default errorHanlder