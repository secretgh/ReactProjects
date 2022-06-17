//Calculator tree is a binary tree.
//TreeNode has a value, left, right
class node {
    constructor( value = "", left = null, right = null){
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

function isOperator(char) {
    return (char === '+' || char === '-' || char === '*' || char === '/' || char === '^' || char === '(' || char === ')');
}

function priorityOp(op){
    if(op === '+' || op === '-'){
        return 1;
    }
    else if(op === '*' || op === '/' ){
        return 2;
    }
    else if(op === '^'){
        return 3;
    }
    else{
        return 0;
    }
}

//input: infix equation
//output: Binary tree
function buildTree(infix){
    if(infix == null || infix.length === 0){
        return null;
    }

    //convert infix notation to postfix.
    let postfix = "";
    let stack = [];
    for(let i = 0; i < infix.length; i++){
        if(isOperator(infix[i])){
            if(stack.length === 0 ){
                stack.push(infix[i]);
            }
            else if(priorityOp(infix[i]) > priorityOp(stack[stack.length-1]) || infix[i] === '('){
                stack.push(infix[i]);
            }
            else if(infix[i] === ')'){
                while(stack[stack.length-1] !== '('){
                    let op = stack.pop();
                    postfix += op;
                }
                stack.pop();
            }
            else if(priorityOp(infix[i]) < priorityOp(stack[stack.length-1])){
                while(priorityOp(infix[i]) < priorityOp(stack[stack.length-1])){
                    let op = stack.pop();
                    postfix += op;
                }
                stack.push(infix[i]);
            }
            else if(priorityOp(infix[i]) === priorityOp(stack[stack.length-1])){
                if(infix[i] === '^'){
                    stack.push(infix[i]);
                }
                else{
                    while(priorityOp(infix[i]) <= priorityOp(stack[stack.length-1])){
                        let op = stack.pop();
                        postfix += op;
                    }
                    stack.push(infix[i]);
                }
            }
        }
        else{
            postfix += infix[i];
        }
        //console.log(postfix);
        //console.log(stack);
    }
    while(stack.length > 0){
        let op = stack.pop();
        postfix += op;
    }
    console.log(infix);
    // console.log(stack);
    console.log(postfix);

    //construct tree based on postfix.
    for(let i = 0; i < postfix.length; i++){
        let c = postfix[i];
        if(isOperator(c)){
            let x = stack.pop();
            let y = stack.pop();
            let n = new node(c, y, x);
            stack.push(n);
        }
        else{
            stack.push(new node(parseInt(c)));
        }
    }
    return stack[0]; 
}

function calc(tree){
    if(Number.isInteger(tree.value)){
        return tree.value;
    }
    let left = null;
    let right = null;
    if(tree.left !== null){
        left = calc(tree.left);
    }
    if(tree.right){
        right = calc(tree.right);
    }
    if(left !== null && right !== null ){
        return op(tree.value, left, right);
    }
}

function op(opCode, left, right){
    switch (opCode) {
        case '+':
            return left + right;

        case '-':
            return left - right;

        case '*':
            return left*right;

        case '/':
            return left/right;

        case '^':
            return Math.pow(right,left);
    }
}

function printTree(tree, height){
    const map = mapTreeNode(tree, height);
    let string = "";
    for(let i = height; i > 0; i--){
        let a = map.get(i);
        let padding = " ".repeat((height-1)*1.5);
        for(let j = 0; j < a.length; j++){
            if(a.length == 1){
                string += " ";
            }
            string += padding + a[j]+" ";
        }
        string += "\n";
        height--;
    }
    return string;
}

function mapTreeNode(tree, height){
    const map = new Map();
    for(let i = height; i > 0; i--){
        map.set(i, []);
    }
    recTraverse(tree, map, height);
    for(let i = height; i > 0; i--){
        console.log(map.get(i));
    }
    return map;
}

function recTraverse(tree, map, height){
    if(tree.left === null && tree.right === null){
        map.get(height).push(tree.value);
        return;
    }

    if(tree.left !== null){
        recTraverse(tree.left, map, height-1);
    }
    if(tree.right !== null){
        recTraverse(tree.right, map, height-1);
    }

    map.get(height).push(tree.value);
}

function heightOfTree(tree){
    if(tree === null){
        return 0;
    }
    let left = heightOfTree(tree.left);
    let right = heightOfTree(tree.right);
    return Math.max(left,right)+1;
}