import s from '../components/notFound/NotFound.module.scss'
import { Link } from 'react-router-dom';

function Cart() {
    return (
        <div className={s.maindiv}>
            <p>Эта страница пока в разработке(</p>
            <Link to="/">
                <button>На главную</button>
            </Link>
        </div>
    )
}

export default Cart