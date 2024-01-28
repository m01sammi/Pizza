import React from "react";

import debounce from 'lodash.debounce';


import styles from './Search.module.scss'
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.ts";


const Search: React.FC = () => {
    const dispatch = useDispatch();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState('');
    // const {searchValue, setSearchValue} = React.useContext(SearchContext); 
    
  
    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');
        // document.querySelector('input').focus();
        inputRef.current?.focus();

    };

    const updateSearchValue = React.useCallback(
        debounce((str:string) => {
            dispatch(setSearchValue(str))
        },1000),
        [],
    );
    

    React.useEffect(() => {
        document.querySelector('input')
    })

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }
    
    return (
        <div className={styles.root}>
            {/* <svg className={styles.icon}
            height="24" 
            version="1.1" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg" 
            >
            <g transform="translate(0 -1028.4)">
            <path d="m14.938 12.281-2.844 2.813 6.906 6.906 2.844-2.844-6.906-6.875z" 
            fill="#95a5a6" transform="translate(0 1028.4)"/>
            <path d="m15.562 1041.2c-0.473 1.3-1.472 2.4-2.75 2.9l2.188 2.3c1.16-0.7 2.137-1.7 2.812-2.9l-2.25-2.3z" fill="#7f8c8d"/>
            <path d="m18 10a8 8 0 1 1 -16 0 8 8 0 1 1 16 0z" fill="#bdc3c7" transform="translate(0 1028.4)"/>
            <path d="m15 10a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#ecf0f1" 
            transform="translate(0 1028.4)"/></g>
            </svg> */}
            <input 
                ref={inputRef}
                value={value} 
                onChange={onChangeInput} 
                className={styles.input} 
                placeholder="Поиск пиццы..."
            />
                {
                    value && (
                        <svg onClick={onClickClear} 
                        className={styles.clearIcon} 
                        enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg" ><path d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z" fill="#425661"/><polygon fill="#425661" points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "
                        /></svg> 
                    )
                }
        </div>
    )
}

export default Search;