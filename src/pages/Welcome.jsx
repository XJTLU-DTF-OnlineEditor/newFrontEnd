import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Carousel, Col, Row, Input, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import ProCard from '@ant-design/pro-card';
import { RightOutlined } from '@ant-design/icons';
import { getTopic } from '@/services/course/api';
import { Footer } from 'antd/es/layout/layout';

function handleButtonClick() {
  console.log('Button Click');
}

function handleCardClick() {
  console.log('Card Click...');
}

const onSearch = (value) => console.log(value);

const { Search } = Input;

export default class welcome extends Component {
  state = {
    topics: [], // Length = 5
  };

  componentDidMount() {
    // 初始化数据
    console.log('Did Mount');
    this.getData();
  }

  getData = async () => {
    const topic_data = await getTopic();
    const topics = topic_data.topics;
    console.log(topics);
    this.setState({ topics });
    console.log(this.state);
  };

  render() {
    let { topics } = this.state;
    console.log(topics[0]);

    const contentStyle = {
      height: '220px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#89a7f1',
    };

    const { Meta } = Card;

    return (
      <PageContainer
        header={{
          title: '主页',
          breadcrumb: {},
        }}
      >
        <Carousel autoplay dotPosition="bottom">
          <div>
            <h1 style={contentStyle}>
              <font face="Arial" size="8">
                欢迎来到Python的世界
              </font>
            </h1>
          </div>
          <div>
            <h3 style={contentStyle}>Description1</h3>
          </div>
        </Carousel>

        <ProCard
          title={
            <Button type="text" onClick={handleButtonClick}>
              所有课程
              <RightOutlined />
            </Button>
          }
          direction="column"
          gutter={[0, 8]}
          extra={
            <Search placeholder="input search text" onSearch={onSearch} enterButton="Search" />
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
