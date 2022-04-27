import {message, Card, Tag} from 'antd';
import { useHistory } from "react-router-dom";
import React, {useState} from 'react';
import {
  CheckCircleOutlined,
  CloseOutlined,
  PlayCircleOutlined, RightOutlined,
} from "@ant-design/icons";
import ProCard from "@ant-design/pro-card";
import {deleteCollection} from "@/services/course/api";
import { setLocale, getLocale, FormattedMessage } from 'umi';

const {Meta} = Card;

function Collected (props){
  console.log(props.collection)
  const history = useHistory();
  let [collection, setCollection] = useState([]);
  collection = props.collection
  // console.log(collection)
  return(
    <ProCard
      style={{marginTop: 8}}
      gutter={[8, 16]}
      wrap
    >
      {collection.length === 0 && (
        <ProCard
          layout="center"
          bordered
          hoverable
          split="vertical"
          onClick={() => {
            history.push('/courses/')
          }}>
          <ProCard colSpan="50%" ghost>
            <center>
              <font face="verdana">
                <cnter>
                  {/*收藏课程以方便随时查看*/}{<FormattedMessage id="pages.personal.des.collections" />}
                </cnter>
                <RightOutlined />
              </font>
            </center>
          </ProCard>
          <ProCard>
            <center>
              <Tag icon={<CheckCircleOutlined />} color="processing">
                {/*Personal Collection*/}{<FormattedMessage id="pages.personal.des.personalCollection" />}
              </Tag>
            </center>
          </ProCard>
        </ProCard>
      )}
      {collection.map((item, index) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ProCard
            colSpan="50%"
            layout="default"
            bordered
            actions={[
              <PlayCircleOutlined key="setting" onClick={() => {
                history.push(`/course/exercise/${item.topic_title}`)
              }} />,
              <CloseOutlined key="close" onClick={async () => {
                const msg = await deleteCollection({topic: item.topic_title});
                console.log(msg)
                if (msg.error_code === 200) {
                  message.success("delete collection success!")
                  collection.map((collection_item, index) => {
                    if (collection_item.topic_title === item.topic_title) {
                      let list = collection
                      console.log(collection_item.topic_title)
                      setCollection(list.splice(index,1))
                    }
                  })
                  console.log(collection)
                } else if (msg.error_code === 204) {
                  message.error("user collection not found!")
                }
              }} />
            ]}
           >
            <Card
              bordered={false}
              cover={<img alt={item.topic_title} src={item.topic_img}/>}
            >
              <Meta style={{marginBottom: "1%"}} title={item.topic_title} description={item.topic_content} />
              <font size="1" face="verdana">collect time: {item.collection_time.substr(0, 10)}</font>
            </Card>
          </ProCard>
        )
      })}
    </ProCard>
  )
}

export default Collected;
