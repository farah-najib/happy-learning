import React from 'react'
import '../styles/PandaAnimation.css'

const PandaAnimation: React.FC = () => {
  return (
    <div>
      {/* <div className="sky">
        <div className="sun"></div>
      </div> */}

      <div className="grass">
        <div className="body1">
          <div className="face">
            <div className="ear-left"></div>
            <div className="ear-right"></div>

            <div className="eye-right">
              <div className="d1"></div>
              <div className="d2"></div>
            </div>

            <div className="eye-left">
              <div className="d3"></div>
              <div className="d4"></div>
            </div>

            <div className="nose"></div>
          </div>

          <div className="hand-left"></div>
          <div className="hand-right"></div>
          <div className="leg-left"></div>
          <div className="leg-right"></div>
        </div>

        {/* <div className="bamboo">
          <div className="s1">
            <div className="leaf1"></div>
            <div className="leaf2"></div>
            <div className="leaf3"></div>
          </div>
          <div className="s2"></div>
          <div className="s3"></div>
          <div className="s4"></div>
        </div> */}
      </div>
    </div>
  )
}

export default PandaAnimation
