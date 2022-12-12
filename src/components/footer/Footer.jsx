
import { Link } from 'react-router-dom'
import s from './Footer.module.scss'

function Footer() {


    return (
        <>
            <footer className={s.footer_wrapper}>
                <div className={s.footer_inner}>

                    <div className={s.left_element}>
                        <span>Сообщить об ошибке<br></br>poskoreev@mail.ru</span>
                        <span>СЗ Дищенко Илья Алексеевич</span>
                    </div>


                    <div className={s.right_element}>
                        <div className={s.area}><a target="_ blank" href='https://yandex.ru/maps/10/orel/?from=mapframe&ll=36.055710%2C52.972829&mode=usermaps&source=mapframe&um=constructor%3A13b7334a823d0684382681f29f000b7f07c56fc1db12a47eae40e8adfcfef387&utm_source=mapframe&z=11'>Зона доставки</a></div>
                        {/* <div className={s.yandex_map}>
                            <a href="https://yandex.ru/maps/10/orel/?utm_medium=mapframe&utm_source=maps"  className={s.first_link}>Орёл</a>
                            <a href="https://yandex.ru/maps/10/orel/?ll=36.134170%2C52.975303&mode=usermaps&source=constructorLink&um=constructor%3A13b7334a823d0684382681f29f000b7f07c56fc1db12a47eae40e8adfcfef387&utm_medium=mapframe&utm_source=maps&z=13.2"  className={s.second_link}>Яндекс Карты — транспорт, навигация, поиск мест</a>
                            <iframe title='yandex' src="https://yandex.ru/map-widget/v1/-/CCUjeCbNhA" width="250" height="250" frameBorder="0" allowFullScreen={true}  className={s.iframe}></iframe>
                        </div> */}
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer