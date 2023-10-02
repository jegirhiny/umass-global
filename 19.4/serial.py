"""Python serial number generator."""

class SerialGenerator:
    def __init__(self, start = 100):
    self.serial_number = start
    self.start = start

    def generate(self):
        self.serial_number += 1
        return self.serial_number - 1
    
    def reset(self):
        self.serial_number = self.start

    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """