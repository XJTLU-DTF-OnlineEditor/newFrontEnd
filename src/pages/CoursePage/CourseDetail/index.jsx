import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Footer } from 'antd/es/layout/layout';
import ProCard from '@ant-design/pro-card';
import { Button, Card, Select } from 'antd';
import { getAllTopic, getNewTopic, search } from '@/services/course/api';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { setLocale, getLocale, FormattedMessage } from 'umi';

let timeout;
let currentValue;
const { Meta } = Card;
const { Option } = Select;

function fetcha(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const topic_data = await search(value);
    if (currentValue === value && topic_data.length !== 0) {
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

export default class CoursePage extends Component {
  state = {
    data: [], // data of search
    value: undefined,
    hot_topic_list: [],
    new_topic_list: [],
  };

  componentDidMount() {
    // Get all topic data
    this.getData();
  }

  getData = async () => {
    // sort all the courses according to the hot degree
    const hot_topic_list = await getAllTopic();
    // Sort all the courses according to the date
    const new_topic_list = await getNewTopic();
    console.log(new_topic_list);
    this.setState({ hot_topic_list, new_topic_list });
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
    // console.log(value); // value: place holder text
    this.setState({ value });
    this.props.history.push(`/course/exercise/${value}`);
  };

  handleSearchClick = (value) => {
    console.log(value);
  };

  render() {
    let { hot_topic_list } = this.state;
    let { new_topic_list } = this.state;
    const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>); // Search options

    // console.log(hot_topic_list)

    return (
      <PageContainer
        header={{
          title: /*'所有课程'*/ <FormattedMessage id="pages.courseList.title" />,
          breadcrumb: {},
        }}
        extra={
          <div>
            <span>
              {/*Search course here:*/} <FormattedMessage id="pages.coursePage.search" />{' '}
              <SearchOutlined />
            </span>
            <Select
              showSearch
              showArrow={false}
              value={this.state.value}
              style={{ width: 150 }}
              placeholder=/*"input search text"*/ {
                <FormattedMessage id="pages.coursePage.des.search" />
              }
              defaultActiveFirstOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              filterOption={false}
              notFoundContent=/*"No such course"*/ {
                <FormattedMessage id="pages.coursePage.notFound" />
              }
            >
              {options}
            </Select>
          </div>
        }
      >
        <ProCard
          tabs={{
            type: 'card',
          }}
          extra={
            <Button type="text" onClick={() => this.props.history.push('/courses')}>
              {/*返回*/}
              <FormattedMessage id="pages.common.goBack" />
              <RightOutlined />
            </Button>
          }
        >
          <ProCard.TabPane key="tab1" tab=/*最热*/ {<FormattedMessage id="pages.coursePage.hot" />}>
            <ProCard style={{ marginTop: 8 }} gutter={[8, 16]} wrap>
              {hot_topic_list.map((item, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <ProCard
                    colSpan="33%"
                    layout="default"
                    bordered
                    hoverable
                    style={{ height: '100%' }}
                    onClick={() => this.props.history.push(`/course/exercise/${item.topic_title}`)}
                  >
                    <Card
                      bordered={false}
                      cover={<img alt={item.topic_title} src={item.topic_img} />}
                    >
                      <Meta title={item.topic_title} description={item.topic_content} />
                    </Card>
                  </ProCard>
                );
              })}
            </ProCard>
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab=/*最新*/ {<FormattedMessage id="pages.common.latest" />}>
            <ProCard style={{ marginTop: 8 }} gutter={[8, 16]} wrap>
              {new_topic_list.map((item, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <ProCard
                    colSpan="33%"
                    layout="default"
                    bordered
                    hoverable
                    style={{ height: '100%' }}
                    onClick={() => this.props.history.push(`/course/exercise/${item.topic_title}`)}
                  >
                    <Card
                      colSpan="33%"
                      bordered={false}
                      style={{ width: 240 }}
                      cover={<img alt={item.topic_title} src={item.topic_img} />}
                    >
                      <Meta title={item.topic_title} description={item.topic_content} />
                    </Card>
                  </ProCard>
                );
              })}
            </ProCard>
          </ProCard.TabPane>
        </ProCard>
        <ProCard />
      </PageContainer>
    );
  }
}
