from zlib import crc32

def str_to_number(s: str):
    return float(crc32(s.encode("utf-8")) & 0xffffffff) / 2**32