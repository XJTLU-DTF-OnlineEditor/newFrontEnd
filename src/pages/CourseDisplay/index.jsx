import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { deleteCourse, getCourseDetail } from '@/services/course';
import './CourseDisplay.less'
import { Descriptions, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Popconfirm } from 'antd';
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
    state = {
        topic_title: this.props.location.query.topic_title,
        id: this.props.location.query.id,
        courseDetail: {},
    }


    getExercise = async () => {
        const { topic_title, id } = this.state;
        const res = await getCourseDetail(topic_title, id);
        if (res.error_code == 200) {
            // related_topic, title, content, update_date, views, subtopic_id
            this.setState({ courseDetail: res.data });
        }

    };

    componentDidMount() {
        // 获取课程内容
        if (this.props.location.query.id) this.getExercise();
    }

    render() {
        const { courseDetail, topic_title, id } = this.state
        return (
            <div
                style={{
                    background: '#F5F7FA',
                }}
            >
                <PageContainer
                    ghost
                    onBack={() => this.props.history.push('/courseAdmin/courseList?topic_title=' + topic_title)}
                    header={{
                        title: <Title level={2}>{courseDetail.title}</Title>,
                        breadcrumb: {},
                        extra: [
                            <Button key="1" onClick={() => this.props.history.push(`/courseAdmin/courseManager?topic_title=${topic_title}&id=${id}`)} type='primary'>EDIT</Button>,
                            // eslint-disable-next-line react/jsx-key
                            <Popconfirm
                                title=/*"Are you sure to delete this course?"*/ {<FormattedMessage id="pages.des.del" />}
                                onConfirm={async () => {
                                    const result = await deleteCourse(this.props.location.query.topic_title, [id,]);
                                    if (result['error_code'] == 200) {
                                        message.success('Delete success');
                                    } else {
                                        message.error('Delete error');
                                    }
                                    this.props.history.push('/courseAdmin/courseList?topic_title=' + topic_title)
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="2" type='primary' danger>DELETE</Button>
                            </Popconfirm>,
                        ]
                    }}
                    content={
                        <Descriptions column={3} style={{ marginBottom: -12, marginLeft: 15 }}>
                            <Descriptions.Item label=/*"RELATED TOPIC"*/{<FormattedMessage id="pages.common.relatedTopic" />}>
                                {topic_title}
                            </Descriptions.Item>
                            <Descriptions.Item label=/*"UPDATE DATE"*/{<FormattedMessage id="pages.common.updateDate" />}>{courseDetail.update_date}</Descriptions.Item>
                            <Descriptions.Item label=/*"VIEWS"*/{<FormattedMessage id="pages.common.views" />}>{courseDetail.views}</Descriptions.Item>
                        </Descriptions>
                    }
                >
                    <ProCard ghost>
                        <CKEditor
                            editor={ClassicEditor}
                            disabled={true}
                            data={courseDetail.content}
                            config={{
                                toolbar: {
                                    items: [],
                                },
                            }}
                            onError={({ willEditorRestart }) => {
                                // If the editor is restarted, the toolbar element will be created once again.
                                // The `onReady` callback will be called again and the new toolbar will be added.
                                // This is why you need to remove the older toolbar.
                                if (willEditorRestart) {
                                    this.editor.ui.view.toolbar.element.remove();
                                }
                            }}
                        />
                    </ProCard>
                    <ProCard title=/*"code"*/{<FormattedMessage id="pages.courseManager.code" />} style={{ minHeight: 100 }}>
                        <CodeMirror
                            className="editor"
                            options={{
                                mode: 'python',
                                readOnly: true,
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
                    </ProCard>
                    <ProCard title=/*"answer"*/{<FormattedMessage id="pages.common.answer" />} style={{ minHeight: 100 }}>
                        {courseDetail?.answer}
                    </ProCard>
                    <ProCard title=/*"hint"*/{<FormattedMessage id="pages.common.hint" />} style={{ minHeight: 100 }}>
                        {courseDetail?.hint}
                    </ProCard>
                </PageContainer>
            </div>

        );
    }
}