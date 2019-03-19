Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _jsxFileName="src/App/Components/Menu.js";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=require("prop-types");var _propTypes2=_interopRequireDefault(_propTypes);var _react=require("react");var _react2=_interopRequireDefault(_react);var _reactNative=require("react-native");var _NavButton=require("./NavButton");var _NavButton2=_interopRequireDefault(_NavButton);var _Main=require("./Main");var _Main2=_interopRequireDefault(_Main);var _PlayerSetUp=require("./PlayerSetUp");var _PlayerSetUp2=_interopRequireDefault(_PlayerSetUp);var _AddQuestionUI=require("./AddQuestionUI");var _AddQuestionUI2=_interopRequireDefault(_AddQuestionUI);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var styles=_reactNative.StyleSheet.create({page:{flex:1,justifyContent:"center",alignItems:"center"}});var menuOptions=[{title:"PlayerSetUpList",component:_PlayerSetUp2.default},{title:"AddQuestionUI",component:_AddQuestionUI2.default},{title:"Main",component:_Main2.default},{title:"Main",component:_Main2.default}];var Menu=function(_React$Component){_inherits(Menu,_React$Component);function Menu(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Menu);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Menu.__proto__||Object.getPrototypeOf(Menu)).call.apply(_ref,[this].concat(args))),_this),_this.renderMenuButton=function(route,i){var navigation=_this.props.navigation;return _react2.default.createElement(_NavButton2.default,{key:i,route:route,navigation:navigation,__source:{fileName:_jsxFileName,lineNumber:36}});},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Menu,[{key:"render",value:function render(){var _this2=this;return _react2.default.createElement(_reactNative.View,{style:styles.page,__source:{fileName:_jsxFileName,lineNumber:40}},menuOptions.map(function(route,i){return _this2.renderMenuButton(route,i);}));}}]);return Menu;}(_react2.default.Component);exports.default=Menu;