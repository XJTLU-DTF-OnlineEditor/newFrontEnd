import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Editor from './editor.jsx'
import Input from './input'
import Result from './result'
import './index.less'
import ProCard from '@ant-design/pro-card';
import PubSub from 'pubsub-js'

const { Sider, Content } = Layout;

export default function mainPage() {

    const [collapsed, setCollapsed] = useState(true)
    const [resCollapsed, setResCollapsed] = useState(true)

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }

    const onResCollapse = (rescol, type) => {
        setResCollapsed(rescol)
    }

    useEffect(() => {
        PubSub.subscribe('resCollapsed', (msg, data) => {
            setResCollapsed(data)
            setCollapsed(!data)
        })
    })


    return (

        <Layout>
            <Sider collapsible collapsed={collapsed} collapsedWidth='400px'
                width='565px' onCollapse={onCollapse}
                breakpoint="lg" layout="center"
            >
                <ProCard className='course' title="Course" ghost >
                    Course goes here
                </ProCard>
            </Sider>

            <Content>
                <ProCard className='edi_inp' direction="column" ghost layout="center" colSpan={12}>
                    <Editor />
                    <Input />
                </ProCard>
            </Content>

            <Sider collapsible collapsed={resCollapsed} onCollapse={onResCollapse} reverseArrow={true} collapsedWidth={0} >
                <ProCard ghost layout="center">
                    <Result />
                </ProCard>
            </Sider>
        </Layout>
    )
}