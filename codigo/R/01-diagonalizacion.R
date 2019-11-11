# Ejemplo de diagonalización de una matriz cuadrada

A = rbind(c(2,-2,1), c(2,-8,-2), c(1,2,2))
isSymmetric(A)
eigen(A) -> eig 

eig$values
l1 = eig$values[1]

eig$vectors
v1 = eig$vectors[, 1]

A%*%v1
l1*v1

A%*%v1 == l1*v1
A%*%v1 - l1*v1

library(dplyr)
near(A%*%v1, l1*v1)

solve(eig$vectors)%*%A%*%eig$vectors
