import { Component, PropTypes } from 'react'

class Konami extends Component {

  constructor(props) {
    super(props)

    this.keys = []
    this.resetKeys = () => null
    this.onKeydown = this.onKeydown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown)
  }

  onKeydown(e) {
    clearTimeout(this.resetKeys)
    this.keys.push(e.keyCode)
    if (this.keys.toString().indexOf(this.props.konami) >= 0) {
      if (this.props.unbindAfterUse) {
        document.removeEventListener('keydown', this.onKeydown)
      }
      return this.props.easterEgg()
    }
    this.resetKeys = setTimeout(() => { this.keys = [] }, this.props.resetTimeout)
  }

  render() {
    return null
  }
}

Konami.propTypes = {
  easterEgg: PropTypes.func.isRequired,
  konami: PropTypes.string,
  unbindAfterUse: PropTypes.bool,
  resetTimeout: PropTypes.number.isRequired
}

Konami.defaultProps = {
  easterEgg() {
    alert('Hell Yeah')
  },
  konami: '38,38,40,40,37,39,37,39,66,65',
  resetTimeout: 600000
}

export default Konami
