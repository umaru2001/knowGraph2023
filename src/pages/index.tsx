import React, { useState } from 'react';
import { Button, message, Form, Input } from 'antd';
import axios from 'axios';
import './index.less';

const TEST_URL = 'http://localhost:8000/api/test';

const IndexPage: React.FC = () => {
  const [articleContent, setArticleContent] = useState<string>('');

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
    fetchData<string>(TEST_URL).then((res) => {
      setArticleContent(res);
    })
  };

  return (
    <div className="app-root">
      <Form className="form" name="basic">
        <Form.Item
          className="form-input"
          label="输入问题"
          name="question"
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
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: articleContent }}
      ></div>
    </div>
  );
};

export default IndexPage;
