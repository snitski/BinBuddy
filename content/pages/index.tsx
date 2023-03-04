import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type Page = {
    title: string;
    location: string;
    content: string;
    slug: string;
};

export default function Home({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={styles['container']}>
            <Head>
                <title>Pages</title>
            </Head>
            <h1 className={styles['header']}>Welcome to our pages</h1>
            <ul className={styles['page-list']}>
                {pages.map((page) => (
                    <li key={page.slug}>
                        <Link href={`/pages/${page.slug}`}>
                            {page.location}:{page.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<{ pages: Page[] }> = async () => {
    // List of files in blgos folder
    const filesInPages = fs.readdirSync('./content/pages');

    // Get the front matter and slug (the filename without .md) of all files
    const pages = filesInPages.map((filename) => {
        const file = fs.readFileSync(`./content/pages/${filename}`, 'utf8');
        const matterData = matter(file);

        return {
            ...matterData.data, // matterData.data contains front matter
            slug: filename.slice(0, filename.indexOf('.')),
        };
    }) as Page[];

    return {
        props: {
            pages,
        },
    };
};
