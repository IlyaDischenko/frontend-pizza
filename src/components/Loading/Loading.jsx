import s from './Loading.module.scss'

function Loading() {

    return (
        <div className={s.wrapper}>
            <svg className={s.spinner} viewBox="0 0 50 50">
                <circle className={s.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
  )

}

export default Loading