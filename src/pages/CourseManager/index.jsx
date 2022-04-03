import React, { Component } from 'react';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message } from 'antd';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './courseManager.less';
import { editCourse, getCourseDetail, newCourse } from '@/services/course';
import ProCard from '@ant-design/pro-card';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';

const { Title } = Typography;
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    id: this.props.location.query.id,
    courseDetail: {},
    isDisabled: this.props.location.query.id,
  };

  componentDidMount() {
    if (this.props.location.query.id) this.getExercise();
  }

  getExercise = async () => {
    const { id } = this.state;
    const { topic_title } = this.props.location.query;
    const res = await getCourseDetail(topic_title, id);
    if (res.error_code == 200) {
      // related_topic, title, content, update_date, views, subtopic_id
      this.setState({ courseDetail: res.data });
    } else {
      message.error(res.msg);
    }
  };

  save = async (values) => {
    const { courseDetail } = this.state;
    if (!courseDetail.title) {
      message.warning('please input the course title');
    } else if (!courseDetail.content) {
      message.warning('please input the course content');
    } else {
      const { topic_title, id } = this.props.location.query;
      // 【【对接获取teacher_id】】
      let result;
      if (id) {
        result = await editCourse(
          id,
          topic_title,
          values.title,
          courseDetail.content,
          values.answer,
          values.hint,
        );
      } else {
        result = await newCourse(
          topic_title,
          courseDetail.title,
          courseDetail.content,
          courseDetail.answer,
          courseDetail.hint,
        );
      }
      if (result['error_code'] == 200) {
        message.success('Save success');
        const res_id = result.data.id;
        this.props.history.push(
          `/courseAdmin/courseDisplay?topic_title=${topic_title}&id=${res_id}`,
        );
      } else {
        message.error('Save error! ' + result.msg);
      }
    }
  };

  render() {
    const { courseDetail } = this.state;
    const { topic_title } = this.props.location.query;
    return (
      <PageContainer
        ghost
        onBack={() => this.props.history.go(-1)}
        header={{
          title: <Title level={2}>{courseDetail.id ? 'Edit Course' : 'Add Course'}</Title>,
        }}
      >
        <ProCard>
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              // 配置按钮文本
              searchConfig: {
                submitText: 'Submit',
              },
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }}
            onFinish={this.save}
          >
            <ProFormText
              width="md"
              name="title"
              label="Course Title"
              placeholder="input course title here"
              value={courseDetail?.title}
              onChange={(e) => {
                courseDetail.title = e.target.value;
                this.setState({ courseDetail });
              }}
            />
            <ProForm.Item name="content" label="Course Content" value={courseDetail?.content}>
              <CKEditor
                editor={ClassicEditor}
                data={courseDetail.content}
                config={{
                  toolbar: {
                    items: [
                      'heading', //类型
                      '|',
                      'bold', //加粗
                      'italic', //斜体
                      'link', //超链接
                      'bulletedList', // 无序列表
                      'numberedList', //有序列表
                      '|',
                      'indent', //左缩进
                      'outdent', //右缩进
                      '|',
                      'imageUpload', //图片上传
                      'blockQuote', //引用
                      'insertTable', //插入图标
                      'mediaEmbed', //视频上传
                      'undo', //撤销
                      'redo', //重做
                    ],
                    // 工具栏自动换行
                    shouldNotGroupWhenFull: false,
                  },
                  // 标题样式
                  heading: {
                    options: [
                      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      {
                        model: 'heading1',
                        view: 'h1',
                        title: 'Heading 1',
                        class: 'ck-heading_heading1',
                      },
                      {
                        model: 'heading2',
                        view: 'h2',
                        title: 'Heading 2',
                        class: 'ck-heading_heading2',
                      },
                    ],
                  },
                  // 表格样式
                  table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                  },
                  // upload
                  ckfinder: {
                    uploadUrl: `/server/V1/course/upload_course_img/${topic_title}/`,
                  },
                }}
                onChange={(event, editor) => {
                  let { courseDetail } = this.state;
                  const data = editor.getData();
                  courseDetail.content = data;
                  this.setState({ courseDetail });
                }}
                onError={({ willEditorRestart }) => {
                  if (willEditorRestart) {
                    this.editor.ui.view.toolbar.element.remove();
                  }
                }}
              />
            </ProForm.Item>
            <ProFormTextArea
              name="answer"
              label="Answer"
              value={courseDetail?.answer}
              placeholder="Please input the answer for the code"
              onChange={(e) => {
                courseDetail.answer = e.target.value;
                this.setState({ courseDetail });
              }}
            />
            <ProFormTextArea
              name="hint"
              label="Hint"
              value={courseDetail?.hint}
              placeholder="Please input the hint for the code exercise"
              onChange={(e) => {
                courseDetail.hint = e.target.value;
                this.setState({ courseDetail });
              }}
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    );
  }
}
