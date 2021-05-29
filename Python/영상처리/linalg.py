import numpy as np

def dot_product(a, b):
    """Implement dot product between the two vectors: a and b.

    (optional): While you can solve this using for loops, we recommend
    that you look up `np.dot()` online and use that instead.

    Args:
        a: numpy array of shape (x, n)
        b: numpy array of shape (n, x)

    Returns:
        out: numpy array of shape (x, x) (scalar if x = 1)
    """
    out = None
    out = np.dot(a, b)
    return out

a = np.arange(3 * 2).reshape(3, 2)
b = np.arange(2 * 3).reshape(2, 3)
aDotB = dot_product(a, b)
print(aDotB)

print("The size is: ", aDotB.shape)


def complicated_matrix_function(M, a, b):
    """Implement (a * b) * (M * a.T).

    (optional): Use the `dot_product(a, b)` function you wrote above
    as a helper function.

    Args:
        M: numpy matrix of shape (x, n).
        a: numpy array of shape (1, n).
        b: numpy array of shape (n, 1).

    Returns:
        out: numpy matrix of shape (x, 1).
    """
    out = None
    res1 = dot_product(a, b) #1 1
    res2 = dot_product(M, a.T) #2 1
    out = dot_product(res2, res1) 
    return out

M_2 = np.array(range(4)).reshape((2, 2)) 
a_2 = np.array([[1, 1]]) 
b_2 = np.array([[10, 10]]).T 
print(M_2.shape)
print(a_2.shape)
print(b_2.shape)
print()

ans = complicated_matrix_function(M_2, a_2, b_2)
print(ans)
print()
print("The size is: ", ans.shape)

def svd(M):
    """Implement Singular Value Decomposition.

    (optional): Look up `np.linalg` library online for a list of
    helper functions that you might find useful.

    Args:
        M: numpy matrix of shape (m, n)

    Returns:
        u: numpy array of shape (m, m).
        s: numpy array of shape (k).
        v: numpy array of shape (n, n).
    """
    u = None
    s = None
    v = None
    ### YOUR CODE HERE
    pass
    ### END YOUR CODE

    return u, s, v


def get_singular_values(M, k):
    """Return top n singular values of matrix.

    (optional): Use the `svd(M)` function you wrote above
    as a helper function.

    Args:
        M: numpy matrix of shape (m, n).
        k: number of singular values to output.

    Returns:
        singular_values: array of shape (k)
    """
    singular_values = None
    ### YOUR CODE HERE
    pass
    ### END YOUR CODE
    return singular_values


def eigen_decomp(M):
    """Implement eigenvalue decomposition.
    
    (optional): You might find the `np.linalg.eig` function useful.

    Args:
        matrix: numpy matrix of shape (m, n)

    Returns:
        w: numpy array of shape (m, m) such that the column v[:,i] is the eigenvector corresponding to the eigenvalue w[i].
        v: Matrix where every column is an eigenvector.
    """
    w = None
    v = None

    # 대각화 분해
    # M = PㅅP^-1
    # P: M의 고유벡터들을 열벡터로 하는 행렬 v
    # ㅅ: M의 고유값들을 대각원소로하는 행렬 w
    w, v = np.linalg.eig(M)
    return w, v


def get_eigen_values_and_vectors(M, k):
    """Return top k eigenvalues and eigenvectors of matrix M. By top k
    here we mean the eigenvalues with the top ABSOLUTE values (lookup
    np.argsort for a hint on how to do so.)

    (optional): Use the `eigen_decomp(M)` function you wrote above
    as a helper function

    Args:
        M: numpy matrix of shape (m, m).
        k: number of eigen values and respective vectors to return.

    Returns:
        eigenvalues: list of length k containing the top k eigenvalues
        eigenvectors: list of length k containing the top k eigenvectors
            of shape (m,)
    """
    # 가장 큰 k개의 고유값과 고유벡터 출력 
    eigenvalues = []
    eigenvectors = []
    
    w, v = eigen_decomp(M) 
    idx = w.argsort() 
    sorted_w = w[idx] 

    i = len(w) - 1

    while k > 0:
        eigenvalues.append(sorted_w[i]) 
        eigenvectors.append(v.T[idx[i]])
        k -= 1
        i -= 1
        
    return eigenvalues, eigenvectors

M = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
val, vec = get_eigen_values_and_vectors(M[:, :3], 1)
print(val, vec)
print("First eigenvalue =", val[0])
print()
print("First eigenvector =", vec[0])
print()
assert len(vec) == 1 

val, vec = get_eigen_values_and_vectors(M[:, :3], 2)
print("Eigenvalues =", val)
print()
print("Eigenvectors =", vec)
print()
assert len(vec) == 2