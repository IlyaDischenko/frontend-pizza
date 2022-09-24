import s from '../components/main/Main.module.scss'

import Pizza from '../components/main/pizza/Pizza'

function Main() {
    return (
        <div className={s.main}>
            <Pizza />
        </div>
    )
}

export default Main