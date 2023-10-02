def titleize(phrase):
    words = (phrase.lower()).split(' ');

    for num in range(len(words)):
        word = words[num]

        words[num] = word[0].upper() + word[1:]

    return ' '.join(words)

    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """