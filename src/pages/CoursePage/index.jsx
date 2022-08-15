import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Select } from 'antd';
import ProCard from '@ant-design/pro-card';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { getTopic, search } from '@/services/course/api';
import { Footer } from 'antd/es/layout/layout';
import Banner from '@/pages/utils/coursePage/animBanner';
import './coursePage.less';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import Meta from 'antd/lib/card/Meta';

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
    } else if (topic_data.length === 0) {
    }
  }
  timeout = setTimeout(fake, 300);
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
    console.log(topics);
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
    // console.log(value); // value: place holder text
    this.setState({ value });
    this.props.history.push(`/course/exercise/${value}`);
  };

  render() {
    let { topics } = this.state;
    const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>); // search options
    // console.log(topics[0]);

    return (
      <PageContainer
        header={{ title: /*'课程'*/ <FormattedMessage id="pages.coursePage.title" /> }}
      >
        <div>
          <Banner />
        </div>

        <ProCard
          title={
            <Button type="text" onClick={() => this.props.history.push('/courses/allCourses')}>
              {/*'所有课程'*/} <FormattedMessage id="pages.courseList.title" />
              <RightOutlined />
            </Button>
          }
          gutter={[0, 8]}
          extra={
            <div>
              <span>
                {/*Search course here:*/} <FormattedMessage id="pages.coursePage.search" />
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
          {topics.map((item, index) => {
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
                <Card bordered={false} cover={<img alt={item.topic_title} src={item.topic_img} />}>
                  <Meta title={item.topic_title} description={item.topic_content} />
                </Card>
              </ProCard>
            );
          })}
        </ProCard>
      </PageContainer>
    );
  }
}
