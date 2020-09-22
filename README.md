# About

Simple coding test Solution
There is a robot which can move around on a grid. The robot is placed at point (0,0). From (x, y) the robot can move to (x+1,
y), (x-1, y), (x, y+1), and (x, y-1). Some points are dangerous and contain EMP Mines. To know which points are safe, we check
whether the sum digits of abs(x) plus the sum of the digits of abs(y) are less than or equal to 23. For example, the point (59,
75) is not safe because 5 + 9 + 7 + 5 = 26, which is greater than 23. The point (-51, -7) is safe because 5 + 1 + 7 = 13, which is
less than 23.
How large is the area that the robot can access?

##  Solution

### How to return an answer is not clear. so I return simply y.max, y.min, x.max and x.min

### Setup

- Simply use plain node.