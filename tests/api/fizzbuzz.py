import requests, sys

appUrl = sys.argv[1]

r = requests.get(url=f"{appUrl}api/fizzbuzz", params="size=10")
assert(r.text == '[1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz"]')