import React, { useState } from 'react';
import { Button, message, Form, Input, Pagination, Tooltip } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';
import bot from '../images/bot.png';
import user from '../images/user.png';
import { RESEARCH_URL } from '../url';

function getCurrentTime(): string {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  return `${hour}:${minute}:${second}`;
}

const Question: React.FC = () => {
  const [chats, setChats] = useState<[string, string, string][]>([]);
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

  const handleQuestion = () => {
    const keyword = form.getFieldValue('keyword');
    if (keyword === '') {
      message.error('请输入内容！');
      return;
    }
    setChats([
      ...chats,
      ['User', getCurrentTime(), keyword],
      ['Robot', getCurrentTime(), '抱歉，此问题我暂时还无法回答喵！'],
    ]);
  };

  const renderAChat = (chat: [string, string, string], key: string) => {
    const [username, time, content] = chat;
    const imgSrc = username === "Robot" ? bot : user;
    return (
      <div key={key} className="chat-wrapper">
        <img src={imgSrc} className="portrait" />
        <div className={`chat-text ${username === 'Robot' ? "bot" : ""}`}>
          <div className="username">{`${username} ${time}`}</div>
          <div className="content">{content}</div>
        </div>
      </div>
    );
  };

  // const fetchArticleContent = () => {
  //   const keyword = form.getFieldValue('keyword');
  //   fetchData<Article[]>(`${RESEARCH_URL}${keyword}`).then((res) => {
  //     setChats(res);
  //   });
  // };

  // const paginationChange = (page: number) => {
  //   setPage(page);
  // };

  return (
    <div className="question-root">
      <div className="chats">
        {chats.map((chat, index) => renderAChat(chat, `${index}acv`))}
      </div>
      <Form className="form" form={form} name="basic">
        <Form.Item className="form-input" name="keyword">
          <Input className="input" />
        </Form.Item>
        <Form.Item className="form-submit">
          <Tooltip title="点我询问答案哦~">
            <Button
              type="primary"
              shape="circle"
              onClick={handleQuestion}
              icon={<SearchOutlined />}
            />
          </Tooltip>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Question;
