'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Konami = /** @class */ (function (_super) {
    __extends(Konami, _super);
    function Konami() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.n = 0;
        _this.delayId = 0;
        _this.onKeydown = function (e) {
            var _a = _this.props, _b = _a.konami, konami = _b === void 0 ? [] : _b, easterEgg = _a.easterEgg;
            if (e.keyCode === konami[_this.n]) {
                _this.n++;
                _this.delayOn();
                if (_this.n === konami.length) {
                    easterEgg();
                    _this.resetN();
                    _this.delayOff();
                    return;
                }
            }
            else {
                _this.resetN(e.keyCode);
                _this.delayOff();
            }
        };
        return _this;
    }
    Konami.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.onKeydown);
    };
    Konami.prototype.componentDidUpdate = function (prevProps) {
        var _a = prevProps.resetDelay, resetDelay = _a === void 0 ? 0 : _a, _b = prevProps.konami, konami = _b === void 0 ? [] : _b;
        var resetDelayHasChanged = resetDelay !== this.props.resetDelay;
        if (resetDelayHasChanged && resetDelay <= 0) {
            this.delayOff();
        }
        else if (resetDelayHasChanged) {
            this.delayOff();
            this.delayOn();
        }
        if (konami.join('') !== (this.props.konami || []).join('')) {
            this.resetN();
            this.delayOff();
        }
    };
    Konami.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.onKeydown);
        this.delayOff();
    };
    Konami.prototype.delayOff = function () {
        if (this.delayId)
            clearTimeout(this.delayId);
    };
    Konami.prototype.delayOn = function () {
        var _this = this;
        if ((this.props.resetDelay || 0) <= 0)
            return;
        this.delayOff();
        this.delayId = setTimeout(function () { return _this.resetN(); }, this.props.resetDelay);
    };
    Konami.prototype.resetN = function (keyCode) {
        if (!keyCode) {
            this.n = 0;
            return;
        }
        var _a = this.props.konami, konami = _a === void 0 ? [] : _a;
        var count = 1;
        while (this.n-- > 0 && konami[this.n] === keyCode)
            count++;
        this.n = 0;
        while (count-- > 0 && konami[this.n] === keyCode)
            this.n++;
    };
    Konami.prototype.render = function () {
        return null;
    };
    Konami.defaultProps = {
        resetDelay: 2000,
        konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    };
    return Konami;
}(React.Component));

var HelloWorld = React.createClass({
  getInitialState: function getInitialState() {
    return {
      name: 'you'
    }
  },

  updateName: function updateName(e) {
    this.setState({ name: e.target.value });
  },
  wellDone: function wellDone() {
    alert('Well done ' + this.state.name + '! Konami code activated');
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'label',
        null,
        'Enter your name: '
      ),
      React.createElement('input', { onChange: this.updateName }),
      React.createElement('br', null),
      React.createElement(
        'button',
        null,
        'Focus on me'
      ),
      React.createElement('br', null),
      React.createElement(
        'span',
        null,
        'Then type the secret code ;-) '
      ),
      React.createElement(
        'small',
        null,
        'kind reminder: ↑ ↑ ↓ ↓ ← → ← → B A'
      ),
      React.createElement(Konami, { easterEgg: this.wellDone })
    );
  }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));
