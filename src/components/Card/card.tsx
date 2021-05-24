import React, { } from 'react'
import { View, Text } from '@tarojs/components'

import './card.scss'

export interface CardProps {
  title: string,
}

export class Card extends React.Component<CardProps> {

  render() {
    const { title } = this.props
    return (
      React.createElement(
        View, { className: 'card' },
        React.createElement(View, { className: 'card-title' },
          React.createElement(Text, {}, title),
        ),
        React.createElement(View, {}, this.props.children),
      )
    )
  }
}
