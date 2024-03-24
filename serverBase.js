const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`Server basico en puerto ${PORT} con modulos http de node...!!!`);
});

server.listen(PORT, () => {
  console.log(`Server online en puerto${PORT}`);
});
