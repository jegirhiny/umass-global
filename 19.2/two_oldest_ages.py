def two_oldest_ages(ages):
    ages.sort(reverse=True)
    oldest = None
    second_oldest = None

    for age in ages:
        if oldest == None:
            oldest = age
        elif age != oldest:
            second_oldest = age
            break

    return (second_oldest, oldest)

    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """