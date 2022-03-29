import React, { Component } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { DragSortTable } from '@ant-design/pro-table';
import { request } from 'umi';
import { deleteCourse, updateSubtopicId } from '@/services/course';
import { Popconfirm } from 'antd';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import './courseList.less';
import { Typography } from 'antd';

const { Title } = Typography;

export default class App extends Component {

    state = {
        selectedRowKeys: [],
        dataSource: []
    }


    getDataSource = async (params) => {
        // console.log(params, '=====');
        const topic_title = this.props.location.query.topic_title
        let result
        if (params.title) {
            result = await request(`/server/V1/course/search/?keyword=${params.title}`, {
                teacher_id: this.props.location.query.teacher_id
            });
        } else {
            result = await request(`/server/V1/course/courses/${topic_title}/`);
        }
        // console.log(result)

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
            return {
                data: course_list,
                success: true,
                total: course_list.length,
                "page": params.current
            }
        } else {
            return {
                success: false,
                "page": params.current
            }
        }

    }

    handleDragSortEnd = async(newDataSource) => {
        console.log('排序后的数据', newDataSource);
        const topic_title = this.props.location.query.topic_title

        const oldDataSource = this.state.dataSource
        let oldSeq = oldDataSource.map((i,index)=>{
            return {id: i.id, subtopic_id: index+1}
        })
        let newSeq = newDataSource.map((i,index)=>{
            return {id: i.id, subtopic_id: index+1}
        })
        let updateSeq = newSeq.filter((element, index)=>{
            return element.id != oldSeq[index].id
        })

        const res = await updateSubtopicId(topic_title, updateSeq)

        if(res.error_code==200){
            this.setState({dataSource: newDataSource});
            message.success('Modified course order successfully');
        }else{
            message.error('Failed to modify course order! ', res.msg);
        }

    };

    columns = [
        {
            title: 'INDEX',
            dataIndex: 'sort',
            hideInSearch: true,
            width: 60,
            render: (dom, rowData, index) => {
                return <span className="customRender">{`${index+1}`}</span>;
            },
        },
        {
            title: 'COURSE TITLE',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            filters: true,
            onFilter: true,
        },
        {
            title: 'UPDATED TIME',
            key: 'since',
            dataIndex: 'update_date',
            valueType: 'dateTime',
            hideInSearch: true,
        },
        {
            title: 'VIEWS',
            dataIndex: 'views',
            valueType: 'digit',
            width: 100,
            hideInSearch: true,
        },
        {
            title: 'OPERATIONS',
            key: 'option',
            valueType: 'option',
            render: (_, row, index, action) => [
                <a key="1" onClick={() => this.props.history.push('/courseAdmin/courseDisplay?topic_title=' + this.props.location.query.topic_title + '&id=' + row.id)}>view</a>,
                <a key="2" onClick={() => this.props.history.push('/courseAdmin/courseManager?topic_title=' + this.props.location.query.topic_title + '&id=' + row.id)}>edit</a>,
                <Popconfirm
                    title="Are you sure to delete the course?"
                    onConfirm={async () => {
                        const { table } = this
                        const result = await deleteCourse(this.props.location.query.topic_title, [row.id,]);
                        if (result['error_code'] == 200) {
                            message.success('Delete success');
                        } else {
                            message.error('Delete error');
                        }
                        table.reload();
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <a key="3">delete</a>
                </Popconfirm>

            ],
        },
    ];

    handleDelete = async () => {
        const { table } = this
        const { selectedRowKeys } = this.state;
        // console.log(selectedRowKeys)
        const result = await deleteCourse(this.props.location.query.topic_title, selectedRowKeys);
        if (result['error_code'] == 200) {
            message.success('Delete success');
        } else {
            message.error('Delete error');
        }
        table.reload();
    };


    render() {
        const topic_title = this.props.location.query.topic_title
        const onSelectChange = selectedRowKeys => {
            this.setState({ selectedRowKeys });
        };

        return (
            <PageContainer
                ghost
                onBack={() => this.props.history.push('/courseAdmin')}
                header={{
                    title: <Title level={2}>{topic_title}</Title>,
                }}
            >
                <ProCard>
                    <DragSortTable actionRef={c => this.table = c} columns={this.columns} request={async (params = {}) => this.getDataSource(params)} rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: onSelectChange,
                    }} editable={{
                        type: 'multiple',
                    }} columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'localStorage',
                    }} rowKey={"id"}
                        search={{
                            labelWidth: 'auto',
                            // filterType: 'light'
                        }} form={{
                            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                            syncToUrl: (values, type) => {
                                if (type === 'get') {
                                    return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                                }
                                return values;
                            },
                        }} pagination={{
                            pageSize: 10,
                        }} dateFormatter="string" headerTitle={"course list"} toolBarRender={() => [
                            <Popconfirm
                                title="Are you sure to delete the chosen courses?"
                                onConfirm={this.handleDelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="button" icon={<DeleteOutlined />} type="primary" danger disabled={this.state.selectedRowKeys.length == 0} >
                                    Delete
                                </Button>
                            </Popconfirm>,
                            <Button key="button" icon={<PlusOutlined />} type="primary">
                                <a href={"/courseAdmin/courseManager?topic_title=" + topic_title} rel="noopener noreferrer" key="view" style={{ color: 'inherit' }}>
                                    New
                                </a>
                            </Button>,
                        ]} dragSortKey="sort" dataSource={this.state.dataSource} onDragSortEnd={this.handleDragSortEnd}
                    />
                </ProCard>
            </PageContainer>

        );
    };
}