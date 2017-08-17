'use strict';

var smoothie = require('smoothie');
var React = require('react');

var SmoothieComponent = React.createClass({
  displayName: 'SmoothieComponent',

  getDefaultProps: function getDefaultProps() {
    return {
      width: 800,
      height: 200,
      streamDelay: 0
    };
  },
  componentDidMount: function componentDidMount() {
    if (!this.smoothie) this.smoothie = new smoothie.SmoothieChart(this.props);

    if (this.canvas) this.smoothie.streamTo(this.canvas, this.props.streamDelay);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.width);
    // console.log(prevProps.width);
    // console.log(this.props.height);
    // console.log(prevProps.height);
    if (this.props.width != prevProps.width || this.props.height != prevProps.height) {
      console.log('Size changed');
      // this.smoothie.resize();
    } else {
        // console.log('Props changed, size the same');
      }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.smoothie.stop();
    this.smoothie = undefined;
  },
  render: function render() {
    var _this = this;

    return React.createElement('canvas', { width: this.props.width, height: this.props.height, ref: function ref(canv) {
        return _this.canvas = canv;
      } });
  },
  addTimeSeries: function addTimeSeries(tsOpts, addOpts) {
    var ts = new smoothie.TimeSeries(tsOpts);
    this.smoothie.addTimeSeries(ts, addOpts);
    return ts;
  }
});

module.exports = SmoothieComponent;