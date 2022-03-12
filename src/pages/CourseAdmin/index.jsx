import React, { Component } from 'react';
import { Button, Upload } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { deleteTopic, delete_img, editTopic, getTopicByTeacher, newTopic } from '@/services/course';
import { ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

export default class App extends Component {
  state = {
    topics: [],
    file: '',
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = async () => {
    // 【对接lmo 获取teacher_id】
    const teacher_id = 1;
    const res = await getTopicByTeacher(teacher_id);
    console.log(res);
    if (res.error_code == 200) {
      this.setState({
        topics: res.data.map((i) => {
          let res = i.fields;
          res.topic_id = i.pk;
          if (res.topic_img)
            res.topic_img = {
              url: 'media/' + res.topic_img,
              name: res.topic_img,
            };
          return res;
        }),
      });
    }
  };

  addNewTopic = async (values) => {
    console.log(values);
    // return true;
    const teacher_id = 1;
    if (!values.topic_content || !values.topic_title) {
      message.error('please input the topic_title and the topic_content');
      return false;
    }

    const res = await newTopic(
      values.topic_title,
      values.topic_content,
      this.state.file,
      teacher_id,
    );
    if (res.error_code == 200) {
      const new_topic = {
        topic_id: res.id,
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

  // 增加图片的长宽属性
  // addImageSize = file => {
  //   const filereader = new FileReader();
  //   filereader.readAsDataURL(file);
  //   filereader.onload = (e) => {
  //     console.log(e, 111)
  //     // const src = e.target.result;
  //     const image = new Image();
  //     image.src = filereader.result;
  //     image.onload = () => {
  //       file.width = image.width;
  //       file.height = image.height;
  //     };
  //   };
  //   return file
  // };

  // 限制图片的格式，size，分辨率
  handleBeforeUpload = (file) => {
    // 限制图片的格式
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: 'Only JPG, JPEG, GIF, and PNG images can be uploaded',
      });
      return false;
    }

    // 限制图片的大小
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({
        title: 'the value exceeds the 2 MB limit, upload is not allowed',
      });
      return false;
    }

    // const filereader = new FileReader();
    // filereader.readAsDataURL(file);
    // filereader.onload = (e) => {
    //   console.log(e, 111)
    //   // const src = e.target.result;
    //   const image = new Image();
    //   image.src = filereader.result;
    //   image.onload = () => {
    //     file.width = image.width;
    //     file.height = image.height;
    //   };
    // };
    // console.log(file)

    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M;
  };

  formRef = React.createRef();

  handleChange = async (info) => {
    console.log(info);
    let file = info.file;

    // 【重要】将 图片的base64替换为图片的url
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
                    formRef={this.formRef}
                    autoFocusFirstInput
                    onFinish={(values) => this.addNewTopic(values)}
                    submitter={{
                      searchConfig: {
                        submitText: 'submit',
                        resetText: 'cancel',
                      },
                      // render: (props, defaultDoms) => {
                      //   return [
                      //     ...defaultDoms,
                      //     <Button
                      //       key="extra-reset"
                      //       onClick={() => {
                      //         props.reset();
                      //       }}
                      //     >
                      //       重置
                      //     </Button>,
                      //   ];
                      // },
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
                      width="xl"
                    />
                    <ProFormUploadButton
                      name="topic_img"
                      label="Upload"
                      max={1}
                      beforeUpload={(file) => this.handleBeforeUpload(file)}
                      fieldProps={{
                        name: 'topic_img',
                        listType: 'picture-card',
                      }}
                      action="/server/V1/course/upload_topic_img/"
                      // isImageUrl={true}
                      onChange={this.handleChange}
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
                      style={{ textDecoration: 'none', color: '#333' }}
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
                        title="EDIT"
                        trigger={
                          <a>
                            <IconText icon={EditOutlined} text="edit" key="list-vertical-star-o" />
                          </a>
                        }
                        autoFocusFirstInput
                        onFinish={async (values) => {
                          console.log(values);
                          if (!values.topic_content && !values.topic_title && !values.topic_img) {
                            // 原topic内容未发生变化
                            message.info('Nothing changed');
                            return true;
                          } else {
                            // 原topic内容发生变化
                            if (values.topic_img) {
                              values.topic_img = values.topic_img[0];
                            }
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
                          beforeUpload={(file) => this.handleBeforeUpload(file)}
                          fieldProps={{
                            name: 'topic_img',
                            listType: 'picture-card',
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
                              if (i.topic_id == row.topic_id) {
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
                          label="Upload"
                          max={1}
                          value={row.topic_img ? [row.topic_img] : []}
                          // value={row.topic_img.status=="uploading"|"done"?[{ url: "media/" + row.topic_img },]:[]}
                          // isImageUrl={true}
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
                  render: (i) => {
                    if (i) return <img width="180px" alt="logo" src={`${i.url}`} />;
                  },
                },
                content: {
                  dataIndex: 'topic_content',
                  render: (i) => <div>{i}</div>,
                },
              }}
            />
          </ProCard>
        </PageContainer>
      </div>
    );
  }
}
