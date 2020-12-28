import React, {useState, useEffect, memo, useCallback, useRef} from 'react'

const INITIAL_PAGE = 0

const useBook = () => {

     const [currentPage, changePage] = useState(INITIAL_PAGE)
     const lastPage = useRef()
     const infinite = useRef()

     const nextPage = useCallback(() => {
          changePage(prev => {
               if(prev === lastPage.current) {
                    if(infinite.current) return 0;
                    return lastPage.current
               }
               return prev + 1
          })
     }, [])

     const prevPage = useCallback(() => {
          changePage(prev => {
               if(prev === 0) {
                    if(infinite.current) return lastPage.current
                    return 0
               }
               return prev - 1
          })
     }, [])

     const setPage = useCallback((val) => {
          if(val <= lastPage.current && val >= 0) {
               changePage(val)
          }
     }, [])

     const Book = memo(props => {

          useEffect(() => {
               if(props.children && props.children.length){
                    lastPage.current = props.children.length - 1;
               }
               if(props.infinite) infinite.current = true
          }, [props.children, props.infinite])

          return (
               <div className={props.className? props.className : 'book'}>
                    {props.children[currentPage]}
               </div>
          )
     })

     const Page = memo(props => {
          return (
               <div className={props.className? props.className : 'page'}>
                    {console.log(currentPage)}
                    {props.children}
               </div>
          )
     })

     return [Book, Page, nextPage, prevPage, setPage]
}


export { useBook }
