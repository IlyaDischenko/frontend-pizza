import React from 'react'
import s from './Sort.module.scss'

function Sort() {
    const [isVisible, setIsVisible] = React.useState(false)
    const [activeSort, setActiveSort] = React.useState(0)
    const listSort = ['популярности', 'цене', 'алфавиту']
    const sortName = listSort[activeSort]

    const onClickListItem = (i) => {
        setActiveSort(i)
        setIsVisible(false)
    }

    return (
        <div className={s.sort}>
            <div className={s.sort_label}>
                <b>Сортировать по: </b>
                <span onClick={() => setIsVisible(!isVisible)}>{sortName}</span>
            </div>
            <div className={s.sort_popup}>
                {
                isVisible && (
                    <div className={s.popup}>
                        <ul>
                            {listSort.map((sort, i) => (
                                <li
                                    key={i}
                                    onClick={() => onClickListItem(i)}
                                    className={activeSort == i ? s.active : ''}>
                                    {sort}
                                    </li>
                            ))}
                        </ul>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Sort