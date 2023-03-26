import React, { useState } from 'react';
import { Button, message, Form, Input, Pagination } from 'antd';
import axios from 'axios';
import { Article } from './type';
import './index.less';

const TEST_URL = 'http://localhost:8000/api/test';

const RESEARCH_URL = 'http://localhost:8000/api/chairman/search/';

const IndexPage: React.FC = () => {
  const [article, setArticle] = useState<Article[] | null>();
  const [page, setPage] = useState<number>(1);
  const [form] = Form.useForm();

  const fetchData = async <T,>(url: string): Promise<Awaited<T>> => {
    return axios.get(url).then((res) => {
      const { data, status } = res;
      if (status >= 400) {
        message.error('网络好像开小差了呢！');
      } else {
        message.success('请求成功！');
      }
      return data;
    });
  };

  const fetchArticleContent = () => {
    const keyword = form.getFieldValue('keyword');
    fetchData<Article[]>(`${RESEARCH_URL}${keyword}`).then((res) => {
      setArticle(res);
    });
  };

  const paginationChange = (page: number) => {
    setPage(page);
  }

  return (
    <div className="app-root">
      <Form className="form" form={form} name="basic">
        <Form.Item
          className="form-input"
          label="输入关键词"
          name="keyword"
          rules={[{ required: true, message: '请输入有效的内容' }]}
        >
          <Input placeholder="请在此处输入您想查找的内容" />
        </Form.Item>

        <Form.Item className="form-submit">
          <Button type="primary" onClick={fetchArticleContent}>
            查询
          </Button>
        </Form.Item>
      </Form>
      {article ? (
        <>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={1}
            total={article?.length}
            onChange={paginationChange}
          />
          <h1>{article[page-1]?.title}</h1>
          <div className="article-info">
            <p className="article-date">
              发表时间：{article[page-1]?.time || '-'}
            </p>
            <p className="article-source">
              文章来源：{article[page-1]?.origin || '-'}
            </p>
          </div>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article[page-1]?.content! }}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default IndexPage;
