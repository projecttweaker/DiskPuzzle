/**
Tower of Hanoi

References:
https://en.wikipedia.org/wiki/Tower_of_Hanoi#Recursive_implementation

Workings:
https://www.javatpoint.com/daa-tower-of-hanoi

Rules of game:
1. Only one disk is moved at a time.
2. Only smaller disk is placed on bigger disk.

For 3 disks:
Let T(N) be the total time taken to move N disks from peg A to peg C.
1. move N-1 disk from the first peg to the second peg. This can be done in T(N-1) step.
2. move bigger disk from the first peg to the third peg will need the first step.
3. recursively move N-1 disk from the second peg to the third peg will need T(N-1) step again.

Hence, total time taken,

T(N) = T(N-1) + 1 + T(N-1)
     = 2 T(N-1) + 1 ---------------------- equation 1

Let N = N-1, equation 1 becomes,
T(N-1) = 2 T(N-1-1) + 1
       = 2 T(N-2) + 1 -------------------- equation 2

Substitute eq 2 into eq 1
T(N) = 2 (2 T(N-2) + 1) + 1
     = 2^2 (T(N-2) + 2) + 1 -------------- equation 3

Let N = N-2, equation 1 becomes,
T(N-2) = 2 T(N-2-1) + 1
       = 2 T(N-3) + 1 -------------------- equation 4

Substitute eq 4 into eq 3
T(N) = 2^2 (T(N-2) + 2) + 1
     = 2^2 (2 T(N-3) + 1) + 2 + 1
     = 2^3 T(N-3) + 2^2 + 2 + 1 ---------- equation 5

So, eq 5 can be rewritten as
T(N) = 2^x T(N-x) + ... + 2^2 + 2^1 + 2^0

where x = N-1,
T(N) = 2^N-1 T(N-N-1) + 2^N-2 + ... + 2^2 + 2 + 1 (reverse this)

Using the formula for the sum of a geometric series, we have
1 + 2 + 2^2 + ... + 2^N-1 = 2^N-1

Hence, the minimum number of moves required
is 2^N-1
*/

var countMoves = 0;

// recursive algorithm
function move(n, from, to, spare, // Arrays
                 fromN, toN, spareN) {
	// pre-condition check
	if (n > 0) {
		countMoves++;

		// workings:
		// Move n - 1 disks from source to spare, so they are out of the way
		move(n - 1, from, spare, to,
                    fromN, spareN, toN);

		// Move the nth disk from source to target
		// - pop, remove disk from source peg
		// - push, add disk into the target peg
		to.push(from.pop());

		// show progress
		console.log("\nMove disk", n, "from", fromN, "to", toN);
		console.log("A:", A, "B:", B, "C:", C);

		// Move the n - 1 disks that we left on spare onto target
		// - spare becomes source
		// - to becomes target
		// - from becomes spare
		move(n - 1, spare, to, from,
                    spareN, toN, fromN);

		// (2^N)-1
		if (countMoves == Math.pow(2,n)-1)
			console.log("\nEnded in", countMoves, "moves...");
	}
}

// main
var numDisks = 4;

// dynamic disks setting
function setDisks(n) {
	var arr = [];
	for (var i = n; i > 0; i--) {
		arr.push(i);
	}
	return arr;
}

// parallel
var A = setDisks(numDisks); // eg. [4,3,2,1] for 4 disks
var nA = "A";

var B = [];
var nB = "B";

var C = [];
var nC = "C";

console.log("Tower of Hanoi for", numDisks, "disks");
console.log("A:", A, "B:", B, "C:", C);

move(numDisks, A, C, B, // A, B, C are peg names, where B is a spare peg
			   nA, nC, nB); // for peg labelling


/*
Results:

Tower of Hanoi for 4 disks
A: [4,3,2,1] B: [] C: []

Move disk 1 from A to B
A: [4,3,2] B: [1] C: []

Move disk 2 from A to C
A: [4,3] B: [1] C: [2]

Move disk 1 from B to C
A: [4,3] B: [] C: [2,1]

Move disk 3 from A to B
A: [4] B: [3] C: [2,1]

Move disk 1 from C to A
A: [4,1] B: [3] C: [2]

Move disk 2 from C to B
A: [4,1] B: [3,2] C: []

Move disk 1 from A to B
A: [4] B: [3,2,1] C: []

Move disk 4 from A to C
A: [] B: [3,2,1] C: [4]

Move disk 1 from B to C
A: [] B: [3,2] C: [4,1]

Move disk 2 from B to A
A: [2] B: [3] C: [4,1]

Move disk 1 from C to A
A: [2,1] B: [3] C: [4]

Move disk 3 from B to C
A: [2,1] B: [] C: [4,3]

Move disk 1 from A to B
A: [2] B: [1] C: [4,3]

Move disk 2 from A to C
A: [] B: [1] C: [4,3,2]

Move disk 1 from B to C
A: [] B: [] C: [4,3,2,1]

Ended in 15 moves...
*/
