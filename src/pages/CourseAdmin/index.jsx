import React, { Component } from 'react';
import { Button, Popconfirm, message, Row, Col, Space } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { deleteTopic, delete_img, editTopic, getTopicByTeacher, newTopic } from '@/services/course';
import { ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import './index.less';
import { currentUser } from '@/services/user/api';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import CourseList from '../CourseList'

import { Card } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

export default class App extends Component {
  state = {
    topics: [],
    file: '',
  };

  teacher_info = React.createRef();
  formRef = React.createRef();

  componentDidMount() {
    this.getTopics();
  }

  getTopics = async () => {
    const teacher = await currentUser();
    this.teacher_info.current = teacher.data;

    const res = await getTopicByTeacher(this.teacher_info.current.userid);
    // const res = await getTopicByTeacher(1);

    if (res.error_code == 200) {
      this.setState({
        topics: res.data.map((i) => {
          let res = i.fields;
          res.topic_id = i.pk;
          if (res.topic_img)
            res.topic_img = {
              url: '/media/' + res.topic_img,
              name: res.topic_img,
            };
          return res;
        }),
      });
    }
  };

  addNewTopic = async (values) => {
    console.log(values);
    const teacher_id = this.teacher_info.current.userid;
    if (!values.topic_content || !values.topic_title) {
      message.error('please input the topic_title and the topic_content');
      return false;
    }

    const res = await newTopic(
      values.topic_title,
      values.topic_content,
      values.topic_description,
      this.state.file,
      teacher_id,
    );
    if (res.error_code == 200) {
      const new_topic = {
        topic_id: res.id,
        topic_description: values.topic_description,
        topic_title: values.topic_title,
        topic_content: values.topic_content,
        topic_img: this.state.file,
      };
      this.setState({ topics: [...this.state.topics, new_topic] });
      message.success('topic has been created successfully');
      this.formRef.current?.resetFields();
      return true;
    } else {
      message.error(res.msg);
      return false;
    }
  };

  confirm = async (topic_id) => {
    const res = await deleteTopic(topic_id);
    if (res.error_code == 200) {
      message.success('Delete success.');
      this.getTopics();
    } else {
      message.success('Fail to delete. Please try again later');
    }
  };

  handleChange = async (info) => {
    console.log(info)
    let file = info.file;

    // 将图片的base64替换为图片的url
    if (file && file.status == 'done' && file['response']) {
      file.name = file.response.imgUrl;
    } else if (file.status == 'removed') {
      const res = await delete_img(file.name, 'Topic');
      console.log(res);
      file = undefined;
    }
    this.setState({ file });
  };

  render() {
    const IconText = ({ icon, text }) => (
      <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
      </span>
    );

    return (
      <div
        style={{
          background: '#F5F7FA',
        }}
      >
        <PageContainer
          header={{
            title: <Title level={2}>{/*Course Management*/} <FormattedMessage id="pages.courseAdmin.title" /></Title>,
            ghost: true,
            breadcrumb: {},
          }}
        >
          <Card>
            <Row gutter={{ xs: 16, sm: 24, md: 32 }} >
              {this.state.topics.map(item => {
                // eslint-disable-next-line react/jsx-key
                return <Col span={8}>
                  <Card
                    hoverable
                    className='course-card'
                    style={{ marginTop: '20px' }}
                    cover={<img alt={item.topic_img.title} src={item.topic_img.url} onClick={() => {
                      this.props.history.push(`/courseAdmin/courseList?topic_title=${item.topic_title}`)
                    }} />}
                    actions={[
                      // eslint-disable-next-line react/jsx-key
                      <a href={`/courseAdmin/courseList?topic_title=${item.topic_title}`}>
                        <IconText icon={EyeOutlined} text=/*"view"*/{<FormattedMessage id="pages.common.view" />} key="list-vertical-message" />
                      </a>,
                      // eslint-disable-next-line react/jsx-key
                      <ModalForm
                        title=/*"EDIT"*/{<FormattedMessage id="pages.common.edit" />}
                        initialValues={item}
                        trigger={
                          <a>
                            <IconText icon={EditOutlined} text=/*"edit"*/{<FormattedMessage id="pages.common.edit" />} key="list-vertical-star-o" />
                          </a>
                        }
                        autoFocusFirstInput
                        onFinish={async (values) => {
                          console.log(values);
                          if (!values.topic_content && !values.topic_title && !values.topic_img && !values.topic_description) {
                            // 原topic内容未发生变化
                            message.info('Nothing changed');
                            return true;
                          } else {
                            // 原topic内容发生变化
                            if (values.topic_img) {
                              values.topic_img = values.topic_img[0];
                            }
                            const res = await editTopic(item.topic_id, values);
                            if (res.error_code == 200) {
                              this.getTopics();
                              message.success('topic infomation changed success');
                              return true;
                            } else {
                              message.error(res.msg);
                              return false;
                            }
                          }
                        }}
                        submitter={{
                          searchConfig: {
                            submitText: /*'submit'*/<FormattedMessage id="pages.common.submit" />,
                            resetText: /*'cancel'*/<FormattedMessage id="pages.common.cancel" />,
                          },
                        }}
                      >
                        <ProFormText
                          width="md"
                          name="topic_title"
                          label=/*"Topic Title"*/{<FormattedMessage id="pages.courseAdmin.topicTitle" />}
                          placeholder=/*"please input a topic title"*/{getLocale() == 'zh-CN' ? "请输入该主题的标题" : "please input a topic title"}
                        // value={item.topic_title}
                        />

                        <ProFormTextArea
                          name="topic_description"
                          label="topic description"
                          placeholder=/*"please input the topic description"*/{getLocale() == 'zh-CN' ? "请输入该主题的描述" : "please input a topic description"}
                        // value={item.topic_content}
                        />
                        <ProFormTextArea
                          name="topic_content"
                          label="topic content"
                          placeholder=/*"please input the topic content"*/{getLocale() == 'zh-CN' ? "请输入该主题的内容介绍" : "please input a topic content"}
                        // value={item.topic_content}
                        />
                        <ProFormUploadButton
                          name="topic_img"
                          beforeUpload={this.handleBeforeUpload}
                          fieldProps={{
                            name: 'topic_img',
                            listType: 'picture-card',
                            accept: '.jpg, .png, .jpeg, .gif'
                          }}
                          action="/server/V1/course/upload_topic_img/"
                          // isImageUrl={true}
                          onChange={async (info) => {
                            console.log(info);
                            let topics = this.state.topics;
                            let file = info.file;
                            if (file.status == 'removed') {
                              const res = await delete_img(file.name, 'Topic');
                              console.log(res);
                            }
                            topics.map((i) => {
                              if (i.topic_id == item.topic_id) {
                                if (file.status == 'removed') {
                                  i.topic_img = '';
                                } else if (file && file.status == 'done' && file['response']) {
                                  file.name = file.response.imgUrl;
                                  i.topic_img = file;
                                } else {
                                  i.topic_img = file;
                                }
                              }
                              return i;
                            });
                            this.setState({ topics });
                          }}
                          label=/*"Upload"*/{<FormattedMessage id="pages.courseAdmin.upload" />}
                          max={1}
                          value={item.topic_img ? [item.topic_img] : []}
                        // isImageUrl={true}
                        />
                      </ModalForm>,
                      // eslint-disable-next-line react/jsx-key
                      <Popconfirm
                        title=/*"Are you sure to delete this topic? This action will also delets all courses attached to this topic"*/{<FormattedMessage id="pages.des.delTopic" />}
                        onConfirm={() => this.confirm(item.topic_id)}
                        okText=/*"Yes"*/{<FormattedMessage id="pages.common.yes" />}
                        cancelText=/*"No"*/{<FormattedMessage id="pages.common.no" />}
                      >
                        <a>
                          <IconText
                            icon={DeleteOutlined}
                            text=/*"delete"*/{<FormattedMessage id="pages.common.delete" />}
                            key="list-vertical-like-o"
                          />
                        </a>
                      </Popconfirm>,
                    ]}
                  >
                    <Meta title={item.topic_title} description={item.topic_description} onClick={() => {
                      this.props.history.push(`/courseAdmin/courseList?topic_title=${item.topic_title}`)
                    }} />
                    <ProCard title={<FormattedMessage id="pages.courseList.showCourses" />} ghost gutter={8} collapsible defaultCollapsed>
                      <CourseList topic_info={{ topic_title: item.topic_title, topic_id: item.topic_id }} />
                    </ProCard>
                  </Card>
                </Col>
              })}
            </Row>
          </Card>

          <ModalForm
            title=/*"Add a new topic"*/ {<FormattedMessage id="pages.courseAdmin.newTopic" />}
            trigger={
              <Card
                bordered={false}
                style={{ backgroundColor: `white`, cursor: 'pointer', marginTop: '10px' }}
              >
                <Row justify="center">
                  <Title level={5} style={{ color: 'grey', fontWeight: 'normal' }}>
                    <PlusOutlined />&nbsp;<FormattedMessage id="pages.courseList.newTopic" />
                  </Title>
                </Row>
              </Card>
            }
            formRef={this.formRef}
            autoFocusFirstInput
            onFinish={(values) => this.addNewTopic(values)}
            submitter={{
              searchConfig: {
                submitText: /*'submit'*/ <FormattedMessage id="pages.common.submit" />,
                resetText: /*'cancel'*/ <FormattedMessage id="pages.common.cancel" />,
              },
            }}
          >
            <ProFormText
              width="md"
              name="topic_title"
              label=/*"Topic Title"*/{<FormattedMessage id="pages.courseAdmin.topicTitle" />}
              placeholder=/*"please input a topic title"*/{getLocale() == 'zh-CN' ? "请输入该主题的标题" : "please input a topic title"}
            />
            <ProFormTextArea
              name="topic_description"
              label="topic description"
              placeholder=/*"please input the topic description"*/{getLocale() == 'zh-CN' ? "请输入该主题的描述" : "please input a topic description"}
            // value={item.topic_content}
            />
            <ProFormTextArea
              name="topic_content"
              label="topic content"
              placeholder=/*"please input the topic content"*/{getLocale() == 'zh-CN' ? "请输入该主题的内容介绍" : "please input a topic content"}
            // value={item.topic_content}
            />
            <ProFormUploadButton
              name="topic_img"
              label=/*"Upload"*/{<FormattedMessage id="pages.courseAdmin.upload" />}
              max={1}
              beforeUpload={this.handleBeforeUpload}
              fieldProps={{
                name: 'topic_img',
                listType: 'picture-card',
                accept: '.jpg, .png, .jpeg, .gif'
              }}
              action="/server/V1/course/upload_topic_img/"
              // isImageUrl={true}
              onChange={this.handleChange}
            />
          </ModalForm>

        </PageContainer>
      </div>
    );
  }
}
