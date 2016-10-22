import { Component, PropTypes } from 'react'

class Konami extends Component {

  constructor(props) {
    super(props)

    this.n = 0
    this.delayId = null
    this.onKeydown = this.onKeydown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
    this.delayOff()
  }

  delayOff() {
      if (this.delayId) clearTimeout(this.delayId)
  }

  delayOn() {
     this.delayOff()
     this.delayId = setTimeout(() => this.resetN(), this.props.resetDelay)
  }

  resetN() { this.n = 0 }

  onKeydown(e) {
     if (e.keyCode === this.props.konami[this.n++]) {
       this.delayOn();
        if (this.n === this.props.konami.length) {
            this.props.easterEgg()
            this.resetN()
            this.delayOff()
            return false
        }
    } else {
        this.resetN()
        this.delayOff()
    }
  }

  render() {
    return null
  }
}

Konami.propTypes = {
  easterEgg: PropTypes.func.isRequired,
  konami: PropTypes.arrayOf(PropTypes.number),
  resetDelay: PropTypes.number,
}

Konami.defaultProps = {
  resetDelay: 1500,
  konami: [38,38,40,40,37,39,37,39,66,65],
}

export default Konami
