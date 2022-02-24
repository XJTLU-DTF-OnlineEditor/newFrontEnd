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
import { Popconfirm } from 'antd';

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
        const { topic_title, id } = this.state;
        const exercise = await getCourseDetail(topic_title, id);
        // exercise_title, exercise_content, update_date, views
        this.setState(exercise);
    };

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
                    onBack={() => this.props.history.push('/courseList?topic_title=' + this.state.topic_title)}
                    header={{
                        title: this.state.exercise_title,
                        breadcrumb: {},
                        extra: [
                            <Button key="1" onClick={() => this.props.history.push(`/courseManager?topic_title=${this.state.topic_title}&id=${this.state.id}`)} type='primary'>EDIT</Button>,
                            <Popconfirm
                                title="Are you sure to delete this course?"
                                onConfirm={async () => {
                                    const result = await deleteCourse(this.props.location.query.topic_title, [this.state.id,]);
                                    if (result['error_code'] == 200) {
                                        message.success('Delete success');
                                    } else {
                                        message.error('Delete error');
                                    }
                                    this.props.history.push('/courseList?topic_title=' + this.state.topic_title)
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