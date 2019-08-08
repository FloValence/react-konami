import { Component } from 'react';

interface KonamiProps {
  easterEgg: () => void;
  konami: number[];
  resetDelay: number;
}

export default class Konami extends Component<KonamiProps> {
  static defaultProps: Pick<KonamiProps, 'konami' | 'resetDelay'> = {
    resetDelay: 2000,
    konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  }

  n = 0
  delayId = 0

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown)
  }

  componentDidUpdate(prevProps: KonamiProps) {
    const { resetDelay = 0, konami = [] } = prevProps
    const resetDelayHasChanged = resetDelay !== this.props.resetDelay
    if (resetDelayHasChanged && resetDelay <= 0) {
      this.delayOff()
    } else if (resetDelayHasChanged) {
      this.delayOff()
      this.delayOn()
    }
    if (konami.join('') !== (this.props.konami || []).join('')) {
      this.resetN()
      this.delayOff()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
    this.delayOff()
  }

  delayOff() {
    if (this.delayId) clearTimeout(this.delayId)
  }

  delayOn() {
    if ((this.props.resetDelay || 0) <= 0) return
    this.delayOff()
    this.delayId = setTimeout(() => this.resetN(), this.props.resetDelay)
  }

  resetN(keyCode?: number) {
    if (!keyCode) {
      this.n = 0
      return
    }

    const { konami = [] } = this.props

    let count = 1
    while (this.n-- > 0 && konami[this.n] === keyCode)
      count++
    this.n = 0
    while (count-- > 0 && konami[this.n] === keyCode)
      this.n++
  }

  onKeydown = (e: KeyboardEvent) => {
    const { konami = [], easterEgg } = this.props

    if (e.keyCode === konami[this.n]) {
      this.n++;
      this.delayOn();
      if (this.n === konami.length) {
        easterEgg()
        this.resetN()
        this.delayOff()
        return
      }
    } else {
      this.resetN(e.keyCode)
      this.delayOff()
    }
  }

  render() {
    return null
  }
}
