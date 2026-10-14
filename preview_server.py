"""Local preview only. Not a secure deployment/authentication backend.
Run: python preview_server.py
Launches an HTTP server on localhost so sessionStorage navigation works consistently.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import webbrowser

os.chdir(Path(__file__).resolve().parent)
server = ThreadingHTTPServer(('127.0.0.1', 0), SimpleHTTPRequestHandler)
url = f'http://127.0.0.1:{server.server_port}/login.html'
print('Evalio Talent Panel Documentation - lokal')
print('Buka:', url)
print('Tekan Ctrl+C untuk berhenti.')
webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
