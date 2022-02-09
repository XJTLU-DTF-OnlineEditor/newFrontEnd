import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { deleteCourse, getCourseDetail } from '@/services/course';
import './CourseDisplay.less'
import { Descriptions, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { editCourse } from '@/services/course';
import { nanoid } from 'nanoid'

export default class App extends Component {
    state = {
        topic_title: this.props.location.query.topic_title,
        id: this.props.location.query.id,
        exercise_title: '',
        update_date: '',
        views: '',
        exercise_content: '',
    }


    getExercise = async () => {
        const { id } = this.state;
        const exercise = await getCourseDetail(id);
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

    save = async () => {
        let now = this.jsDateFormatter(new Date())
        this.setState({ update_date: now });
        let id;
        if (this.state.id) {
            id = this.state.id;
        } else {
            id = nanoid();
            this.setState({ id, views: 0 });
        }
        const { topic_title, exercise_title, exercise_content } = this.state;
        const result = await editCourse(id, topic_title, exercise_title, exercise_content, now);
        if (result['error_code'] == 200) {
            message.success('Save success');
        } else {
            message.error('Save error');
        }
    }

    componentDidMount() {
        // 获取课程内容
        if (this.props.location.query.id) this.getExercise();
    }

    render() {
        return (
            <div
                style={{
                    background: '#F5F7FA',
                }}
            >
                <PageContainer
                    ghost
                    onBack={() => this.props.history.push('/courseList')}
                    header={{
                        title: this.state.exercise_title,
                        breadcrumb: {},
                        extra: [
                            <Button key="1" onClick={() => this.props.history.push('/courseManager?id=' + this.state.id)} type='primary'>EDIT</Button>,
                            <Button key="2" onClick={async () => {
                                const result = await deleteCourse([this.state.id,]);
                                if (result['error_code'] == 200) {
                                    message.success('Delete success');
                                } else {
                                    message.error('Delete error');
                                }
                                this.props.history.push('/courseList')
                            }} type='primary' danger>DELETE</Button>,
                        ]
                    }}
                    content={
                        <Descriptions column={3} style={{ marginBottom: -12, marginLeft: 15 }}>
                            <Descriptions.Item label="RELATED TOPIC">
                                {this.state.topic_title}
                            </Descriptions.Item>
                            <Descriptions.Item label="UPDATE DATE">{this.state.update_date}</Descriptions.Item>
                            <Descriptions.Item label="VIEWS">{this.state.views}</Descriptions.Item>
                        </Descriptions>
                    }
                >
                    <ProCard style={{ height: 600 }} ghost>
                        <CKEditor
                            editor={ClassicEditor}
                            disabled={true}
                            data={this.state.exercise_content}
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
                        /></ProCard>
                </PageContainer>
            </div>

        );
    }
}