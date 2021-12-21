import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

class ScrollableContainer extends React.Component<Props> {
  private readonly ref = React.createRef<HTMLDivElement>()

  scrollUp() {
    this.ref.current?.scrollTo(0, 0)
  }

  scrollDown() {
    this.ref.current?.scrollTo(0, this.ref.current?.scrollHeight)
  }

  scrollLeft() {
    this.ref.current?.scrollTo(0, 0)
  }

  scrollRight() {
    this.ref.current?.scrollTo(this.ref.current?.scrollWidth, 0)
  }

  render() {
    return (
      <div ref={this.ref} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export default ScrollableContainer
