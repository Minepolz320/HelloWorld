
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

var stack = [];
var heap = [stack];


Array.prototype.getElementFromStack = function(n){
    return this[0][this.getStackLength()-n-1];
}

Array.prototype.getLastStackElement = function(){
    return this[0][this.getStackLength()-1];
}
Array.prototype.stackLastMoveTo = function(off){
    this[0][this.getStackLength()-off-1] = stack.pop();
    //????????
}
Array.prototype.getStackLength = function(){
    return this[0].length;
}

Array.prototype.invoke = function(n,arg){
    if(arg!=undefined){
        for(var c = 0; c < arg.length; c++){
        this[0].push(arg[c]); 
        }
    }
    return this[n].apply(this);
}

 function allocate(){
      
    this[this.getLastStackElement()] = this.getElementFromStack(1);  
     
     for(var c = this.getLastStackElement() + 1; c < this.getLastStackElement() + 
         this.getElementFromStack(1); c++){
         this[c] = -1;   
     } 
     this.stackLastMoveTo(1);
}


function iteratorGetNext(){
    return (this[0][this[this.getLastStackElement()+1]++]);   
}
function iteratorGetPrevious(){
  return (this[0][--this[this.getLastStackElement()+1]]);
}
function iteratorSetposition(){
  this[this.getElementFromStack(1)]=this[0].pop();
}
function createIterator(){
    this[this.getLastStackElement()+1] = 0;
    
}



function main(){
    
    heap[10] = allocate;
   
    heap[11] = iteratorGetNext;
    heap[12] = iteratorGetPrevious;
    heap[13] = createIterator;
    heap[14] = iteratorSetposition;
    
    
    stack.push(1);
    stack.push(2);
    
    
    heap.invoke(10,[2,heap.length]);
    heap.invoke(13);
        
    console.log(heap.invoke(11));
    console.log(heap.invoke(11));
    console.log(heap.invoke(11));
   
    console.log(heap.invoke(12));
    console.log(heap.invoke(12));
    console.log(heap.invoke(12));
   

}



