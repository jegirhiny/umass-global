def flip_case(phrase, to_swap):
    result = ''

    for char in phrase:
        if char.lower() == to_swap.lower():
            # Flip the case of the character
            if char.isupper():
                result += char.lower()
            else:
                result += char.upper()
        else:
            result += char

    return result

    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
