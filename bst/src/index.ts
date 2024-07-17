//console.log('BST tasks')

type BSTNode = {
    data: number;
    left: BSTNode | null;
    right: BSTNode | null;
}

class BSTree {
    root: BSTNode | null;
    constructor() {
        this.root = null;
    }
    findNode(data: number, node: BSTNode | null = this.root): BSTNode | null {
        //tree is empty
        if (node === null) {
            return null;
        }
        //tree has nodes
        if (node.data === data) {
            return node;
        } else {
            return (node.data < data) ? this.findNode(data, node.left) : this.findNode(data, node.right);
        }

    }
    insertNode(newNode: BSTNode, parentNode: BSTNode | null): void {
        if (parentNode === null) {
            this.root = newNode;
            return;
        }
        if (parentNode.data < newNode.data) {
            if (parentNode.right) {
                this.insertNode(newNode, parentNode.right);
            } else {
                parentNode.right = newNode;
                return;
            }
        } else {
            if (parentNode.left) {
                this.insertNode(newNode, parentNode.left);
            } else {
                parentNode.left = newNode;
                return;
            }
        }

    }
    traverse(node: BSTNode | null = this.root): number[] {
        if (node === null) {
            return [];
        }
        return [...this.traverse(node.left), node.data, ...this.traverse(node.right)];
    }
    createTree(numbers: number[], firstIndex: number, lastIndex: number): void {
        //console.log(`f-${firstIndex}, l-${lastIndex}`)
        if (firstIndex >= 0 && lastIndex < numbers.length) {
            let midIndex = firstIndex + Math.floor((lastIndex - firstIndex) / 2);
            //console.log(midIndex)
            let newNode: BSTNode = { data: numbers[midIndex], left: null, right: null };
            this.insertNode(newNode, this.root);
            if (midIndex > firstIndex) {
                this.createTree(numbers, firstIndex, midIndex - 1);
            }
            if (midIndex < lastIndex) {
                //console.log(`m-${midIndex}, l-${lastIndex}`)
                this.createTree(numbers, midIndex + 1, lastIndex);
            }
        }
    }
    size(): number {
        let nodeQueue: Array<BSTNode | null> = [this.root];
        let size: number = 0;

        while (nodeQueue.length) {
            let currentNode = nodeQueue.shift();
            if (currentNode) {
                ++size;
                nodeQueue.push(currentNode.left);
                nodeQueue.push(currentNode.right);
            }
        }
        return size;

    }
}



//************************************************************************** */
let inputValue: number[] = [1, 2, 3, 4, 5, 23, 7, 16];
let testTree = new BSTree();
testTree.createTree(inputValue, 0, inputValue.length - 1);
console.log(testTree);
console.log(testTree.traverse());
console.log(testTree.size());

