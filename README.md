**Integer Divide Algorithm**


**Algorithm**

•	We start with the 4-bit Quotient register set to 0.

•	Since the divisor must be moved one digit to the right in each algorithm iteration, we begin with the divisor in the left half of the 8-bit Divisor register and shift it one bit to the right at a time to align it with the dividend.

•	The Remainder register is set with the dividend value.

•	In Step 1, we subtract the divisor from the remainder register.

•	If the result is greater than or equal to 0, we generate a 1 in the quotient.

•	If the result is smaller than 0, we generate a 0 in the quotient.

•	In next step, the divisor is shifted to right and then we iterate again.

•	The number of iterations is usually n+1. In this case, it is 5 iterations.


**Signed Division**

Dividend = (Quotient * Divisor) + Remainder

Case1: If Dividend and Divisor are positive.

Then, Quotient = positive, Remainder = positive

Case2: If Dividend is negative and Divisor is positive.
Then, Quotient = negative, Remainder = negative

Case3: If Dividend is positive and Divisor is negative.
Then, Quotient = negative, Remainder = positive

Case4: If Dividend and Divisor both are negative.
Then, Quotient = positive, Remainder = negative


**JavaScript algorithm to Perform Iterations:**

The web App contains Two input columns for user to get the dividend value and divisor value.

The Calculate button calculates the result and starts the iterations.


**Constraints for Divisor and Dividend:**
 
•	Divisor and Dividend value cannot be empty.

•	Range of the Dividend and Divisor must be from -7 to 7.

•	The input tags are already limited to integer values.


