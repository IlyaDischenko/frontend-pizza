import React from 'react'
import s from './MSkeleton.module.scss'

const MSkeleton = () => {


    return (
    <>
        <div className={s.skeleton_wrapper}>
            <div className={s.circle}></div>
            <div className={s.rect}></div>
        </div>
    </>
    )
} 


export default MSkeleton