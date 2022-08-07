import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { RootState } from "../app/rootReducer"
import ListProduct from "../components/ListProduct"
import { CategoryType } from "../types/Category"
import { ProductType } from "../types/Product"

type Props = {}

const SearchPage = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const categoryStore = useSelector((state: RootState) => state.category.value)
  const productStore = useSelector((state: RootState) => state.products.value)
  const [categories, setCategories] = useState<CategoryType[]>(categoryStore)

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q")

  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get(`http://localhost:8000/products?q=${q}`)
      setProducts(data)
    }
    getProducts()
  }, [q])

  useEffect(() => {
    const getCategories = async () => {
      const {data} = await axios.get(`http://localhost:8000/categories`)
      setCategories(data)
    }
    getCategories()
  }, [])

  const selectCategory = async (category: string) => {
    const {data} = await axios.get(`http://localhost:8000/products?category=${category}`)
    console.log(data)
    setProducts(data)
  }

  return (
    <div className="flex px-8 bg-[#f1f3f6] py-6">
      <div className="bg-white mt-6 shadow border-[1px] w-1/5 h-[400px] max-w-1xl mx-auto py-2 px-8 lg:max-w-4xl">
        <fieldset>
          <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
            Filter
          </h2>
          <div className="my-10 space-y-4">
            <div className="flex items-center">
              <input onClick={() => setProducts(productStore)} id="category" name="category" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="category" className="ml-3 block text-sm font-medium text-gray-700">All</label>
            </div>
            {
              categories.map((category) => 
                <div className="flex items-center">
                  <input onClick={() => selectCategory(category.name)} id="category" name="category" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="category" className="ml-3 block text-sm font-medium text-gray-700">{category.name}</label>
                </div>
              )
            }
          </div>
        </fieldset>
      </div>
      <div className="bg-white mt-6 shadow border-[1px] w-4/5 max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          Search: {q}
        </h2>
        <div id="product_filter" className="mt-6">
        <div className="list-products mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product: ProductType, index) =>
            <div className="p-4 text-[#444444]">
            <Link to={`/product/${product.id}`}>
              <div className="flex mb-2">
                <img className="m-auto" src={product.image} alt=""/>
              </div>
              <div className="text-lg min-h-[60px] text-center mb-2">
                {product.name}
              </div>
              <div className="flex justify-evenly">
                <div className="text-[#D70018] mr-4 text-lg">{product.originalPrice} đ</div>
                <div className="text-[#707070] text-base leading-[30px]">{product.saleOffPrice} đ</div>
              </div>
              <div className="bg-[#E5E7EB] p-2">
                {product.description}
              </div>
              <div className='flex mt-2'>
                <div className='flex'>
                  <div className='pt-[4px]'>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.26533 3.52266L12.758 4.01953C13.0473 4.05938 13.2903 4.25625 13.3827 4.52578C13.4751 4.79766 13.3997 5.09297 13.1907 5.29453L10.658 7.68984L11.256 11.1258C11.3046 11.407 11.1855 11.693 10.9424 11.8594C10.7018 12.0258 10.3834 12.0469 10.1233 11.9133L7.00248 10.3078L3.88408 11.9133C3.62158 12.0469 3.30318 12.0258 3.06255 11.8594C2.82193 11.693 2.7004 11.407 2.75144 11.1258L3.34936 7.68984L0.816233 5.29453C0.606962 5.09297 0.532587 4.79766 0.624462 4.52578C0.716094 4.25625 0.95842 4.05938 1.24984 4.01953L4.73964 3.52266L6.30491 0.421173C6.43373 0.162985 6.70596 -0.000915527 7.00248 -0.000915527C7.30144 -0.000915527 7.57366 0.162985 7.70248 0.421173L9.26533 3.52266Z" fill="black"/>
                    </svg>
                  </div>
                  <div className='pt-[4px]'>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.26533 3.52266L12.758 4.01953C13.0473 4.05938 13.2903 4.25625 13.3827 4.52578C13.4751 4.79766 13.3997 5.09297 13.1907 5.29453L10.658 7.68984L11.256 11.1258C11.3046 11.407 11.1855 11.693 10.9424 11.8594C10.7018 12.0258 10.3834 12.0469 10.1233 11.9133L7.00248 10.3078L3.88408 11.9133C3.62158 12.0469 3.30318 12.0258 3.06255 11.8594C2.82193 11.693 2.7004 11.407 2.75144 11.1258L3.34936 7.68984L0.816233 5.29453C0.606962 5.09297 0.532587 4.79766 0.624462 4.52578C0.716094 4.25625 0.95842 4.05938 1.24984 4.01953L4.73964 3.52266L6.30491 0.421173C6.43373 0.162985 6.70596 -0.000915527 7.00248 -0.000915527C7.30144 -0.000915527 7.57366 0.162985 7.70248 0.421173L9.26533 3.52266Z" fill="black"/>
                    </svg>
                  </div>
                  <div className='pt-[4px]'>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.26533 3.52266L12.758 4.01953C13.0473 4.05938 13.2903 4.25625 13.3827 4.52578C13.4751 4.79766 13.3997 5.09297 13.1907 5.29453L10.658 7.68984L11.256 11.1258C11.3046 11.407 11.1855 11.693 10.9424 11.8594C10.7018 12.0258 10.3834 12.0469 10.1233 11.9133L7.00248 10.3078L3.88408 11.9133C3.62158 12.0469 3.30318 12.0258 3.06255 11.8594C2.82193 11.693 2.7004 11.407 2.75144 11.1258L3.34936 7.68984L0.816233 5.29453C0.606962 5.09297 0.532587 4.79766 0.624462 4.52578C0.716094 4.25625 0.95842 4.05938 1.24984 4.01953L4.73964 3.52266L6.30491 0.421173C6.43373 0.162985 6.70596 -0.000915527 7.00248 -0.000915527C7.30144 -0.000915527 7.57366 0.162985 7.70248 0.421173L9.26533 3.52266Z" fill="black"/>
                    </svg>
                  </div>
                  <div className='pt-[4px]'>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.26533 3.52266L12.758 4.01953C13.0473 4.05938 13.2903 4.25625 13.3827 4.52578C13.4751 4.79766 13.3997 5.09297 13.1907 5.29453L10.658 7.68984L11.256 11.1258C11.3046 11.407 11.1855 11.693 10.9424 11.8594C10.7018 12.0258 10.3834 12.0469 10.1233 11.9133L7.00248 10.3078L3.88408 11.9133C3.62158 12.0469 3.30318 12.0258 3.06255 11.8594C2.82193 11.693 2.7004 11.407 2.75144 11.1258L3.34936 7.68984L0.816233 5.29453C0.606962 5.09297 0.532587 4.79766 0.624462 4.52578C0.716094 4.25625 0.95842 4.05938 1.24984 4.01953L4.73964 3.52266L6.30491 0.421173C6.43373 0.162985 6.70596 -0.000915527 7.00248 -0.000915527C7.30144 -0.000915527 7.57366 0.162985 7.70248 0.421173L9.26533 3.52266Z" fill="black"/>
                    </svg>
                  </div>
                  <div className='pt-[4px]'>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.26533 3.52266L12.758 4.01953C13.0473 4.05938 13.2903 4.25625 13.3827 4.52578C13.4751 4.79766 13.3997 5.09297 13.1907 5.29453L10.658 7.68984L11.256 11.1258C11.3046 11.407 11.1855 11.693 10.9424 11.8594C10.7018 12.0258 10.3834 12.0469 10.1233 11.9133L7.00248 10.3078L3.88408 11.9133C3.62158 12.0469 3.30318 12.0258 3.06255 11.8594C2.82193 11.693 2.7004 11.407 2.75144 11.1258L3.34936 7.68984L0.816233 5.29453C0.606962 5.09297 0.532587 4.79766 0.624462 4.52578C0.716094 4.25625 0.95842 4.05938 1.24984 4.01953L4.73964 3.52266L6.30491 0.421173C6.43373 0.162985 6.70596 -0.000915527 7.00248 -0.000915527C7.30144 -0.000915527 7.57366 0.162985 7.70248 0.421173L9.26533 3.52266Z" fill="black"/>
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>72 đánh giá</div>
              </div>
            </Link>
          </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage