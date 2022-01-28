import React, { Component } from 'react';
import ProForm, { ProFormText} from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './courseManager.less'
import { editCourse, getExercises } from '@/services/course';

export default class App extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.query.id) {
            this.getExercise()
            console.log('1111')
        };
    }
    state = {
        topic_title: '',
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

    getExercise = async () => {
        const { id } = this.state;
        const exercise = await getExercises(id);
        console.log(exercise)
        // exercise_title, exercise_content, update_date, views
        this.setState(exercise);
    };

    jsDateFormatter = (dateInput) => {  // dateInput 是一个 js 的 Date 对象
        var year = dateInput.getFullYear();
        var month = dateInput.getMonth() + 1;
        var theDate = dateInput.getDate();

        var hour = dateInput.getHours();
        var minute = dateInput.getMinutes();
        var second = dateInput.getSeconds();

        if (month < 10) {
            month = '0' + month;
        }

        if (theDate < 10) {
            theDate = '0' + theDate;
        }

        if (hour < 10) {
            hour = '0' + hour;
        }

        if (minute < 10) {
            minute = '0' + minute;
        }

        if (second < 10) {
            second = '0' + second;
        }

        return year + "-" + month + "-" + theDate + " " + hour + ":" + minute + ":" + second;
    }

    save = async (values) => {
        console.log(values)
        const now = this.jsDateFormatter(new Date())
        this.setState({ update_date: now });
        let id;
        if (this.state.id) {
            id = this.state.id;
        } else {
            id = nanoid();
            this.setState({ id, views: 0 });
        }
        if(!this.state.topic_title){
            message.warning('please input the related topic title');
        }else if(!this.state.exercise_title){
            message.warning('please input the course title');
        }else if(!this.state.exercise_content){
            message.warning('please input the course content');
        }else{
            const { topic_title, exercise_title, exercise_content } = this.state;
            const result = await editCourse(id, topic_title, exercise_title, exercise_content, now);
            console.log(result);
            if (result['error_code'] == 200) {
                message.success('Save success');
                console.log('success')
                this.props.history.push('/courseDisplay?id='+this.state.id)
            } else {
                message.error('Save error');
            }
        }
    }

    render() {
        return (
            <PageContainer
                ghost
                onBack={() => this.props.history.push('/courseList')}
                header={{
                    title: 'Add Course',
                }}
            >
                <Card>
                    <ProForm
                        submitter={{
                            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                            // 配置按钮文本
                            searchConfig: {
                                resetText: 'Reset',
                                submitText: 'Submit',
                            }
                        }}
                        onFinish={this.save}>
                        <ProForm.Group >
                            <ProFormText width="md" name="topic_title" label="Related Topic Title"
                                placeholder='input topic title here' value={this.state.topic_title}
                                onChange={e => {
                                    this.setState({ topic_title: e.target.value })
                                }}
                                />
                            <ProFormText width="md" name="exercise_title" label="Course Title"
                                placeholder='input course title here' value={this.state.exercise_title}
                                onChange={e => {
                                    this.setState({ exercise_title: e.target.value })
                                }}
                                />
                        </ProForm.Group>
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
                </Card>
            </PageContainer>
        )
    };
}