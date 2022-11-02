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
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
// ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint.js';
// 代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 补全括号
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike'; // java: text/x-java
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python.js';  // python
import 'codemirror/mode/properties/properties.js';
// 全屏显示
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';

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
      let result;
      if (id) {
        result = await editCourse(
          id,
          topic_title,
          values.title,
          courseDetail.content,
          values.answer,
          values.hint,
          courseDetail.code,
        );
      } else {
        result = await newCourse(
          topic_title,
          courseDetail.title,
          courseDetail.content,
          courseDetail.answer,
          courseDetail.hint,
          courseDetail.code,
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
          title: <Title level={2}>{courseDetail.id ? /*'Edit Course'*/ <FormattedMessage id="pages.courseManager.editCourse" />
            : /*'Add Course'*/ <FormattedMessage id="pages.courseManager.addCourse" />}</Title>,
        }}
      >
        <ProCard>
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              // 配置按钮文本
              searchConfig: {
                submitText: /*'submit'*/ <FormattedMessage id="pages.common.submit" />,
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
              label=/*"Course Title"*/{<FormattedMessage id="pages.common.courseTitle" />}
              placeholder=/*"please input a course title"*/{getLocale() == 'zh-CN' ? "请输入该课程的标题" : "please input a course title"}
              value={courseDetail?.title}
              onChange={(e) => {
                courseDetail.title = e.target.value;
                this.setState({ courseDetail });
              }}
            />
            <ProForm.Item name="content" label=/*"Course Content"*/{<FormattedMessage id="pages.courseManager.courseContent" />} value={courseDetail?.content}>
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
            <ProForm.Item
              name="code" 
              label=/*"code"*/{<FormattedMessage id="pages.courseManager.code" />}
              value={courseDetail?.code}>
              <CodeMirror
                className="editor"
                options={{
                  mode: 'python',
                  // theme: 'darcula',
                  autofocus: true, // 自动获取焦点
                  styleActiveLine: true, // 光标代码高亮
                  lineNumbers: true, // 显示行号
                  smartIndent: true, // 自动缩进
                  // start-设置支持代码折叠
                  lineWrapping: true,
                  foldGutter: true,
                  placeholder: /*'code goes here'*/ getLocale() == 'zh-CN' ? "代码输入区..." : "code goes here",
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
                  matchBrackets: true, // 括号匹配，光标旁边的括号都高亮显示
                  autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
                  // fullScreen: isFullScreen, // 全屏显示
                  scrollbarStyle: 'simple',
                  cursorScrollMargin: 5,
                  extraKeys: {
                    Ctrl: 'autocomplete',
                    'Ctrl-S': function (editor) {
                      editor.codeSave(editor);
                    },
                    'Ctrl-Z': function (editor) {
                      editor.undo();
                    },
                    F8: function (editor) {
                      editor.redo();
                    },
                  },
                }}
                value={courseDetail?.code}
                onBeforeChange={(editor, data, value) => {
                  courseDetail.code = value;
                  this.setState({ courseDetail });
                }}
              />
            </ProForm.Item>
            <ProFormTextArea
              name="answer"
              label=/*"answer"*/{<FormattedMessage id="pages.common.answer" />}
              value={courseDetail?.answer}
              placeholder=/*"Please input the answer for the code"*/ {getLocale() == 'zh-CN' ? "请输入该代码练习的答案" : "Please input the answer for the code"}
              onChange={(e) => {
                courseDetail.answer = e.target.value;
                this.setState({ courseDetail });
              }}
            />
            <ProFormTextArea
              name="hint"
              label=/*"hint"*/{<FormattedMessage id="pages.common.hint" />}
              value={courseDetail?.hint}
              placeholder=/*"Please input the hint for the code exercise"*/ {getLocale() == 'zh-CN' ? "请输入该代码练习的提示信息" : "Please input the hint for the code exercise"}
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
