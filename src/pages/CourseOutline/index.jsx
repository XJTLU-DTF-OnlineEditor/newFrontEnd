import React, { Component } from 'react';
import {
  Typography,
  message,
  Descriptions,
  Image,
  Button,
  Space,
  Tag,
  Progress,
  Empty,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getExerciseList } from '@/services/course';
import ProCard from '@ant-design/pro-card';
import { CodeTwoTone } from '@ant-design/icons';
import './CourseOutline.less';
import { addUserCollection, changeCourseProgress } from '@/services/course/api';
import moment from 'moment';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { currentUser } from '@/services/user/api';
import { PageHeader, Menu, Dropdown, Row } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Paragraph } = Typography;

const gridStyle = {
  width: '30%',
  margin: '12px',
  textAlign: 'center',
};

const { Title } = Typography;

export default class CourseOutline extends Component {
  state = {
    related_topic: '',
    course_list: [],
    views: '',
    topic_content: '',
    topic_description: '',
    topic_img: '',
    progress: '',
  };

  listData = [];

  componentDidMount() {
    // 获取目录 & 初始化课程内容
    this.getCatalog();
    this.getProgressInfo();
  }

  getCatalog = async () => {
    // 获取目录
    const { related_topic } = this.props.match.params;
    const res = await getExerciseList(related_topic);
    if (res.error_code == 200) {
      let { course_list, topic_content, topic_img, topic_description } = res;
      course_list = course_list.map((i) => {
        i.fields.id = i.pk;
        return i.fields;
      });
      this.setState({ course_list, related_topic, topic_content, topic_img, topic_description });
    } else if (res.error_code == 204) {
      let { topic_content, topic_img, topic_description } = res;
      this.setState({
        related_topic,
        topic_content,
        topic_img,
        topic_description,
        course_list: null,
      });
    } else {
      message.error(res.msg);
    }
  };

  getProgressInfo = async () => {
    const { related_topic } = this.props.match.params;
    const res = await currentUser();
    console.log(res, 777777777777777);
    if (res.error_code == 200) {
      let progress = res.data.history;
      progress?.map((element) => {
        if (element.topic == related_topic) {
          this.setState({ progress: element });
        }
      });
    }
  };

  render() {
    const topic = this.props.match.params.related_topic;
    this.listData = [
      {
        href: this.props.location.pathname,
        title: this.props.match.params.related_topic,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: this.state.topic_content,
      },
    ];

    const { course_list, progress, topic_description } = this.state;

    return (
      <>
        <PageHeader
          title={<Title level={2}> {topic}</Title>}
          className="site-page-header"
          tags={<Tag color="blue">python</Tag>}
          subTitle={topic_description}
          onBack={() => this.props.history.go(-1)}
          extra={[
            <Button
              onClick={async () => {
                const msg = await addUserCollection({
                  topic: topic,
                  collect_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
                console.log(msg);
                if (msg.error_code === 204) {
                  message.error('User collection already exists!');
                } else if (msg.error_code === 200) {
                  message.success('user collection add success');
                }
              }}
              key="add"
              type="primary" /*style={{ margin: "37px 58px 0 0", float: 'right' }}*/
            >
              {/*Add to Collection*/} <FormattedMessage id="pages.courseOutline.collection" />
            </Button>,
          ]}
        >
          <Row>
            <Space size={50} style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 2, paddingLeft: '30px' }}>
                <Paragraph>{this.state.topic_content}</Paragraph>
              </div>
              &nbsp;
              <div className="image" style={{ flex: 2, paddingRight: '100px' }}>
                <Image src={'/media/' + this.state.topic_img} width={200} />
              </div>
            </Space>
          </Row>
        </PageHeader>
        <Layout>
          <Content>
            <ProCard ghost wrap gutter={{ xs: 8, sm: 16, md: 24 }} style={{ margin: '12px ' }}>
              {course_list ? (
                course_list?.map((item, index) => {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <ProCard
                      hoverable
                      bordered
                      colSpan={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }}
                      // layout="center"
                      // href={this.props.location.pathname + '/' + item.id}
                      style={{
                        minHeight: '200px',
                        marginTop: '6px',
                        marginBottom: '6px',
                      }}
                      title={
                        <Space>
                          <CodeTwoTone style={{ fontSize: 'inherit' }} />
                          <Typography.Text>[{item.subtopic_id}]</Typography.Text>
                          {item.title}
                        </Space>
                      }
                      onClick={() => {
                        // this.handleCourseProgress(item)
                        window.location.href = this.props.location.pathname + '/' + item.id;
                      }}
                    >
                      <Descriptions size="middle" column={1}>
                        <Descriptions.Item
                          style={{ paddingBottom: '1px' }}
                          label=/*"UPDATE DATE"*/ {
                            <FormattedMessage id="pages.common.updateDate" />
                          }
                        >
                          <a>{new Date(item.update_date).toLocaleString()}</a>
                        </Descriptions.Item>
                        <Descriptions.Item
                          label=/*"VIEWS"*/ {<FormattedMessage id="pages.common.views" />}
                        >
                          <a>{item.views}</a>
                        </Descriptions.Item>
                      </Descriptions>
                      &nbsp;
                      {progress?.finished_courses?.includes(item.title) ? (
                        <Progress
                          type="circle"
                          width={80}
                          style={{ float: 'right' }}
                          percent={100}
                          format={() => 'Done'}
                        />
                      ) : progress?.progress_course?.title == item.title ? (
                        <Progress
                          type="circle"
                          width={80}
                          percent={50}
                          format={(percent) => `In progress`}
                        />
                      ) : progress?.unfinished_courses?.includes(item.title) ? (
                        <Progress
                          type="circle"
                          width={80}
                          percent={0}
                          format={(percent) => `To do`}
                          status="active"
                        />
                      ) : (
                        ''
                      )}
                    </ProCard>
                  );
                })
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<FormattedMessage id="pages.common.des.empty" />}
                />
              )}
            </ProCard>
          </Content>
        </Layout>
      </>
    );
  }
}
