import { Archive, Frown, Info, Trash2, X } from 'lucide-react'
import React from 'react'
import ModalWrapper from './Modalwrapper'
import { setError } from '@/components/Store/storeAction';
import { StoreContext } from '@/components/Store/storeContext';

const ModalError = () => {
  const {store, dispatch} = React.useContext(StoreContext);
  const handleClose = () => {dispatch(setError(false));
  };

return (
    <>
      <div className='modal fixed h-screen w-full top-0 left-0  z-[99999999]'>
        <div className='backdop w-full h-full bg-black bg-opacity-90 '>
        </div>
        
        <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2
        -translate-y-1/2 max-w-[300px] w-full rounded-md border border-line ">
           
            <div className='modal-body p-2 py-4 text-center'>

                <Frown className='text-alert mx-auto mb-4' size={35}/>
               
                <h5>Something went wrong!</h5>
                <p className='my-5 text-center'> 
                  {store.message}
                </p>
                <button className='btn btn-alert w-full flex justify-center'onClick={handleClose}>okay</button>
                
            </div>
        </div>
        </div>
      
    </>
  )
}

export default ModalError
