
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");



var stack = [];
var heap = [stack];


Array.prototype.getElementFromStack = function(n){
    return this[0][this.getStackLength()-n-1];

}

Array.prototype.getLastElement = function(){
    return this[0][this.getStackLength()-1];

}
Array.prototype.stackSwapRemove = function(off){
    this[0][this.getStackLength()-off-1] = stack.pop();
    
}

Array.prototype.invoke = function(n,arg){
    for(var c = 0; c < arg.length; c++){
        this[0].push(arg[c]);
    }
    this[n].apply(this);
}
  
Array.prototype.getStackLength = function(){
    return this[0].length;
}



 function allocate(){
      
    this[this.getLastElement()] = this.getElementFromStack(1);  
     for(var c = this.getLastElement() + 1; c < this.getLastElement() + this.getElementFromStack(1); c++){
        heap[c] = -1;   
     } 
    
   
     
}



function putMyData(){

    this.getElementFromStack();
    this.getElementFromStack();
    
}



function main(){
    
    
    
    heap[10] = allocate;
    heap[11] = putMyData;
    
    heap.invoke(10,[3,heap.length]);
    heap.invoke(11,[]);
    
   console.log(stack);
    
    
    
    
    
    

}



