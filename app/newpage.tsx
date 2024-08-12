import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

interface NewsDetailProps {
  newsItem: {
    id: number;
    title: string;
    content: string;
  };
}

const NewsDetail: React.FC<NewsDetailProps> = ({ newsItem }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const news = [
    { id: 1, title: 'News 1', content: 'Content of news 1' },
    { id: 2, title: 'News 2', content: 'Content of news 2' },
    { id: 3, title: 'News 3', content: 'Content of news 3' },
  ];

  const paths = news.map(item => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const news = [
    { id: 1, title: 'News 1', content: 'Content of news 1' },
    { id: 2, title: 'News 2', content: 'Content of news 2' },
    { id: 3, title: 'News 3', content: 'Content of news 3' },
  ];

  const newsItem = news.find(item => item.id === Number(params?.id));

  return {
    props: {
      newsItem: newsItem || null,
    },
  };
};

export default NewsDetail;
