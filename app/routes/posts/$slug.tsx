import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getPost } from '~/post';

export const loader: LoaderFunction = async ({ params }) => {
	const slug: any = params.slug;

	return getPost(slug);
};

const PostSlug = () => {
	const post = useLoaderData();

	return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
};

export default PostSlug;
