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
};

interface Params extends ParsedUrlQuery {
    slug: string;
}

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    const pageTitle = `Pages | ${page.title}`;
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <h1>{page.title}</h1>
            <span>{page.location}</span>
            <hr />
            <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
    );
}

export const getStaticProps: GetStaticProps<{ page: PageData }, Params> = async ({ params }) => {
    const { slug } = params!;
    const fileContent = matter(fs.readFileSync(`./content/pages/${slug}.md`, 'utf8'));
    let frontmatter = fileContent.data;
    let markdown = fileContent.content;

    let pageData = {
        ...frontmatter,
        content: markdown,
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
