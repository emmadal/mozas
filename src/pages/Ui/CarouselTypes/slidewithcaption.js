import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap"

class Slidewithcaption extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }
  
  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === this.props.images.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.images.length - 1
        : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const {images} = this.props
    const slides = images.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item?.link}
        >
          <img
            src={item?.link}
            className="d-block img-fluid"
            alt={item?.altText}
            height={100}
            width={100}
          />
          {/* <CarouselCaption
            captionText={item?.altText}
            captionHeader={item?.caption}
          /> */}
        </CarouselItem>
      )
    })

    return (
      <React.Fragment>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={images}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Préçedent"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Suivant"
            onClickHandler={this.next}
          />
        </Carousel>
      </React.Fragment>
    )
  }
}

Slidewithcaption.propTypes = {
  images: PropTypes.array,
}

export default Slidewithcaption
