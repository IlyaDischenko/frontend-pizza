import s from '../components/main/Main.module.scss'

import Pizza from '../components/main/pizza/Pizza'

function Main() {
    return (
        <main className={s.main}>
            <Pizza />
        </main>
    )
}

export default Main