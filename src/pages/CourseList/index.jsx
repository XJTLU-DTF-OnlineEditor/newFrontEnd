import React, { Component } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { request } from 'umi';
import { deleteCourse } from '@/services/course';

export default class App extends Component {

    state = {
        selectedRowKeys: []
    }

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
        },
        {
            title: 'RELATED TOPIC',
            dataIndex: 'topic_title',
            copyable: true,
            filters: true,
            onFilter: true,
            formItemProps: {
                rules: [
                    {
                        message: 'This parameter is mandatory',
                    },
                ],
            },
        },
        {
            title: 'UPDATED TIME',
            key: 'since',
            dataIndex: 'update_date',
            valueType: 'dateTime',
            sorter: (a, b) => a.update_date - b.update_date,
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
                <a key="1" onClick={()=>this.props.history.push('/courseDisplay?id='+row.id)}>view</a>,
                <a key="2" onClick={()=>this.props.history.push('/courseManager?id='+row.id)}>edit</a>,
                <a key="3" onClick={async ()=>{
                    const {table} = this
                    const result = await deleteCourse([row.id,]);
                    if (result['error_code'] == 200) {
                        message.success('Delete success');
                    } else {
                        message.error('Delete error');
                    }
                    table.reload();
                }}>delete</a>
            ],
        },
    ];

    handleDelete = async () => {
        const {table} = this
        const { selectedRowKeys } = this.state;
        console.log(selectedRowKeys)
        const result = await deleteCourse(selectedRowKeys);
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

        return (
            <ProTable actionRef={c => this.table = c} columns={this.columns} request={async (params = {}, sort, filter) => {
                console.log(sort, filter, params, '=====');
                // const result = request(`/server/V1/course/exercises?${teacher_id}`);
                params = { ...params, teacher_id: this.props.location.query.teacher_id }
                const result = await request(`/server/V1/course/exercises`, {
                    params
                });
                result.data.forEach(element => {
                    element['update_date'] = new Date(element['update_date'].replace('-', '/'));
                });
                return {
                    data: result.data,
                    success: true,
                    total: result.data.length,
                    "page": params.current
                }
            }} rowSelection={{
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: onSelectChange,
                // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                // 注释该行则默认不显示下拉选项
                //selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
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
                }} dateFormatter="string" headerTitle="Course List" toolBarRender={() => [
                    <Button key="button" icon={<DeleteOutlined />} type="primary" danger disabled={this.state.selectedRowKeys.length == 0} onClick={this.handleDelete}>
                        Delete
                    </Button>,
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        <a href={"/courseManager"} rel="noopener noreferrer" key="view" style={{ color: 'inherit' }}>
                            New
                        </a>
                    </Button>,
                ]} />);
    };
}