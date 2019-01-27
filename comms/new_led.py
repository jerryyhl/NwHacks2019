#from GPIOLibrary import GPIOProcessor
import time

#GP = GPIOProcessor()

def setup_pins():
    pin31 = GP.getPin31()
    pin31.out()

    pin32 = GP.getPin32()
    pin32.out()

    return {"clock": pin31, "data": pin32}


def get_bit_in_byte(byte_to_split, bit_to_get):
    byte_with_mask = byte_to_split & (1 << (7 - bit_to_get))
    bit_value = 0
    if byte_with_mask is not 0:
        bit_value = 1
    return bit_value


def convert_byte_to_array_of_bits(byte_to_convert):
    array_of_bits = []
    for i in range(8):
        array_of_bits.append(get_bit_in_byte(byte_to_convert, i))
    return array_of_bits

def convert_string_to_array_of_bits(string_to_convert):
    array_of_bits = []
    for letter in string_to_convert:
        array_of_bits.extend(convert_byte_to_array_of_bits(ord(letter)))
    return array_of_bits


'''
try:
    pins = setup_pins()

    while True:
        pins["clock"].high()
        print("high")
        time.sleep(1)
        pins["clock"].low()
        print("low")
        time.sleep(1)

finally:
    GP.cleanup()
'''



print(convert_string_to_array_of_bits('abcd'))