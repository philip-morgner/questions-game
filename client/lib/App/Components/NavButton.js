Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="src/App/Components/NavButton.js";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require("react");var _react2=_interopRequireDefault(_react);var _reactNative=require("react-native");var _expo=require("expo");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var styles=function styles(fontLoaded){return function(colorProp){return _reactNative.StyleSheet.create({container:{flexDirection:"row",width:"80%"},button:{flex:1,alignItems:"center",justifyContent:"center",width:"80%",height:50,backgroundColor:colorProp||"#3C85BF",borderRadius:25,margin:16},buttonText:{color:"white",fontSize:20,fontFamily:fontLoaded?"BalooBhai":null}});};};var NavButton=function(_React$Component){_inherits(NavButton,_React$Component);function NavButton(){var _ref,_this2=this;var _temp,_this,_ret;_classCallCheck(this,NavButton);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=NavButton.__proto__||Object.getPrototypeOf(NavButton)).call.apply(_ref,[this].concat(args))),_this),_this.state={fontLoaded:false},_this.handlePress=function _callee(){var _this$props,navigation,route,onPress,navigateTo,data;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_this$props=_this.props,navigation=_this$props.navigation,route=_this$props.route,onPress=_this$props.onPress;navigateTo=function navigateTo(route,props){navigation.navigate(route,props);};data=void 0;if(!onPress){_context.next=7;break;}_context.next=6;return regeneratorRuntime.awrap(onPress());case 6:data=_context.sent;case 7:navigateTo(route.title,{data:data});case 8:case"end":return _context.stop();}}},null,_this2);},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(NavButton,[{key:"componentWillMount",value:function componentWillMount(){return regeneratorRuntime.async(function componentWillMount$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap(_expo.Font.loadAsync({BalooBhai:require("../../../assets/fonts/BalooBhai-Regular.ttf")}));case 2:this.setState({fontLoaded:true});case 3:case"end":return _context2.stop();}}},null,this);}},{key:"render",value:function render(){var _props=this.props,route=_props.route,color=_props.color;var style=styles(this.state.fontLoaded);return _react2.default.createElement(_reactNative.TouchableOpacity,{style:style().container,onPress:this.handlePress,__source:{fileName:_jsxFileName,lineNumber:71}},_react2.default.createElement(_reactNative.View,{style:style(color).button,__source:{fileName:_jsxFileName,lineNumber:72}},_react2.default.createElement(_reactNative.Text,{style:style().buttonText,__source:{fileName:_jsxFileName,lineNumber:73}},route.title)));}}]);return NavButton;}(_react2.default.Component);exports.default=NavButton;