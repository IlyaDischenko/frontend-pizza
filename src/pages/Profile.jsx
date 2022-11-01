
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updaterEmailReducer, updaterNameReducer } from './../redux/slices/UserStateSliceFolder/userSlice'
import { exitUser } from './../redux/slices/PopupStateSliceFolder/popupSlise'
import { updateEmailAction, updateNameAction } from './../redux/slices/UserStateSliceFolder/userAsyncThunk'

import s from '../components/profile/Profile.module.scss'
import x from '../components/notFound/NotFound.module.scss'

function Profile() {
    const dispatch = useDispatch()
    const userstate = useSelector((state) => state.user)
    const popup = useSelector((state) => state.popup)


    const actionUpdateEmail = () => {
        const inf = {"token": popup.token, "email": userstate.updatedMail}
        dispatch(updateEmailAction(inf))
    }

    const actionUpdateName = () => {
        const inf = {"token": popup.token, "name": userstate.updatedName}
        dispatch(updateNameAction(inf))
    }

    const checkChangeMail = () => {
        if (userstate.updatedMailStatus == "default") {
            return s.input_email
        } else if (userstate.updatedMailStatus == "success") {
            return s.success_input_email
        } else if (userstate.updatedMailStatus == "error") {
            return s.error_input_email
        }
    }

    const checkChangeName = () => {
        if (userstate.updatedNameStatus == "default") {
            return s.input_name
        } else if (userstate.updatedNameStatus == "success") {
            return s.success_input_name
        } else if (userstate.updatedNameStatus == "error") {
            return s.error_input_name
        }
    }

    const exitUserReduser = () => {
        dispatch(exitUser())
    }

    if (popup.is_login == false) {
        return (
            <div className={x.maindiv}>
                <p>Эта страница пока в sosi и дрочи мне разработке(</p>
                <Link to="/">
                    <button>На главную</button>
                </Link>
            </div>
        )
    } else if (popup.is_login == true) return (
        <div className={s.root_profile}>
            <div className={s.profile_wrapper}>
                <div className={s.title}>Личный кабинет</div>
                <div className={s.name}>
                    <span>Имя</span>
                    <div>
                        <input type="name" className={checkChangeName()} onChange={(event) => dispatch(updaterNameReducer(event.target.value))} value={userstate.updatedName} />
                        <div onClick={actionUpdateName} className={s.change}>Изменить</div>
                    </div>
                </div>
                <div className={s.number}>
                    <span>Номер телефона</span>
                    <div>
                        <div className={s.number_value}> {popup.number} </div>
                    </div>
                </div>
                <div className={s.email}>
                    <span>Почта</span>
                    <div>
                        <input type="email" className={checkChangeMail()} onChange={(event) => dispatch(updaterEmailReducer(event.target.value))} value={userstate.updatedMail} />
                        <div onClick={actionUpdateEmail} className={s.change}>Изменить</div>
                    </div>
                </div>

                <div className={s.your_cart}>Тут будут все ваши заказы</div>
                <div  className={s.exit_button}>
                    <Link to="/">
                        <button onClick={exitUserReduser}>Выйти</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile