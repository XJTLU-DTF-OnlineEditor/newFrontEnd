import React, { Component } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './courseManager.less'
import { editCourse, getCourseDetail, newCourse } from '@/services/course';
import ProCard from '@ant-design/pro-card';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';

export default class App extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.query.id) {
            this.getExercise()
        };
    }
    state = {
        id: this.props.location.query.id,
        exercise_title: '',
        update_date: '',
        views: '',
        exercise_content: '',
        isDisabled: this.props.location.query.id
    }

    componentDidMount() {
        if (this.props.location.query.id) this.getExercise();
    }

    onNameChange = event => {
        this.setState({ name: event.target.value });
    };

    addItem = e => {
        e.preventDefault();
        const { name, items } = this.state

        if (name) {
            if (items.includes(name)) {
                message.error("repeated topic title")
            } else {
                this.setState({ items: [...items, name] });
                this.setState({ name: '' });
            }
        } else {
            message.error("please input a topic title")
        }
    };

    handleTopic = async (value) => {
        console.log(value)
        const { topics } = this.state
        for (let i = 0; i < topics.length; i++) {
            if (value == topics[i].topic_title) {
                this.setState({ chosen_topic: topics[i] })
            } else {
                this.setState({ chosen_topic: value })
            }
        }
    }


    getExercise = async () => {
        const { id } = this.state;
        const {topic_title} = this.props.location.query
        const exercise = await getCourseDetail(topic_title, id);
        // exercise_title, exercise_content, update_date, views
        this.setState(exercise);
    };


    save = async (values) => {
        if (!this.state.exercise_title) {
            message.warning('please input the course title');
        } else if (!this.state.exercise_content) {
            message.warning('please input the course content');
        } else {
            const { topic_title, id } = this.props.location.query
            const { exercise_title, exercise_content } = this.state;
            // 【【对接获取teacher_id】】
            const teacher_id = 123
            let result
            if (id) {
                result = await editCourse(id, topic_title, values.exercise_title, exercise_content, teacher_id);
            }
            else {
                result = await newCourse(topic_title, exercise_title, exercise_content, teacher_id);
            }
            console.log(result)
            if (result['error_code'] == 200) {
                message.success('Save success');
                const res_id = result.id
                this.props.history.push(`/courseDisplay?topic_title=${topic_title}&id=${res_id}`)
            } else {
                message.error('Save error');
            }
        }
    }

    render() {
        return (
            <PageContainer
                ghost
                onBack={() => this.props.history.go(-1)}
                header={{
                    title: this.state.id? 'Edit Course':'Add Course',
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
                        <ProFormText width="md" name="exercise_title" label="Course Title"
                            placeholder='input course title here' value={this.state.exercise_title}
                            onChange={e => {
                                this.setState({ exercise_title: e.target.value })
                            }}
                        />
                        <ProForm.Item name="exercise_content" label="Course Content" value={this.state.exercise_content}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.exercise_content}
                                config={{
                                    toolbar: {
                                        items: [
                                            'heading', //类型
                                            '|',
                                            'bold', //加粗
                                            'italic', //斜体
                                            'link', //超链接
                                            'bulletedList',// 无序列表
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
                                            'redo'//重做
                                        ],
                                        // 工具栏自动换行
                                        shouldNotGroupWhenFull: false,
                                    },
                                    // 标题样式
                                    heading: {
                                        options: [
                                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                        ],
                                    },
                                    // 表格样式
                                    table: {
                                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                                    },
                                    // upload
                                    ckfinder: {
                                        uploadUrl: '/图片上传服务器地址',
                                    },
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({ exercise_content: data })
                                }}
                                onError={({ willEditorRestart }) => {
                                    if (willEditorRestart) {
                                        this.editor.ui.view.toolbar.element.remove();
                                    }
                                }}
                            />
                        </ProForm.Item>
                    </ProForm>
                </ProCard>

            </PageContainer>
        )
    };
}