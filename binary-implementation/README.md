# BINARY NUMBER IMPLEMENTATION

`getBinary` is the main function which accepts integer and returns binary representation of that number as string. The supported binary representation considers atmost 16bits of binary can be accepted as integer and it will return correct binary string. This means for values -2^15 - 2^15 - 1 will return its correct string binary string.

Following is the high level logic:

- It will find binary representation of absolute value of integer into string by using the logic of dividing the number by 2 until it becomes zero and using the remainder of that division as bits of binary representation.
- If the integer was positive, this is the answer and it will be returned.
- If the integer was negative, then we find 2's complement of that binary representation which is flip the binary values and then add 1 binary value to that binary value.
- `invertBinary` number does the flipping by checking the bit value and then adding its opposite binary value i.e if 0 then 1 or if 1 then 0 in the result string. If string's length is less than 16 then it appends remaining bits to 1 since the first bit of negative binary number should be 1.
- `addBinaryOne` adds 1 to the binary string passed to it. This functions handles this logic by adding 1 to last bit and checking if carry is possible and then adding carry value to the more significant bit until there is no carry value.
