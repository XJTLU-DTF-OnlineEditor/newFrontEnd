import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Carousel, Col, Row, Input, Button, Select } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import ProCard from '@ant-design/pro-card';
import { RightOutlined } from '@ant-design/icons';
import { getTopic, search } from '@/services/course/api';
import { Footer } from 'antd/es/layout/layout';
import { logout } from '@/services/user/api';
import { Link } from '@umijs/preset-dumi/lib/theme';
import Banner from '@/pages/utils/animBanner';

const { Option } = Select;

let timeout;
let currentValue;

function fetcha(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const topic_data = await search(value);
    if (currentValue === value) {
      let topic_list = topic_data.topic_list;
      let data = [];
      if (topic_list === null) {
        data = [];
      } else {
        topic_list.forEach((r) => {
          data.push({
            value: r.topic_title,
            text: r.topic_title,
          });
        });
      }
      callback(data);
    }
  }
  timeout = setTimeout(fake, 300);
}

function handleCardClick() {
  console.log('Card Click...');
}

export default class welcome extends Component {
  state = {
    topics: [], // Length = 6
    data: [], // data of search
    value: undefined,
  };

  componentDidMount() {
    // 初始化数据
    //console.log('Did Mount');
    this.getData();
  }

  getData = async () => {
    const topics = await getTopic();
    console.log(topics);
    // const topics = topic_data.topics;
    // console.log(topics);
    this.setState({ topics });
    console.log(this.state);
  };

  handleSearch = (value) => {
    console.log(value); // value: Input text
    if (value) {
      fetcha(value, (data) => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = (value) => {
    console.log(value); // value: place holder text
    this.setState({ value });
  };

  render() {
    let { topics } = this.state;
    const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>);  // search options
    console.log(topics[0]);

    const contentStyle = {
      height: '220px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#89a7f1',
    };

    return (
      <PageContainer
        header={{
          title: '主页',
          breadcrumb: {},
        }}
      >
        <div>
          <Banner />
        </div>

        <ProCard
          title={
            <Button type="text" onClick={() => this.props.history.push('/courses')}>
              所有课程
              <RightOutlined />
            </Button>
          }
          direction="column"
          gutter={[0, 8]}
          extra={
            <div>
              <span>Search course here: </span>
              <Select
                showSearch
                showArrow={false}
                value={this.state.value}
                style={{ width: 150 }}
                placeholder="input search text"
                defaultActiveFirstOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                filterOption={false}
                notFoundContent="No such course"
              >
                {options}
              </Select>
            </div>
          }
        >
          {topics.map((item, index) => {
            return (
              <ProCard
                layout="center"
                bordered
                hoverable
                split="vertical"
                onClick={handleCardClick}
              >
                <ProCard colSpan="30%" ghost>
                  <center>
                    <font face="verdana">
                      {item.topic_title}
                      <RightOutlined />
                    </font>
                  </center>
                </ProCard>
                <ProCard>
                  <div>
                    <center>{item.topic_content}</center>
                  </div>
                </ProCard>
              </ProCard>
            );
          })}
        </ProCard>
        <Footer style={{ textAlign: 'center' }}>XJTLU ©2022 Online Editor</Footer>
      </PageContainer>
    );
  }
}
