import s from './Main.module.scss'

import Pizza from './pizza/Pizza'

function Main() {
    return (
        <div className={s.main}>
            <Pizza />
        </div>
    )
}

export default Main