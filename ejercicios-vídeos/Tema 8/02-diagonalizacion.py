#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Sep  1 09:33:56 2019

@author: juangabriel
"""

import numpy as np
from numpy import linalg as LA

A = np.array([[2,-2,1], [2,-8,-2], [1,2,2]])

print(A)

w, v = LA.eig(A)

l1 = w[0]
v1 = v[:, 0]

print(np.dot(A, v1))
print(l1*v1)

np.dot(A, v1) == l1*v1

np.dot(A, v1) - l1*v1

np.isclose(np.dot(A, v1), l1*v1)