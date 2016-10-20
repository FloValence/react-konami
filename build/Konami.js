'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Konami = function (_Component) {
  _inherits(Konami, _Component);

  function Konami(props) {
    _classCallCheck(this, Konami);

    var _this = _possibleConstructorReturn(this, (Konami.__proto__ || Object.getPrototypeOf(Konami)).call(this, props));

    _this.n = 0;
    _this.onKeydown = _this.onKeydown.bind(_this);
    return _this;
  }

  _createClass(Konami, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeydown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeydown);
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(e) {
      if (e.keyCode === this.props.konami[this.n++]) {
        if (this.n === this.props.konami.length) {
          this.props.easterEgg();
          this.n = 0;
          return false;
        }
      } else {
        this.n = 0;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Konami;
}(_react.Component);

Konami.propTypes = {
  easterEgg: _react.PropTypes.func.isRequired,
  konami: _react.PropTypes.arrayOf(_react.PropTypes.number)
};

Konami.defaultProps = {
  konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
};

exports.default = Konami;