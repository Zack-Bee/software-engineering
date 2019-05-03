import { Component, createRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as snap from 'snapsvg'

const styles = {

}

const PageAnimation = (props) => {
  let loader
  const { open } = props
  if ()
  return (
    <div ref={(ref) => { loader = ref }} class='pageload-overlay' data-opening='m 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z'>
      <svg xmlns='http://www.w3.org/2000/svg'
        width='100%' height='100%' viewBox='0 0 80 60'
        preserveAspectRatio='none'
      >
        <path d='m 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z' />
      </svg>
    </div>
  )
}

export default withStyles(styles)(PageAnimation)

function extend( a, b ) {
  for( var key in b ) {
    if( b.hasOwnProperty( key ) ) {
      a[key] = b[key];
    }
  }
  return a;
}

function SVGLoader( el, options ) {
  this.el = el;
  this.options = extend( {}, this.options );
  extend( this.options, options );
  this._init();
}

SVGLoader.prototype.options = {
  speedIn : 500,
  easingIn : mina.linear
}

SVGLoader.prototype._init = function() {
  var s = Snap( this.el.querySelector( 'svg' ) );
  this.path = s.select( 'path' );
  this.initialPath = this.path.attr('d');

  var openingStepsStr = this.el.getAttribute( 'data-opening' );
  this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
  this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0;
  if( this.openingStepsTotal === 0 ) return;

  // if data-closing is not defined then the path will animate to its original shape
  var closingStepsStr = this.el.getAttribute( 'data-closing' ) ? this.el.getAttribute( 'data-closing' ) : this.initialPath;
  this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
  this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0;

  this.isAnimating = false;

  if( !this.options.speedOut ) {
    this.options.speedOut = this.options.speedIn;
  }
  if( !this.options.easingOut ) {
    this.options.easingOut = this.options.easingIn;
  }
}

SVGLoader.prototype.show = function() {
  if( this.isAnimating ) return false;
  this.isAnimating = true;
  // animate svg
  var self = this,
    onEndAnimation = function() {
      classie.addClass( self.el, 'pageload-loading' );
    };
  this._animateSVG( 'in', onEndAnimation );
  classie.add( this.el, 'show' );
}

SVGLoader.prototype.hide = function() {
  var self = this;
  classie.removeClass( this.el, 'pageload-loading' );
  this._animateSVG( 'out', function() {
    // reset path
    self.path.attr( 'd', self.initialPath );
    classie.removeClass( self.el, 'show' );
    self.isAnimating = false;
  } );
}

SVGLoader.prototype._animateSVG = function( dir, callback ) {
  var self = this,
    pos = 0,
    steps = dir === 'out' ? this.closingSteps : this.openingSteps,
    stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
    speed = dir === 'out' ? self.options.speedOut : self.options.speedIn,
    easing = dir === 'out' ? self.options.easingOut : self.options.easingIn,
    nextStep = function( pos ) {
      if( pos > stepsTotal - 1 ) {
        if( callback && typeof callback == 'function' ) {
          callback();
        }
        return;
      }
      self.path.animate( { 'path' : steps[pos] }, speed, easing, function() { nextStep(pos); } );
      pos++;
    };

  nextStep(pos);
}

