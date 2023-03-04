import fs from 'fs';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

type PageData = {
    title: string;
    location: string;
    content: string;
    imagePath: string | null;
};

interface Params extends ParsedUrlQuery {
    slug: string;
}

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    const pageTitle = `Pages | ${page.title}`;
    return (
        <div className='prose prose-olive p-4 prose-h1:mb-2 prose-h4:mt-0 prose-hr:mb-4 bg-olive-400 font-bold'>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <h1>{page.title}</h1>
            <h4>in {page.location}</h4>
            <hr />
            {page.imagePath && <img src={page.imagePath} alt={page.title} />}
            <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
    );
}

export const getStaticProps: GetStaticProps<{ page: PageData }, Params> = async ({ params }) => {
    const { slug } = params!;
    const fileContent = matter(fs.readFileSync(`./content/pages/${slug}.md`, 'utf8'));
    let frontmatter = fileContent.data;
    let markdown = fileContent.content;

    // Check if the page has an image
    let imagePath: string | null = `./public/images/${slug}.jpg`;
    if (!fs.existsSync(imagePath)) {
        imagePath = null;
    } else {
        imagePath = `/images/${slug}.jpg`;
    }

    let pageData = {
        ...frontmatter,
        content: markdown,
        imagePath,
    } as PageData;

    return {
        props: { page: pageData },
    };
};

export async function getStaticPaths() {
    const filesInProjects = fs.readdirSync('./content/pages');

    const paths = filesInProjects.map((file) => {
        const filename = file.slice(0, file.indexOf('.'));
        return { params: { slug: filename } };
    });

    return {
        paths,
        fallback: false, // This shows a 404 page if the page is not found
    };
}
