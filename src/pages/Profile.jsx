
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updaterEmailReducer } from './../redux/slices/UserStateSliceFolder/userStateSlice'
import { updateEmailAction } from './../redux/slices/UserStateSliceFolder/userAsyncThunk'

import s from '../components/profile/Profile.module.scss'
import x from '../components/notFound/NotFound.module.scss'

function Profile() {
    const dispatch = useDispatch()
    const userstate = useSelector((state) => state.userState)


    const actionUpdateEmail = () => {
        const inf = {"token": userstate.token, "email": userstate.updatedMail}
        dispatch(updateEmailAction(inf))
    }

    if (userstate.is_login == false) {
        return (
            <div className={x.maindiv}>
                <p>Эта страница пока в sosi разработке(</p>
                <Link to="/">
                    <button>На главную</button>
                </Link>
            </div>
        )
    } else if (userstate.is_login == true) return (
        <div className={s.root_profile}>
            <div className={s.profile_wrapper}>
                <div className={s.title}>Личный кабинет</div>
                <div className={s.name}>
                    <span>Имя</span>
                    <div>
                        <input type="name" className={s.input_name} value={userstate.user_data.name} />
                        <div className={s.change}>Изменить</div>
                    </div>
                </div>
                <div className={s.number}>
                    <span>Номер телефона</span>
                    <div>
                        <div className={s.number_value}> {userstate.number} </div>
                    </div>
                </div>
                <div className={s.email}>
                    <span>Почта</span>
                    <div>
                        <input type="email" className={s.input_email} onChange={(event) => dispatch(updaterEmailReducer(event.target.value))} value={userstate.updatedMail} />
                        <div onClick={actionUpdateEmail} className={s.change}>Изменить</div>
                    </div>
                </div>

                <div className={s.your_cart}>Тут будут все ваши заказы</div>
                <div className={s.exit_button}>
                    <button>Выйти</button>
                </div>
            </div>
        </div>
    )
}

export default Profile