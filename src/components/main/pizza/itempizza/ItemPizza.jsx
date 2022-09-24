import s from './Item_pizza.module.scss'


function Item_pizza({ title, description, photo, price_small }) {
    return (
        <div className={s.item_pizza}>
            <div className={s.photo}>
                <img src={photo} alt="" />
            </div>
            <div className={s.text}>
                <div className={s.title}>
                    <div>{title}</div>
                </div>
                <div className={s.description}>
                    <div>{description}</div>
                </div>
                <div className={s.item_footer}>
                    <div className={s.price}>
                        <div>от {price_small} Р</div>
                    </div>
                    <div className={s.button}>
                        <button>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item_pizza