import React, { useState, useEffect, useRef } from 'react'
import classNames from "classnames/bind";
import styles from "./FlashCard.module.scss";

const cx = classNames.bind(styles);

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={cx('card')}
      style={{ height: height, ...(flip ? { transform: 'rotateY(180deg)' } : {})}}
      onClick={() => setFlip(!flip)}
    >
      <div className={cx("front")} ref={frontEl}>
        {flashcard.question}
      </div>
      <div className={cx("back")} ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}