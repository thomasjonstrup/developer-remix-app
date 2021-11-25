import { Link, useLoaderData } from 'remix';
import { Post, getPosts } from '~/post';

export let loader = () => {
	return getPosts();
};

export default function Posts() {
	const posts = useLoaderData<Post[]>();
	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map((post: Post) => (
					<li key={post.slug}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
