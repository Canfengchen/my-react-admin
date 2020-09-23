import React from 'react'
import css from './SassCard.module.scss'


function SassCard (props) {
  return (
    <div className={css['system-card']} >
      {
        props.cardList.map((card, key) => {
          return (
            <div
              key={key}
              className={css['desktop-card']}
              style={{'--logo': card.imgPic, '--logoActive': card.imgPicActive}}
              onClick={() => props.onClick(card)}
            >
              <div className={css['desktop-name']}>{ card.title }</div>
            </div>
          )
        })
      }
    </div>
  )
}
export default SassCard
