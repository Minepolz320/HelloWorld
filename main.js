
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

var stack = [];
var heap = [stack];

Array.prototype.getfirstStackElement = function(){
    return this[0][0];
}
Array.prototype.getElementFromStack = function(n){
    return this[0][this.getStackLength()-n-1];
}
Array.prototype.getLastStackElement = function(){
    return this[0][this.getStackLength()-1];
}
Array.prototype.getStackLength = function(){
    return this[0].length;
}

Array.prototype.popTo = function(h){
    if(this.getStackLength()>h){
        this[0].pop();
        Array.apply(this.popTo(h));
    }
}



Array.prototype.invoke = function(n,arg){
   
        for(var c = arg.length; c>0 ; c--){ 
              this[0].push(arg[c-1]); 
        }
    
     this[n].apply(this);
}

 function allocate(){
      
    this[this.getElementFromStack(1)] =this.getLastStackElement();  

     for(var c = this.getElementFromStack(1)+ 1; c < this.getElementFromStack(1) + 
         this.getLastStackElement(); c++){
         this[c] = -1;   
     } 
     this.popTo(this.getStackLength()-1);
     
}


//function iteratorGetNext(){
//    return (this[0][this[this.getLastStackElement()+1]++]);   
//}
//function iteratorGetPrevious(){
//  return (this[0][--this[this.getLastStackElement()+1]]);
//}
//function iteratorSetposition(){
//  this[this.getElementFromStack(1)]=this[0].pop();
//}
function createIterator(){
    this[this.getElementFromStack(2)+1] = 0;
    this[this.getElementFromStack(2)+2] = this.getElementFromStack(1);
    this[this.getElementFromStack(2)+3] = this.getLastStackElement();
    
    this.popTo(this.getStackLength()-2);
    
}

function beginiter(g){
    this[this.getLastStackElement()+1]++;
   
    if(this[this.getLastStackElement()+1]<this[this[this.getLastStackElement()+3]]){
        this[this.getLastStackElement()+2](this[this[this.getLastStackElement()+3]+this[this.getLastStackElement()+1]]);
        beginiter.apply(this);
   }

        
}


function main(){
    
    heap[10] = allocate;
    heap[11] = createIterator;
  
    heap[12] = beginiter;
    //some test str
    heap.invoke(10,[5,heap.length]);
    
    heap.invoke(10,[4,heap.length]);
    heap.invoke(11,[stack[0],function(g){            
        console.log(g+" from struct");
    }]);
    
    heap.invoke(12,[]);
    
    console.log(heap);
   

}



