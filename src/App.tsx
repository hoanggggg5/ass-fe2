import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ProductAdminPage from './pages/Admin/Product/product'
import AdminLayout from './components/Layout/admin'
import UserLayout from './components/Layout/user'
import AddProductPage from './pages/Admin/Product/add'
import EditProduct from './pages/Admin/Product/edit'
import CategoriesPage from './pages/Admin/Category/category'
import AddCategoryPage from './pages/Admin/Category/add'
import EditCategoryPage from './pages/Admin/Category/edit'

function App(props: any) {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserLayout/>}>
        </Route>
        {/* Admin layout */}
        <Route path='admin' element={<AdminLayout/>}>
          <Route path='products'>
            <Route index element={<ProductAdminPage/>}/>
            <Route path='add' element={<AddProductPage/>}/>
            <Route path='edit/:id' element={<EditProduct/>}/>
          </Route>
          <Route path='categories'>
            <Route index element={<CategoriesPage/>}/>
            <Route path='add' element={<AddCategoryPage/>}/>
            <Route path='edit/:id' element={<EditCategoryPage/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
