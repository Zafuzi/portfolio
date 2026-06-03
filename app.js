import express from "express";
import path from "node:path";

const app = express();

// Define the static file path using path.join to ensure the absolute path is correct
app.use(express.static(path.join(import.meta.dirname, 'dist')));

app.listen(3001, function () {
	console.log('Your app is listening on port 3001');
});