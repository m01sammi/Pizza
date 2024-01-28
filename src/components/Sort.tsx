import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sort, SortPropertyEnum, setSort } from '../redux/slices/filterSlice.ts';
import { selectSort } from '../redux/slices/filterSlice.ts';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

// type PopupClick = React.MouseEvent<HTMLBodyElement> & {
//   path: Node[];
// }

export const sortList: SortItem[] =  [
  // {name: 'популярности (по убыванию)', sortProperty : 'rating'},
  // {name: 'популярности (по возрастанию)', sortProperty : '-rating'},
  // {name: 'цене (от высокой к низкой)', sortProperty : 'price'},
  // {name: 'цене (от низкой к высокой)', sortProperty : '-price'},
  // {name: 'алфавиту (Я-А)', sortProperty : 'name'},
  // {name: 'алфавиту (А-Я)', sortProperty : '-name'}
  {name: 'популярности (по убыванию)', sortProperty : SortPropertyEnum.RATING_DESC},
  {name: 'популярности (по возрастанию)', sortProperty : SortPropertyEnum.RATING_ASC},
  {name: 'цене (от высокой к низкой)', sortProperty : SortPropertyEnum.PRICE_DESC},
  {name: 'цене (от низкой к высокой)', sortProperty : SortPropertyEnum.PRICE_ASC},
  {name: 'алфавиту (Я-А)', sortProperty : SortPropertyEnum.NAME_DESC},
  {name: 'алфавиту (А-Я)', sortProperty : SortPropertyEnum.NAME_ASC}
];
function SortPopup() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort)
  const sortRef = React.useRef<HTMLDivElement>(null);


  const [openPopup, setOpenPopup] = React.useState(false);
  // const [selected, setSelected] = React.useState(0);
  // const sortName = list[value].name;

  const onClickListItem = (obj: SortItem) => {
    // onChangeSort(i);
    dispatch(setSort(obj));
    setOpenPopup(false);
  };


  // скрытие popup окна
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Используйте event.composedPath(), если оно доступно, в противном случае предоставьте пустой массив
      const path = (event.composedPath && event.composedPath()) || [];
      
      // Проверьте, что sortRef.current не является null и не включено в путь
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpenPopup(false);
      }
    }
  
    document.body.addEventListener('click', handleClickOutside);
  
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  // console.log ('Sort', openPopup);
    return (
      <div ref={sortRef} className="sort">
              <div className="sort__label">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpenPopup(!openPopup)} >{sort.name}</span>
              </div>
              
              {
                openPopup && (
                <div className="sort__popup">
                  <ul>
                  {sortList.map((obj, i) => (
                <li 
                  key={i}
                  onClick={() => onClickListItem(obj)} 
                  className={sort.sortProperty == obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>   
              ))
            }
                  </ul>
                </div>
                )
              }
            </div>
    );
  }

  export default SortPopup;