/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Col, Typography, Space, Row, Popconfirm, message, Alert } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, MenuOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import './courseList.less'
const { Text, Link } = Typography;
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { deleteCourse } from '@/services/course';
import { Popover, Button } from 'antd';

export function SortableItem(props) {

  const [isOver, setIsOver] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    margin: '10px'
  };

  const color = ['#7193f1', '#ffda6c', '#00bcd4', '#ef769f']
  const overColor = ['#7193f122', '#ffda6c22', '#00bcd422', '#ef769f22']

  const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );


  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} onMouseEnter={() => { setIsOver(true) }} onMouseLeave={() => { setIsOver(false) }}>

        <Card bordered={false} className='item' style={{
          borderLeft: `3px solid ${color[(props.topic_info.topic_id - 1) % 4]}`,
          backgroundColor: isOver ? `${overColor[(props.topic_info.topic_id - 1) % 4]}` : 'white',
          // padding: '15px'
        }}>
          <Space>
            <MenuOutlined style={{ cursor: 'grab', color: `${color[(props.topic_info.topic_id - 1) % 4]}` }} />&nbsp;
            <Text style={{ color: color[(props.topic_id - 1) % 4] }}>{props.id}</Text>
            {props.item.title}&nbsp;
          </Space>

          <Space style={{ float: 'right', display: isOver ? 'inline-flex' : 'none' }}>
            <a href={'/courseAdmin/courseManager?topic_title=' + props.topic_info.topic_title + '&id=' + props.id}>
              <span>
                {React.createElement(EyeOutlined, { style: { marginRight: 8 } })}
                <FormattedMessage id="pages.common.view" />
              </span>
            </a>

            <a href={'/courseAdmin/courseManager?topic_title=' + props.topic_info.topic_title + '&id=' + props.id}>
              <span>
                {React.createElement(EditOutlined, { style: { marginRight: 8 } })}
                <FormattedMessage id="pages.common.edit" />
              </span>
            </a>

            <Popover
              content={
                <div>
                  <Row>
                    <span>
                      <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8 }} />
                      {/* {React.createElement(WarningOutlined, { style: { marginRight: 8, twoToneColor: "#eb2f96" } })} */}
                      <FormattedMessage id='pages.des.del' />
                    </span>
                  </Row>
                  <Row justify="end">
                    <Space>
                      {/* <Button type='default' size='small'><FormattedMessage id="pages.common.no" /></Button> */}
                      <Button type="primary" size='small' onMouseUp={async () => {
                        // const { table } = this
                        const result = await deleteCourse(props.topic_info.topic_title, [props.id,]);
                        if (result['error_code'] == 200) {
                          message.success('Delete success');
                          PubSub.publish('update', true);
                        } else {
                          message.error('Delete error');
                        }
                        // table.reload();
                      }}><FormattedMessage id="pages.common.yes" /></Button>
                    </Space>
                  </Row>
                </div>
              }
            >
              <a>
                <span>
                  {React.createElement(DeleteOutlined, { style: { marginRight: 8 } })}
                  <FormattedMessage id="pages.common.delete" />
                </span>
              </a>
            </Popover>
          </Space>
        </Card>
      </div>
    </>
  );
}