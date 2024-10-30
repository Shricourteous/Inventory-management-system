// import http from 'http';
// import { booksAPI } from './dummy.js';

// // mongodb+srv://admin:root@cluster0.ry3ik.mongodb.net/booksdb?retryWrites=true&w=majority

// // MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// // Define the port
// const PORT = 8000;

// // Create the server
// const server = http.createServer((req, res) => {
//   // Set the response header
//   res.setHeader('Content-Type', 'application/json');

//   // Handle different routes
//   if (req.url === '/') {
//     res.writeHead(200);
//     res.end(JSON.stringify({ books: booksAPI }));
//   } else if (req.url === '/api/data') {
//     res.writeHead(200);
//     res.end(JSON.stringify({ data: 'This is some datas.' }));
//   } else {
//     res.writeHead(404);
//     res.end(JSON.stringify({ error: 'Not Found' }));
//   }
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
