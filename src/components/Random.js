import React, {Component} from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'

import {target, groupidToString, removed, WindowWidth, SoundMode} from '../helper'

const Line = styled.div`
  width: 150vw;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;

  background: url(/assets/new/train.svg) center center;
  background-size: auto 100%;
`

const SlideContainer = styled.div`
  width: 30000px;
  transition: all 15s;
  transition-timing-function: cubic-bezier(0.1, 0.7, 0.6, 0.1);
`

const Item = styled.div`
  height: 1000px;
  width: 750px;
  margin-right: 10px;
  z-index: -999;
  display: inline-block;
  transform: translateY(320px);
  background: url(${props => props.src}) no-repeat center center;
  background: contain;
`

export default class Random extends Component {
  state = {
    // default to center when screen width is 1680px;
    left: 170 + (WindowWidth / 2 - window.innerWidth / 2),
    items: [],
    playsound: false,
    playDingSound: false,
  }

  constructor() {
    super()
    const emptyArr = [...new Array(100)].map((x, i) => {
      if (i == 30)
        return groupidToString(target)
      let result;
      do {
        result = parseInt(Math.random() * 10) % 6 + 1
      } while (removed.indexOf(result) !== -1)
      return groupidToString(result)
    })
    this.state.items = emptyArr
  }

  startRandom = () => {
    this.setState({ left: this.state.left + 22400, playsound: true })
    setTimeout(() => {
      this.setState({ playDingSound: true })
    }, 15 * 1000)
  }

  render() {
    return (
      <div>
        {this.state.playsound &&
          <Sound autoLoad={true} url={`/sounds/${SoundMode}.mp3`} playStatus={Sound.status.PLAYING}/>
        }
        {this.state.playDingSound &&
          <Sound autoLoad={true} url={`/sounds/ding.mp3`} playStatus={Sound.status.PLAYING}/>
        }
          <Line onClick={this.startRandom}/>
          <SlideContainer style={{'marginLeft': `-${this.state.left}px`}}>
            {this.state.items.map((x, i) => {
              console.log(x)
              return <Item key={`key${x}${i}`} src={`/assets/new/${x}.svg`}/>
            })}
          </SlideContainer>
      </div>
    )
  }
}
