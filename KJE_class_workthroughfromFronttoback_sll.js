function Node(value) {
   this.value = value;
   this.next = null;
 }

 var node = new Node(12);

 console.log(node);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const node = new Node(23);

 console.log(node);


class List {
  constructor() {
    this.head = null;
  }

  // Add Front
  // Rudy isn’t nice: he cuts in line in front of everyone else. 
  // Given a pointer to the first ListNode and a value, create a new node, assign it to the list head, 
  // and return a pointer to the new head node.

  addFront(value) {
    const node = new Node(value);

    node.next = this.head;
    this.head = node;

    return this;
  }

  /**  
   * 
   * Remove Front
    Ha! Rudy is getting what he deserves – kicked out of line. 
    Given a pointer to the first node in a list, remove the head node and 
    return the new list head node. If the list is empty, return null.
  */

  removeFront() {
    const node = this.head;

    if (!node) {
      return node;
    }

    // try {
    //   this.head = this.head.next;
    // } catch (error) {
    //   console.log(error.message);
    //   return null;
    // }
    this.head = node.next;


    return this;
  }

  isEmpty() {
    return this.head === null;
    console.log('expression', 4 > 5);
    if (this.head !== null) {
      return false;
    } else {
      return true;
    }
  }

  /** 
   * Front
  Finally, Tad and Sam reach the front of the line to get movie tickets. 
  Oh no – only one seat remains! Who was earlier in line: Tad or Sam? 
  Return the value (not the node) at the head of the list. 
  If the list is empty, return null.
  */

  front() {
    // (expression) ? (if true) : (if false)
    return this.isEmpty() ? null : this.head.value;
    if (this.isEmpty()) {
      return null;
    } else {
      return this.head.value;
    }

    const node = this.head;

    if (node) {
      return node.value;
    }

    return null;
  }

  /**  
   * Contains
    Sam thinks Tad might be somewhere in a very long line waiting to attend the Superman movie. 
    Given a ListNode pointer and a val, return whether val is found in any node in the list.
  */

  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return true;
      }

      current = current.next;
    }

    return false;
  }

  /**  
   * Length
    July 20, 2013: about 5000 people wait in line for a chance to audition for American Idol. 
    Create a function that accepts a pointer to the first list node, and returns number of nodes in that SList.
   * 
  */

  length() {
    let count = 0;
    let current = this.head;

    while (current) {
      count++;

      current = current.next;
    }

    return count;
  }

  /**  
   * Display
    Create display(node) for debugging that returns a string containing all list values. 
    Build what you wish console.log(myList) did!
  */

  display() {
    let current = this.head;

    while (current) {
      console.log("value is " + current.value);

      current = current.next;
    }

    return this;
  }

  /**
   * Max
   Create function max(node) to return list’s largest val.
   */

   max(){
     let max = this.head.value
     let runner = this.head
     while(runner){
        if (max < runner.value){
          max = runner.value
        }
        runner = runner.next
     }
     return max
   }



  /**
   * Min
   Create function min(node) to return list’s largest val.
   */

  min(){
    let min = this.head.value
    let runner = this.head
    while(runner){
       if (min > runner.value){
         min = runner.value
       }
       runner = runner.next
    }
    return min
  }

  /**
   * Avg
   Create function avg(node) to return list’s largest val.
   */
   
   avg(){
     let runner=this.head
     let sum = 0
     while(runner){
       sum+=runner.value
       runner = runner.next
     }


     return sum/this.length()
   }



  
   /** 
   * SList: Back
   Create a function that accepts a ListNode pointer and returns the last value in the list.
  */

  back(){
    let runner = this.head
    while(runner.next){
      runner = runner.next
    }
    return runner.value
  }

  
  
}

const list = new List();


list
  .addFront(23)
  .addFront(99)
  .addFront(34)
  .addFront(79)
  .addFront(9)
  .addFront(-1);


console.log(list.back())
console.log('contains -1', list.contains(-1));
console.log('length is ' + list.length());
// // .removeFront();
// // list.head = node;
 list.display();
 list.removeFront();
 console.log(list.front());

 console.log('contains -1', list.contains(-1));
 console.log('length is ' + list.length())