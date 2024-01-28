import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
}

const Categories: React.FC <CategoriesProps> = ({value, onClickCategory}) => {
  // const [activeCategory, setActiveCategory] = React.useState(0);

 

  // console.log(activeCategory);

  const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые']

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li 
              key={index}
              onClick={() => onClickCategory(index)} 
              className={value == index ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
 
  export default Categories; 