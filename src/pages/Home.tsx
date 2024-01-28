import React from "react";
import axios from "axios";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectFilter, setCategoryId, setFilters } from "../redux/slices/filterSlice.ts";
import Categories from '../components/Categories.tsx';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock.tsx';
import Skeleton from '../components/Skeleton.tsx';
import Pagination from "../components/Pagination/Pagination.tsx";
import { setCurrentPage } from "../redux/slices/filterSlice.ts";
import SortPopup, {sortList} from '../components/Sort.tsx'
import {SearchPizzaParams, fetchPizzas, selectPizzaItems} from "../redux/slices/pizzasSlice.ts"
import { useAppDispath } from "../redux/store.ts";


const Home: React.FC = () => {
   const navigate = useNavigate();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);


  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const { pizzas, status} = useSelector(selectPizzaItems);
  const sortType = sort.sortProperty;
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const dispatch = useAppDispath ();






    // const {searchValue} = React.useContext(SearchContext); 


    // const [pizzas, setPizzas] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(true);
    // const [currentPage, setCurrentPage] = React.useState(1);
    // const [categoryId, setCategoryId] = React.useState(0);
    // const [sortType, setSortType] = React.useState({
    //   name: 'популярности', sortProperty : 'rating'
    // });

    const onClickCategory = (index: number) => {
        dispatch(setCategoryId(index));
    }

    const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
    }

    const getPizzas = async () => {
      // setIsLoading(true);

      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sortBy = sortType.replace('-', '');
      const order = sortType.includes('-') ? 'asc' : 'desc';

    
      // await axios
      //   .get(`https://65a05328600f49256fafd79c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      //   .then((res) => {
      //     setPizzas(res.data);
      //     setIsLoading(false);
      //   });

    
     dispatch(
      fetchPizzas({
      category,
      search,
      sortBy,
      order,
      currentPage: String(currentPage)
     }));
   


      window.scrollTo(0, 0); 
    }

    // если изменили параметры и был первый рендер
    // React.useEffect (() => {
    //   if (window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams

    //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

    //     dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId: Number(params.category),
    //         currentPage: Number(params.currentPage),
    //         sort: sort || sortList[0]
    //       })
    //     );
    //   }
    //   isSearch.current = true;
    // }, [])
    window.scrollTo(0, 0);
    // если был первый рендер, то проверяем URL-параметры и сехраняем в редакс
    React.useEffect(() => {

      getPizzas();


    }, [categoryId, searchValue, currentPage, sort.sortProperty]);
    // если был первый рендер, то запрашивем пиццы
    // React.useEffect (() => {
    //   if (isMounted.current) {
    //     const queryString = qs.stringify({
    //       sortProperty : sort.sortProperty,
    //       categoryId,
    //       currentPage,
    //     });
        
    //     navigate(`?${queryString}`);
    //   }

    //   if (!window.location.search) {
    //     dispatch(fetchPizzas({} as SearchPizzaParams));
    //   }
    // }, [categoryId, currentPage, sort.sortProperty])

    const items = Array.isArray(pizzas) ? pizzas.map((value) => <PizzaBlock key={value.id} {...value}/>) : null;
    const item = Array.isArray(pizzas) ? pizzas.map((value) => <Link key={value.id} to={`/pizza/${value.id}`}></Link>) : null;

    // .filter((value) => {
    //   if (value.name.toLowerCase().includes(searchValue.toLowerCase())){
    //     return true;
    //   }
    //   return false;
    // })
    
    return (
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory}/>
            <SortPopup />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {
            status === 'error' ? (<div className='content__error '><h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
           К сожелению, не удалось получить пиццы
            <br />
            Попробуйте повторить попытку позже
          </p></div>) : (
            
            <div className="content__items">
             {
               status === 'loading'
               ? [... new Array(6)].map((_, index) => <Skeleton key={index} />)
               // : Array.isArray(pizzas)
               // ? pizzas.map((value) => <PizzaBlock key={value.id} {...value} />)
               // :  null
               : items
                 // name={value.name} 
                 // price={value.price} 
                 // image={value.imageURL}
                 // sizes={value.sizes}
                 // types={value.types}
             }
           </div>
          )
          }
         
          <Pagination currentPage={currentPage}  onChangePage={onChangePage}/>
          </div>
    )
}

export default Home;
