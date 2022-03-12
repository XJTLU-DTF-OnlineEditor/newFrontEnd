import React, { Component } from 'react';
import { Typography, message, List, Descriptions, Image, Button, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getExerciseList } from '@/services/course';
import ProCard from '@ant-design/pro-card';
import ProList from '@ant-design/pro-list';
import { CodeTwoTone } from '@ant-design/icons';

export default class CourseOutline extends Component {
  state = {
    related_topic: '',
    course_list: [],
    views: '',
    topic_content: '',
    topic_img: '',
  };

  listData = [];

  componentDidMount() {
    // 获取目录 & 初始化课程内容
    this.getCatalog();
  }

  getCatalog = async () => {
    // 获取目录
    const { related_topic } = this.props.match.params;
    const res = await getExerciseList(related_topic);
    // console.log(res)
    if (res.error_code == 200) {
      let { course_list, topic_content, topic_img } = res;
      course_list = course_list.map((i) => {
        i.fields.id = i.pk;
        return i.fields;
      });
      this.setState({ course_list, related_topic, topic_content, topic_img });
    } else {
      message.error(res.msg);
    }
    console.log(this.state.course_list);
  };

  render() {
    this.listData = [
      {
        href: this.props.location.pathname,
        title: this.props.match.params.related_topic,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: this.state.topic_content,
      },
    ];

    return (
      <div>
        <PageContainer
          header={{
            title: this.props.match.params.related_topic,
            breadcrumb: {},
          }}
          content={
            <ProCard split="vertical" layout="center">
              <ProCard colSpan="28%">
                <Image src={'/media/' + this.state.topic_img} width={180} />
              </ProCard>
              <ProCard colSpan="60%">
                <Descriptions>
                  <Descriptions.Item
                    contentStyle={{
                      color: 'rgba(0, 0, 0, 0.45)',
                      fontSize: '16px',
                      lineHeight: 1.5715,
                    }}
                  >
                    {this.state.topic_content}
                  </Descriptions.Item>
                </Descriptions>
              </ProCard>
            </ProCard>
          }
        >
          <ProList
            toolBarRender={() => {
              return [
                <Button key="add" type="primary">
                  To Study
                </Button>,
              ];
            }}
            onRow={(item) => {
              return {
                onClick: () => {
                  this.props.history.push(this.props.location.pathname + '/' + item.id);
                },
              };
            }}
            rowKey="id"
            headerTitle="Course List"
            dataSource={this.state.course_list}
            showActions="hover"
            showExtra="hover"
            metas={{
              title: {
                dataIndex: 'title',
                render: (title, item) => {
                  return (
                    // <a
                    //   href={this.props.location.pathname + '/' + item.id}
                    //   style={{ textDecoration: 'none', color: 'black' }}
                    // >
                    <>
                      <Typography.Text mark>[{item.subtopic_id}]</Typography.Text>
                      {item.title}
                      {/* </a> */}
                    </>
                  );
                },
              },
              avatar: {
                render: () => <CodeTwoTone style={{ fontSize: 'inherit' }} />,
              },
              // actions: {
              //   render: (text, row) => [
              //     <a
              //       href={this.props.location.pathname + '/' + row.id}
              //       target="_blank"
              //       // style={{ textDecoration: 'none', color: 'black' }}
              //       key="study"
              //     >
              //       study
              //     </a>,
              //   ],
              // },
              subTitle: {
                dataIndex: 'labels',
                render: (_, row) => {
                  return (
                    <Space size={0}>
                      <Tag color="blue" key={row.id}>
                        in process
                      </Tag>
                      <Tag color="green" key={row.id}>
                        done
                      </Tag>
                      <Tag color="red" key={row.id}>
                        to do
                      </Tag>
                    </Space>
                  );
                },
                search: false,
              },
            }}
          />
        </PageContainer>
      </div>
    );
  }
}
