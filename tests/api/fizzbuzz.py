import requests, sys

appUrl = sys.argv[1]

actual = requests.get(url=f"{appUrl}api/fizzbuzz", params="size=10").text
expected = '[1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz"]'
assert(actual == expected)
