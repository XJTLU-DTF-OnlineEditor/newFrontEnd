import React, { Component } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, message, Row } from 'antd';
import { DragSortTable } from '@ant-design/pro-table';
import { request } from 'umi';
import { deleteCourse, updateSubtopicId } from '@/services/course';
import { Popconfirm, Empty } from 'antd';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import './courseList.less';
import { Typography } from 'antd';
import { currentUser } from '@/services/user/api';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { MenuOutlined } from '@ant-design/icons';
import { MeasuringStrategy } from '@dnd-kit/core';
import PubSub from 'pubsub-js';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const { Title } = Typography;

export default class App extends Component {

    state = {
        selectedRowKeys: [],
        dataSource: [],
    }
    teacher_info = React.createRef();

    topic_info = this.props.topic_info || this.props.location.query
    

    color = ['#7193f1', '#ffda6c', '#00bcd4', '#ef769f']
    overColor = ['#F6F8FE', '#FFFDF5', '#EEFBFC', '#FEF6F9']

    componentDidMount() {
        this.getDataSource()
        PubSub.subscribe('update', (msg, data) => {
            this.getDataSource()
        })
    }

    handleDragEnd = (event) => {
        const { active, over } = event;
        let { dataSource } = this.state

        if (active.id !== over.id) {

            const oldIndex = dataSource.map(i => i.id).indexOf(active.id);
            const newIndex = dataSource.map(i => i.id).indexOf(over.id);
            console.log(oldIndex, newIndex, 444)


            dataSource = arrayMove(dataSource, oldIndex, newIndex);

            this.setState({ dataSource });

            this.handleDragSortEnd(dataSource);
        }
    }

    getDataSource = async () => {
        const teacher = await currentUser();
        this.teacher_info.current = teacher.data;

        const topic_title = this.topic_info.topic_title
        let result = await request(`/server/V1/course/courses/${topic_title}/`);

        if (result.error_code == 200) {
            let course_list = result.course_list.map(i => {
                let res = i.fields
                res.id = i.pk
                return res
            })

            course_list.forEach(element => {
                element['update_date'] = new Date(element['update_date']);
            });

            this.setState({ dataSource: course_list })
        } else {
            this.setState({ dataSource: null })
        }

    }

    handleDragSortEnd = async (newDataSource) => {
        console.log('排序后的数据', newDataSource);
        const topic_title = this.topic_info.topic_title

        const oldDataSource = this.state.dataSource
        let oldSeq = oldDataSource.map((i, index) => {
            return { id: i.id, subtopic_id: index + 1 }
        })
        let newSeq = newDataSource.map((i, index) => {
            return { id: i.id, subtopic_id: index + 1 }
        })
        let updateSeq = newSeq.filter((element, index) => {
            return element.id != oldSeq[index].id
        })

        const res = await updateSubtopicId(topic_title, updateSeq)

        if (res.error_code == 200) {
            this.setState({ dataSource: newDataSource });
            message.success('Modified course order successfully');
        } else {
            message.error('Failed to modify course order! ', res.msg);
        }

    };

    handleDelete = async () => {
        const { table } = this
        const { selectedRowKeys } = this.state;
        // console.log(selectedRowKeys)
        const result = await deleteCourse(this.topic_info.topic_title, selectedRowKeys);
        if (result['error_code'] == 200) {
            message.success('Delete success');
        } else {
            message.error('Delete error');
        }
        table.reload();
    };


    render() {
        const onSelectChange = selectedRowKeys => {
            this.setState({ selectedRowKeys });
        };
        const { dataSource } = this.state;
        const { topic_info } = this;

        console.log()
        return (
            <>
                {dataSource ?
                    <DndContext
                        // sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={this.handleDragEnd}
                    >
                        <SortableContext
                            items={this.state.dataSource}
                            strategy={verticalListSortingStrategy}
                        >
                            {this.state.dataSource.map(item => <SortableItem item={item} id={item.id} key={item.id} topic_info={topic_info} />)}
                        </SortableContext>
                    </DndContext>
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<FormattedMessage id="pages.common.des.empty" />} />
                }

                <Card
                    className='item'
                    bordered={false}
                    style={{ backgroundColor: `${this.overColor[(topic_info.topic_id - 1) % 4]}`, cursor: 'pointer', margin: '10px' }}
                    onClick={() => {
                        window.location.href = "/courseAdmin/courseManager?topic_title=" + topic_info.topic_title
                    }}
                >
                    <Row justify="center">
                        <Title level={5} style={{ color: 'grey', fontWeight: 'normal' }}>
                            <PlusOutlined />&nbsp;<FormattedMessage id="pages.courseList.newCourse" />
                        </Title>
                    </Row>
                </Card>
            </>
        );
    };
}