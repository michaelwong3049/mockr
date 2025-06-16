import sys

import modal

import socketio


app = modal.App("example-get-started")


@app.function()
def f(i):
    if i % 2 == 0:
        print("hello", i)
    else:
        print("world", i, file=sys.stderr)

    return i * i

@app.local_entrypoint()
def main():
    print("i is: ", f.local(42))

