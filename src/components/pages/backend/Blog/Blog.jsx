


import ToastSuccess from '../partials/ToastSuccess'
import ModalError from '../partials/modals/ModalError'
import ModalValidation from '../partials/modals/ModalValidation'
import SideNavigation from '../partials/SideNavigation'
import BlogTable from './blogTable'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Plus } from 'lucide-react'
import Searchbar from '../partials/Searchbar'
import ModalAddBlog from './ModalAddblog'
import React from 'react'
import { StoreContext } from '@/components/Store/storeContext'
import { setIsAdd } from '@/components/Store/storeAction'



const Blog = () => {
    const { dispatch, store} = React.useContext(StoreContext);
    const [ itemEdit,setItemEdit] = React.useState(null);
    const handleAdd = () => {dispatch(setIsAdd(true));
        setItemEdit(null);
    }
  return (
    <>
      <section className='layout-main '>
        <div className=" layout-division ">
       <SideNavigation menu="blog"/>
            <main className=''>
               <Header title='Blog' subtitle='Manage Kiosk Blog'/>
                <div className='p-8'> 
                    <div className='flex justify-between items-center'>
                      <Searchbar/>
                        <button className='btn btn-add' onClick={handleAdd} >
                           <Plus size={16}/> Add New 
                        </button>
                    </div>  
                    <BlogTable setItemEdit ={setItemEdit} />
                </div>
                <Footer/>
            </main>
        </div>
    </section>
    {store.validate && <ModalValidation/> }
    {store.error && <ModalError/>}
     {store.success && <ToastSuccess/>}
    {/* {store.isView && <SpinnerWindow/>} */}
    {store.isAdd && <ModalAddBlog itemEdit = {itemEdit}/>}
    </>
  )
}

export default Blog
