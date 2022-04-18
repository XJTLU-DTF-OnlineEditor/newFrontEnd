import React, {Component} from 'react';
import {Typography, message, Descriptions, Image, Button, Space, Tag} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {getExerciseList} from '@/services/course';
import ProCard from '@ant-design/pro-card';
import ProList from '@ant-design/pro-list';
import {CodeTwoTone} from '@ant-design/icons';
import './CourseOutline.less'
import {addUserCollection, changeCourseProgress} from "@/services/course/api";
import moment from "moment";

const {Title} = Typography;

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
    const {related_topic} = this.props.match.params;
    const res = await getExerciseList(related_topic);
    // console.log(res)
    if (res.error_code == 200) {
      let {course_list, topic_content, topic_img} = res;
      course_list = course_list.map((i) => {
        i.fields.id = i.pk;
        return i.fields;
      });
      this.setState({course_list, related_topic, topic_content, topic_img});
    } else {
      message.error(res.msg);
    }
    console.log(this.state.course_list);
  };

  render() {
    const topic = this.props.match.params.related_topic
    this.listData = [
      {
        href: this.props.location.pathname,
        title: this.props.match.params.related_topic,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: this.state.topic_content,
      },
    ];

    return (
      <PageContainer
        header={{
          title: <Title level={2}>{topic}</Title>,
          breadcrumb: {},
        }}
        content={
          <ProCard split="vertical" layout="center">
            <ProCard colSpan="28%">
              <Image src={'/media/' + this.state.topic_img} width={180}/>
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
              <Button onClick={ async () => {
                const msg = await addUserCollection({topic: topic,
                  collect_time: moment().format('YYYY-MM-DD HH:mm:ss')})
                console.log(msg)
                if (msg.error_code === 204) {
                  message.error("User collection already exists!")
                } else if (msg.error_code === 200) {
                  message.success("user collection add success")
                }
              }} key="add" type="primary">
                Add to Collection
              </Button>,
            ];
          }}
          rowKey="id"
          headerTitle="Course List"
          dataSource={this.state.course_list}
          showActions="hover"
          onRow={record => {
            return {
              onClick: async event => {
                console.log(record)
                const msg = await changeCourseProgress({topic: topic,
                course_id: record.subtopic_id,
                last_practice_time: moment().format('YYYY-MM-DD HH:mm:ss')})
                console.log(msg)
              }
            }
          }}
          showExtra="hover"
          metas={{
            title: {
              dataIndex: 'title',
              render: (title, item) => {
                return (
                  <>
                    <Typography.Text mark>[{item.subtopic_id}]</Typography.Text>
                    <a // href={this.props.location.pathname + '/' + item.id}
                       style={{textDecoration: 'none', color: 'black'}}
                    >{item.title}</a>
                    {/* </a> */}
                  </>
                );
              },
            },
            avatar: {
              render: () => <CodeTwoTone style={{fontSize: 'inherit'}}/>,
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
    );
  }
}
