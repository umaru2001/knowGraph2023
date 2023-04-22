import React from 'react';
import { Form, Input, Button, message } from 'antd';
import LoginTitle from '../images/title.png';
import CryptoJS from 'crypto-js';
import './index.less';
import axios from 'axios';
import { LOGIN_URL } from '../url';

const md5 = (str: string) => {
  return CryptoJS.MD5(str).toString();
};

const Login: React.FC = () => {

  const [form] = Form.useForm();

  const fetchData = async <T,>(url: string, params: any): Promise<Awaited<T>> => {
    return axios.get(url, { params }).then((res) => {
      const { data, status } = res;
      if (status >= 400) {
        message.error('网络好像开小差了呢！');
      }
      return data;
    });
  };

  const requestLogin = () => {
    const username = form.getFieldValue('username');
    const password = md5(form.getFieldValue('password'));
    fetchData<boolean>(LOGIN_URL, { username, password }).then((r) => {
      if (r) {
        message.success('登录成功！');
      } else {
        message.success('账号或者密码错误！');
      }
    }, (e) => {
      message.success('账号或者密码错误！');
    })
  };

  return (
    <div className="login-root">
      <div className="login-wrapper">
        <img className="login-title" src={LoginTitle} />
        <div className="login-form-container">
          <Form className="login-form" name="login-form">
            <div className="login-form-label username">用户名</div>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="login-form-label username">密码</div>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                className="login-form-button"
                type="primary"
                htmlType="submit"
                onClick={requestLogin}
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
