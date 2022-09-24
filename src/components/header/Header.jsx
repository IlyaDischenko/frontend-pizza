import s from './Header.module.scss'
import logo from '../../img/logosvg.svg'


function Header() {
    return (
        <div className={s.Header}>
            <div className={s.left_items}>
                <img src={logo} alt="as" />
            </div>
            <div className={s.right_items}>
                <div className={s.cabinet}>
                    <span fill="none" className={s.icon}>
                        <svg width="20" height="28" viewBox="0 0 23 28" fill="none" className={s.iconimg} xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 11.8182C14.2469 11.8182 16.4737 9.62031 16.4737 6.90909C16.4737 4.19787 14.2469 2 11.5 2C8.7531 2 6.52631 4.19787 6.52631 6.90909C6.52631 9.62031 8.7531 11.8182 11.5 11.8182Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.203 17.2727H9.79698C5.12844 17.2727 1.5187 21.3685 2.10526 26H20.8947C21.4813 21.3685 17.8716 17.2727 13.203 17.2727Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <div className={s.text}>Кабинет</div>
                </div>
                <div className={s.divbutton}>
                    <button>Корзина</button>
                </div>
            </div>
        </div>
    )
}

export default Header;