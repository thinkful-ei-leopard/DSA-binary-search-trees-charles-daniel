class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        if(this.key === null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if(this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    
    remove (key) {
        if(this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if(this == this.parent.left){
                this.parent.left = node;
            }
            else if (this == this.parent.right){
                this.parent.right =node;
            }
            if (node) {
                node.parent = this.this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        } 
    }
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function main () {
    let BST = new BinarySearchTree();
    BST.insert(4, 4);
    // BST.insert(2, 2);
    BST.insert(1, 1);
    BST.insert(3, 3);
    BST.insert(6, 6);
    BST.insert(9, 9);
    BST.insert(5, 5);
    BST.insert(7, 7);

    let EZBST = new BinarySearchTree();
    EZBST.insert('E');
    EZBST.insert('A');
    EZBST.insert('S');
    EZBST.insert('Y');
    EZBST.insert('Q');
    EZBST.insert('U');
    EZBST.insert('E');
    EZBST.insert('S');
    EZBST.insert('T');
    EZBST.insert('I');
    EZBST.insert('O');
    EZBST.insert('N');
    //console.log(tree(BST))
    // console.log(height(BST))
    // console.log(isBinary(BST))
    console.log(smallest(BST))
    console.log(isBalanced(BST))
    return BST;
}

main()


//What does this do?
// It gives the aggregate of the entire tree. O(3n)

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

function height(t) {
    if (t.key == null) {
        return 0;
    }
    else {
        if (t.left && t.right) {
            if (height(t.right) > height(t.left)) {
                return 1 + height(t.right);
            }
            return 1 + height(t.left);  
        }
        else if (t.left) {
            return 1 + height(t.left);
        }
        else if (t.right) {
            return 1 + height(t.right);
        }
    }
    return 1
} 

function isBinary(tree) {
    if(tree.key == null) {
        return;
    }
    else if(tree.right && tree.left) {
        if(tree.right.key > tree.key) {
            return isBinary(tree.right);
        }
        else if(tree.left.key < tree.key) {
            return isBinary(tree.left);
        }
        else {
            return false;
        }
    }
    else if(tree.left){
        if(tree.left.key < tree.key){
            return isBinary(tree.left)
        }
        else {
            return false;
        }
    }
    
    else if(tree.right) {
        if(tree.right.key > tree.key) {
            return isBinary(tree.right);
        }
        else {
            return false;
        }
    }
    return true;
}

function thirdLargest(tree) {
    if (!tree.right) {
        if (tree.left) {
            if(tree.left.left && tree.left.right) {
                if(tree.left.right.left == null && tree.left.right.right == null) {
                    return tree.left;
                }
                else if (tree.left.right.right) {
                    return tree.left.right
                }
            }
        }
        else if (!tree.left && !tree.parent.left) {
            return tree.parent.parent;
        }
    }
    return thirdNum
}

function smallest(tree) {
    if (tree.key === null) {
        return 0
    }
    else if (tree.left && tree.right) {
        if (smallest(tree.left) < smallest(tree.right)) {
            return 1 + smallest(tree.left);
        }
        return 1 + smallest(tree.right);
    }
    return 1
}

function isBalanced (tree) {
    let small = smallest(tree);
    let h = height(tree);
    
    if (h - small <= 1) {
        return true;
    }
    return false;
}

function sameBST(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    else if (arr1[0] !== arr2[0]) {
        return false;
    }
    else if (arr1[0] === arr2[0]) {
        if(arr1[1] < arr1[0]) {
            for (let i = 1; i <arr2.length; i++) {
                if (arr2[i] < arr2[0] && arr2[i] !== arr1[1]) {
                    return false;
                }
                arr2.slice
            }
        }
    }
    return true;
}