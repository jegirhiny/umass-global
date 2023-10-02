def two_list_dictionary(keys, values):
    map = {}
    keys_len = len(keys)
    values_len = len(values)

    if keys_len > values_len:
        for num in range(0, keys_len):
            if num >= values_len:
                map[keys[num]] = None
            else:
                map[keys[num]] = values[num]
    else:
        for num in range(0, keys_len):
            map[keys[num]] = values[num]

    return map


    """Given keys and values, make dictionary of those.
    
        >>> two_list_dictionary(['x', 'y', 'z'], [9, 8, 7])
        {'x': 9, 'y': 8, 'z': 7}
        
    If there are fewer values than keys, remaining keys should have value
    of None:
    
        >>> two_list_dictionary(['a', 'b', 'c', 'd'], [1, 2, 3])
        {'a': 1, 'b': 2, 'c': 3, 'd': None}
    
    If there are fewer keys, ignore remaining values:

        >>> two_list_dictionary(['a', 'b', 'c'], [1, 2, 3, 4])
        {'a': 1, 'b': 2, 'c': 3}
   """