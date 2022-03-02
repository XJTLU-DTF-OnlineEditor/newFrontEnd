import React, { Component } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { request } from 'umi';
import { deleteCourse } from '@/services/course';
import { Popconfirm } from 'antd';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';

export default class App extends Component {

    state = {
        selectedRowKeys: [],
    }

    // componentDidMount = ()=>{
    //     // console.log(this.props)
    // }

    columns = [
        {
            title: 'COURSE TITLE',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            filters: true,
            onFilter: true,
            formItemProps: {
                rules: [
                    {
                        message: 'This parameter is mandatory',
                    },
                ],
            },
            render: (i,row) => <a style={{textDecoration:'none', color:'black'}}
                onClick={() => this.props.history.push('/courseDisplay?topic_title=' + this.props.location.query.topic_title + '&id=' + row.id)}>
                {i}
            </a>
        },
        {
            title: 'UPDATED TIME',
            key: 'since',
            dataIndex: 'update_date',
            valueType: 'dateTime',
            sorter: (a, b) => a.update_date - b.update_date,
            hideInSearch: true,
        },
        {
            title: 'VIEWS',
            dataIndex: 'views',
            valueType: 'digit',
            sorter: (a, b) => a.views - b.views,
            hideInSearch: true,
        },
        {
            title: 'OPERATIONS',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_, row, index, action) => [
                <a key="1" onClick={() => this.props.history.push('/courseDisplay?topic_title=' + this.props.location.query.topic_title + '&id=' + row.id)}>view</a>,
                <a key="2" onClick={() => this.props.history.push('/courseManager?topic_title=' + this.props.location.query.topic_title + '&id=' + row.id)}>edit</a>,
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
        console.log(selectedRowKeys)
        const result = await deleteCourse(this.props.location.query.topic_title, selectedRowKeys);
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

        const topic_title = this.props.location.query.topic_title
        return (
            <PageContainer
                ghost
                onBack={() => this.props.history.push('/courseAdmin')}
                header={{
                    title: 'Course List',
                }}
            >
                <ProCard>
                    <ProTable actionRef={c => this.table = c} columns={this.columns} request={async (params = {}, sort, filter) => {
                        console.log(sort, filter, params, '=====');
                        // const result = request(`/server/V1/course/coursesByTeacher`);
                        let result
                        if(params.title){
                            params = { teacher_id: this.props.location.query.teacher_id }
                            result = await request(`/server/V1/course/search?keyword=${params.title}`,{
                                params
                            });
                        }else{
                            result = await request(`/server/V1/course/courses/${topic_title}`);
                        }
                        if(result.error_code==200){
                            result.course_list.forEach(element => {
                                element['update_date'] = new Date(element['update_date'].replace('-', '/'));
                            });
                            return {
                                data: result.course_list,
                                success: true,
                                total: result.course_list.length,
                                "page": params.current
                            }
                        }else{
                            return {
                                success: false,
                                "page": params.current
                            } 
                        }
                        
                    }} rowSelection={{
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
                        }} dateFormatter="string" headerTitle={"【TOPIC TITLE】" + topic_title} toolBarRender={() => [
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
                                <a href={"/courseManager?topic_title=" + topic_title} rel="noopener noreferrer" key="view" style={{ color: 'inherit' }}>
                                    New
                                </a>
                            </Button>,
                        ]} />
                </ProCard>
            </PageContainer>

        );
    };
}