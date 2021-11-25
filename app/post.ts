import path from 'path';
/* import fs from 'fs/promises'; */
const fs = require('fs').promises;
import parseFrontMatter from 'front-matter';
import { marked } from 'marked';

export type Post = {
	slug: string;
	title: string;
};

export const getPost = async (slug: string) => {
	const filepath = path.join(postsPath, `${slug}.md`);
	const file = await fs.readFile(filepath);
	const { attributes, body }: any = parseFrontMatter(file.toString());

	const html = marked(body);
	return { slug, html, title: attributes.title };
};

let postsPath = path.join(__dirname, '../../..', 'posts');

export const getPosts = async (): Promise<Post[]> => {
	const dir = await fs.readdir(postsPath);

	/* 	const posts: Post[] = [
		{
			slug: 'my-first-post',
			title: 'My First Post',
		},
		{
			slug: 'my-second-post',
			title: 'My second Post',
		},
	]; */

	return Promise.all(
		dir.map(async (filename) => {
			let file = await fs.readFile(path.join(postsPath, filename));

			let { attributes }: any = parseFrontMatter(file.toString());

			return {
				slug: filename.replace(/\.md$/, ''),
				title: attributes.title,
			};
		})
	);
};
