def countZeroes(arr):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == 1:
            left = mid + 1
        else:
            if mid == 0 or arr[mid - 1] == 1:
                return len(arr) - mid
            else:
                right = mid - 1
        
    return 0

def sortedFrequency(arr, num):
    left, right = 0, len(arr) - 1
    first_index, last_index = -1, -1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == num:
            first_index = mid
            right = mid - 1
        elif arr[mid] < num:
            left = mid + 1
        else:
            right = mid - 1

    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == num:
            last_index = mid
            left = mid + 1
        elif arr[mid] < num:
            left = mid + 1
        else:
            right = mid - 1

    if first_index == -1 or last_index == -1:
        return 0
    
    return last_index - first_index + 1

def findRotatedIndex(arr, num):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == num:
            return mid

        if arr[left] <= arr[mid]:
            if arr[left] <= num < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if arr[mid] < num <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

def findRotationCount(arr):
    left, right = 0, len(arr) - 1
    n = len(arr)

    while left <= right:
        if arr[left] <= arr[right]:
            return left

        mid = (left + right) // 2
        next_mid = (mid + 1) % n
        prev_mid = (mid - 1 + n) % n

        if arr[mid] <= arr[next_mid] and arr[mid] <= arr[prev_mid]:
            return mid

        if arr[mid] <= arr[right]:
            right = mid - 1
        elif arr[mid] >= arr[left]:
            left = mid + 1

    return -1

def findFloor(arr, num):
    left, right = 0, len(arr) - 1
    floor = -1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] <= num:
            floor = arr[mid]

        if arr[mid] < num:
            left = mid + 1
        else:
            right = mid - 1

    return floor