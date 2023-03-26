import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import './index.less';

const IndexPage: React.FC = () => {
  
  const [articleContent, setArticleContent] = useState<string>('');

  const fetchArticleContent = () => {
    setArticleContent('这是一篇生成的示例文章');
  }

  return (
    <div className="app-root">
      <Form
        className="form"
        name="basic"
      >
        <Form.Item
          className="form-input"
          label="输入问题"
          name="question"
          rules={[{ required: true, message: '请输入有效的内容' }]}
        >
          <Input placeholder='请在此处输入您想查找的内容' />
        </Form.Item>

        <Form.Item
          className="form-submit"
        >
          <Button
            type="primary"
            onClick={fetchArticleContent}
          >
            查询
          </Button>
        </Form.Item>
      </Form>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: articleContent }}
      >
      </div>
    </div>
  );
}

export default IndexPage;
