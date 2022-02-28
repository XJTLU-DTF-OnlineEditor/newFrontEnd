import React, { Component } from 'react';
import { Button } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { deleteTopic, editTopic, getTopicByTeacher, newTopic } from '@/services/course';
import { ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message, Empty } from 'antd';
import { Pass } from 'codemirror';

export default class App extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = async () => {
    // 【对接lmo 获取teacher_id】
    const teacher_id = 1;
    const res = await getTopicByTeacher(teacher_id);
    if (res.error_code == 200) {
      this.setState({
        topics: res.data.map(i => {
          let res = i.fields
          res.topic_id = i.pk
          return res
        })
      });
    }
  };


  addNewTopic = async (values) => {
    console.log(values);
    const teacher_id = 1;
    if (!values.topic_content || !values.topic_title) {
      message.error('please input the topic_title and the topic_content');
      return false;
    }
    const res = await newTopic(
      values.topic_title,
      values.topic_content,
      values.topic_img,
      teacher_id,
    );
    if (res.error_code == 200) {
      const new_topic = {
        topic_id: res.id,
        topic_title: values.topic_title,
        topic_content: values.topic_content,
        topic_img: values.topic_img,
      };
      this.setState({ topics: [...this.state.topics, new_topic] });
      message.success('topic has been created successfully');
      return true;
    } else {
      message.error(res.msg);
      return false;
    }
  };

  confirm = async (topic_id) => {
    console.log(topic_id, 222)
    const res = await deleteTopic(topic_id);
    if (res.error_code == 200) {
      message.success('Delete success.');
      this.getTopics();
    } else {
      message.success('Fail to delete. Please try again later');
    }
  };

  render() {
    const IconText = ({ icon, text }) => (
      <span
        onClick={() => {
          console.log(icon, text);
        }}
      >
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
            title: 'Course Management',
            ghost: true,
            breadcrumb: {},
          }}
        >
          <ProCard>
            <ProList
              toolBarRender={() => {
                return [
                  <ModalForm
                    title="Add a new topic"
                    trigger={
                      <Button type="primary">
                        <PlusOutlined />
                        NEW
                      </Button>
                    }
                    autoFocusFirstInput
                    onFinish={(values) => this.addNewTopic(values)}
                    submitter={{
                      searchConfig: {
                        submitText: 'submit',
                        resetText: 'cancel',
                      },
                    }}
                  >
                    <ProFormText
                      width="md"
                      name="topic_title"
                      label="Topic Title"
                      placeholder="please input a topic title"
                    />

                    <ProFormTextArea
                      name="topic_content"
                      label="topic description"
                      placeholder="please input topic description"
                    />
                    <ProFormUploadButton
                      name="topic_img"
                      label="Upload"
                      max={2}
                      fieldProps={{
                        name: 'file',
                        listType: 'picture-card',
                      }}
                      action="/upload.do"
                    // extra="long"
                    />
                  </ModalForm>,
                ];
              }}
              itemLayout="vertical"
              rowKey="id"
              headerTitle="Topics"
              dataSource={this.state.topics}
              metas={{
                title: {
                  dataIndex: 'topic_title',
                  render: (i) => (
                    <a
                      href={`/courseAdmin/courseList?topic_title=${i}`}
                      style={{ 'textDecoration': 'none', color: '#333' }}
                    >
                      {i}
                    </a>
                  ),
                },
                actions: {
                  render: (text, row) => {
                    return [
                      <a href={`/courseAdmin/courseList?topic_title=${row.topic_title}`}>
                        <IconText icon={EyeOutlined} text="view" key="list-vertical-message" />
                      </a>,
                      <ModalForm
                        title="NEW"
                        trigger={
                          <a>
                            <IconText icon={EditOutlined} text="edit" key="list-vertical-star-o" />
                          </a>
                        }
                        autoFocusFirstInput
                        onFinish={async (values) => {
                          if (!values.topic_content && !values.topic_title) {
                            console.log(values.topic_content);
                            // 原topic内容未发生变化
                            message.info('Nothing changed');
                            return true;
                          } else {
                            // 原topic内容发生变化
                            console.log(values, 888)
                            const res = await editTopic(row.topic_id, values);
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
                            submitText: 'submit',
                            resetText: 'cancel',
                          },
                        }}
                      >
                        <ProFormText
                          width="md"
                          name="topic_title"
                          label="Topic Title"
                          placeholder="please input a topic title"
                          value={row.topic_title}
                        />

                        <ProFormTextArea
                          name="topic_content"
                          label="topic description"
                          placeholder="please input topic description"
                          value={row.topic_content}
                        />
                        <ProFormUploadButton
                          name="topic_img"
                          label="Upload"
                          max={2}
                          fieldProps={{
                            name: 'file',
                            listType: 'picture-card',
                          }}
                          action="/upload.do"
                        // value={row.topic_img}
                        />
                      </ModalForm>,
                      <Popconfirm
                        title="Are you sure to delete this topic? This action will also delets all courses attached to this topic"
                        onConfirm={() => this.confirm(row.topic_id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <IconText
                            icon={DeleteOutlined}
                            text="delete"
                            key="list-vertical-like-o"
                          />
                        </a>
                      </Popconfirm>,
                    ];
                  },
                },
                extra: {
                  dataIndex: 'topic_img',
                  render: (i) => <img width={272} alt="logo" src={i.thumbUrl} />,
                },
                content: {
                  dataIndex: 'topic_content',
                  render: (i) => {
                    return <div>{i}</div>;
                  },
                },
              }}
            />
          </ProCard>
        </PageContainer>
      </div>
    );
  }
}
