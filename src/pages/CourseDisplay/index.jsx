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