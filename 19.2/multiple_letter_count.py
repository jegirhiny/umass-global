def multiple_letter_count(phrase):
    letter_count = {}

    for letter in phrase:
        if letter not in letter_count:
            letter_count[letter] = 1
        else:
            letter_count[letter] = letter_count[letter] + 1

    return letter_count

    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """