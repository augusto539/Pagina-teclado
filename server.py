#!/usr/bin/env python3
"""Servidor estático mínimo para desarrollo (sin Node/Vite).

Fija el directorio a servir de forma explícita para evitar depender del cwd,
que el sandbox del preview a veces no puede leer.
"""
import http.server
import os
import socketserver

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 5173

os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Sin caché: siempre ves el último cambio al recargar.
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


with socketserver.TCPServer(('127.0.0.1', PORT), Handler) as httpd:
    print(f'Sirviendo {ROOT} en http://127.0.0.1:{PORT}')
    httpd.serve_forever()
