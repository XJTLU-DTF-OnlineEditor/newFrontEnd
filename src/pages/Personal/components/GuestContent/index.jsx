import ProCard from "@ant-design/pro-card";
import React from "react";
import {CheckCircleOutlined, RightOutlined} from "@ant-design/icons";
import {Tag} from "antd";
import {useHistory} from "react-router-dom";
import { setLocale, getLocale, FormattedMessage } from 'umi';

function GuestContent(props) {
  const history = useHistory()
    return(
      <div>
        <ProCard gutter={[0,8]} ghost direction='column'>
          <ProCard
            layout="center"
            bordered
            hoverable
            split="vertical"
            onClick={() => {
              history.push('/user/login')
            }}>
            <ProCard colSpan="50%" ghost>
              <center>
                <font face="verdana">
                  <cnter>
                    {/*登录来使用全部功能*/}
                    {<FormattedMessage id="pages.guest.allFunc" />}
                  </cnter>
                  <RightOutlined />
                </font>
              </center>
            </ProCard>
            <ProCard>
              <center>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Online editor
                </Tag>
                <Tag icon={<CheckCircleOutlined/>} color="error">
                  Progress track
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="processing">
                  Personal Recommendation
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="warning">
                  Up-to-date courses
                </Tag>
              </center>
            </ProCard>
          </ProCard>
          <ProCard
            layout="center"
            bordered
            hoverable
            split="vertical"
            onClick={() => {
              props.history.push('/user/login')
            }}>
            <ProCard colSpan="50%" ghost >
              <center>
                <font face="verdana">
                  <cnter>
                     {/*线上编辑器体验*/}
                     {<FormattedMessage id="pages.guest.experience" />}
                  </cnter>
                  <RightOutlined />
                </font>
              </center>
            </ProCard>
            <ProCard>
              <center>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Interactive
                </Tag>
                <Tag icon={<CheckCircleOutlined/>} color="error">
                  Integrated Dependencies
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="processing">
                  Get compilation results in real time
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="warning">
                  Customized Dependencies
                </Tag>
              </center>
            </ProCard>
          </ProCard>
        </ProCard>
      </div>
    )
}

export default GuestContent;
