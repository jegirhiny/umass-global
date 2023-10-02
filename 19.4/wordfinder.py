"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    def __init__(self, path):
        self.file = open(path);
        self.words = self.file.read().split('\n')
        self.words_length = len(self.words)

    def random(self):
        print(self.words[int(random.random() * self.words_length - 1)])
