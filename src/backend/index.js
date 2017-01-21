import fs from "fs";
import Koa from "koa";
import path from "path";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

const readFile = async (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (error, data) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(data);
			}
		});
	});
};

const serve = async (ctx) => {
	let file = null;

	if ("/" === ctx.url) {
		file = "./public/index.html";
	} else {
		file = "./public" + ctx.url;
	}

	let contentType = null;
	const ext = path.extname(file);

	switch (ext) {
		case ".js":
			contentType = "application/javascript";
			break;
		case ".html":
			contentType = "text/html";
			break;
	}

	ctx.set("Content-type", contentType);
	ctx.body = await readFile(file);
};

router.get("/", serve);
router.get(/^\/js(?:\/|$)/, serve);

app.use(router.routes());

app.listen(3000);

console.log("App running at http://localhost:3000");
