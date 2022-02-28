import React, { Component } from 'react';
import { Typography, Button, message, List, Descriptions  } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getExerciseList } from '@/services/course';
import ProCard from '@ant-design/pro-card';

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
    if(res.error_code==200){
      let { course_list, topic_content, topic_img } = res
      course_list = course_list.map(i=>i.fields)
      this.setState({ course_list, related_topic, topic_content, topic_img });
      console.log(course_list)
    }else{
      message.error(res.msg)
    }
    
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
            <ProCard split="vertical">
              <ProCard title="【image】" colSpan="20%">
                {/* <img href={this.state.topic_img.thumbUrl} alt={this.state.topic_img.name} /> */}
              </ProCard>
              <ProCard>
                <ProCard>
                  {/* <div style={{ height: 160 }}> */}
                  <Descriptions>
                    <Descriptions.Item
                      style={{ width: '50%' }}
                      contentStyle={{
                        color: 'rgba(0, 0, 0, 0.45)',
                        fontSize: '14px',
                        lineHeight: 1.5715,
                      }}
                    >
                      {this.state.topic_content}
                    </Descriptions.Item>
                  </Descriptions>
                </ProCard>
                <ProCard>
                  <Button key="1" type="primary">
                    BEGIN STUDY
                  </Button>
                  {/* </div> */}
                </ProCard>
              </ProCard>
            </ProCard>
          }
        >
          <List
            bordered
            dataSource={this.state.course_list}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  this.props.history.push(this.props.location.pathname + '/' + item.subtopic_id);
                }}
              >
                <a
                  href={this.props.location.pathname + '/' + item.subtopic_id}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Typography.Text mark>[EXERCISE]</Typography.Text> {item.title}
                </a>
              </List.Item>
            )}
          />
        </PageContainer>
      </div>
    );
  }
}
