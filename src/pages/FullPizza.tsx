import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageURL: string;
        name: string;
        price: number;

    }>()
    const {id} = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(
                    `https://65a05328600f49256fafd79c.mockapi.io/pizzas/` + id)
                    setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }
        fetchPizza();
    }, [])

    if (!pizza) {
        return <>'Загрузка...'</>
    }

  return (
    <div className='container'>
        <img src={pizza.imageURL}/>
        <h2>{pizza.name}</h2>
        <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza;
