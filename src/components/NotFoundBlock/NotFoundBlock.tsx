import React from "react";

import styles from './NotFoundBlock.module.scss';

console.log(styles);

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😭😭😭😭</span>
                <br/>
                <p>Not Found</p>
            </h1>
            <p className={styles.discription}>К сожелению даная страница отсутвует в нашем интернет-магазине</p>
        </div>
    )
}

export default NotFoundBlock;