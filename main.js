var canvas = document.getElementById("draw");
 

var conf = {
	"DEBUG": false,
	"Applications": [
        [
			["test"],
			function() {
				console.log("Application", this);
				var l = this.getFromStack(0);    
                console.log("document", document, l);
//                 this.allocate(5);
//                 this[this.getLastStackElemet()+5]=canvas.getContext("2d");
                var self = this;
                document.getElementById("1").addEventListener("click", function() {
					self.invokeFunc( 3 );
                }, false);
			},
			function() {
				var arr =  Array.from(document.getElementById("info").value.split(','));
                this.putToStack( arr );
                this.thirdPartyFuncInvoke( arr.length, ["fillRect", 4] );
            }, 
            function() {
                this.thirdPartyFuncInvoke( 0, ["beginPath", 4] );
				this.invokeFunc(2);
                this.thirdPartyFuncInvoke( 0, ["stroke", 4] );
            },
            canvas.getContext("2d")
		]
	]
}
function loaded(){
	(function(config){
		var heap = function(){}
		heap.prototype = Object.create(Array.prototype);
		heap.prototype.constructor = heap;
		
        heap.prototype.getLastStackElemet = function() {
            return this[0][this[0].length-1];
        }
        heap.prototype.getFromStack = function( value ) {
			return this[0][this[0].length - 1 - value];
		}
        heap.prototype.getStackLength = function() {
            return this[0].length;
        }
        heap.prototype.putToStack = function( value ) {
	        for( var c = 0; c < value.length; c++ ) {
				this[0].push( value[c] );
			}
        }
		heap.prototype.invokeFunc = function( value ) {
			this[value].apply( this );
		}
		heap.prototype.removeFromStack = function( value ) {
			this[0] = this[0].slice( 0, this[0].length - 1 - value );
		}
		heap.prototype.loadApp = function( value ) {
			for( var c = 0; c < value.length; c++ ) {
				this.push( value[c] );
			}
		}
		heap.prototype.thirdPartyFuncInvoke = function( lengthDataScopeInStack, arg ) {
			if ( arg ) {
				this.putToStack( arg );
			}
// 			console.log("thirdPartyFuncInvoke ", this[0].slice(this[0].length - lengthDataScopeInStack, lengthDataScopeInStack - 1), this.getFromStack( 1 ), this[this.getLastStackElemet()][this.getFromStack( 1 )]);
			this[this.getLastStackElemet()][this.getFromStack( 1 )].apply( this[this.getLastStackElemet()], this[0].slice(this.getStackLength() - lengthDataScopeInStack - 2, lengthDataScopeInStack + 1) );
			for( var c = 0; c < lengthDataScopeInStack + 2; c++ ) {
				this[0].pop();
			}
// 			console.log('this[0]',this[0]);
// 			this[0] = this[0].splice( this[0].length - lengthDataScopeInStack, lengthDataScopeInStack )
		}
        heap.prototype.Arginvoke = function( value ){
            for( var a = this[value[0]]+value[0] ; a > value[0] ; a-- ) {
                this[0].push( this[a] ); 
            }
            this.invokeFunc(value[1]);
        }
        heap.prototype.allocate = function( value ){
            this[0].push(this.length);
            this[this.getLastStackElemet()] = value;
        
            for( var a = this.getLastStackElemet()+1; a < this.getLastStackElemet()+value; a++ ){
             this[a]=-1;
           }
           
        }

        heap.prototype.deallocate = function( value ){
            for( var a = this[value]+value ; a > value-1 ; a-- ){
                this[a]=0;
            }
      
        }
        
        
        
        
        
		var RAM = Object.create( Array.prototype, {
			runApp: {
			    value: function(value) {
					if (config.DEBUG) console.log( 'use `runApp` with', value );
					RAM.push( Object.create( heap.prototype ) );
					RAM.last.loadApp( config.Applications[value] );
					if (config.DEBUG) console.log( 'log `runApp` with', RAM.last );
					config.Applications[value][1].apply( RAM.last );
				},
				writable: false
			},
			invokeFunc: {
				configurable: false,
			    get: function() { 
				    if (config.DEBUG) console.log('get `RAM.invokeFunc`');
				    return function(value) {
						if (config.DEBUG) console.log('use `RAM.invokeFunc` with', value);
						config.Applications[value][1].apply([]);
					} 
				},
			    set: function(value) {
                    
					if (config.DEBUG) console.log('Setting `RAM.invokeFunc` to', value);
			    }
			},
			last: {
				configurable: false,
			    get: function() { 
				    if (config.DEBUG) console.log('get `RAM.last`');
				    return this[this.length - 1]; 
				},
			    set: function(value) {
					if (config.DEBUG) console.log('Setting `RAM.last` to', value);
					this[this.length - 1] = value;
			    }
			}
		});
		if (config.DEBUG) console.log( "config", config, config["Applications"][0], RAM )
		RAM.runApp(0);
       
	})( conf );
}