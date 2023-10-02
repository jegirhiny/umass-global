def capitalize(phrase):
    return phrase[0:1].upper() + phrase[1::]
    
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
print(capitalize('only first word'))