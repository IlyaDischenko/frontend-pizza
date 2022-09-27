import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import s from './Sort.module.scss'
import { setActiveSort } from '../../redux/slices/sortSlice'

function Sort() {
    const sortRef = React.useRef()

    const dispatch = useDispatch()
    const activeSort = useSelector((state) => state.sort.activeSort)

    const [isVisible, setIsVisible] = React.useState(false)


    const listSort = ['популярности', 'цене', 'алфавиту']
    const sortName = listSort[activeSort]


    const onClickListItem = (i) => {
        dispatch(setActiveSort(i))
        setIsVisible(false)
    }

    // Выключаю попап окно при клике вне него
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.path.includes(sortRef.current)) {
                setIsVisible(false)
            }
        }

        document.body.addEventListener('click', handleClickOutside)

        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={sortRef} className={s.sort}>
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