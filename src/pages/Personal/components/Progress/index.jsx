import { message, Button, List, Progress, Steps, Table, Tag } from 'antd';
import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { removeUserProgress } from '@/services/course/api';
import { useHistory } from 'react-router-dom';

function CourseProgress(props) {
  console.log(props.history);
  const { Step } = Steps;
  const [responsive, setResponsive] = useState(false);
  const history = useHistory();
  let [courses, setCourses] = useState([]);
  courses = props.history;

  return (
    <div>
      {courses.length === 0 && (
        <ProCard
          layout="center"
          bordered
          hoverable
          split="vertical"
          onClick={() => {
            history.push('/courses/');
          }}
        >
          <ProCard colSpan="50%" ghost>
            <center>
              <font face="verdana">
                <cnter>开始学习课程以记录进度</cnter>
                <RightOutlined />
              </font>
            </center>
          </ProCard>
          <ProCard>
            <center>
              <Tag icon={<CheckCircleOutlined />} color="error">
                Progress track
              </Tag>
              <Tag icon={<CheckCircleOutlined />} color="warning">
                Up-to-date courses
              </Tag>
            </center>
          </ProCard>
        </ProCard>
      )}
      {/*如果课程长度不为0，遍历出课程，Unfinished course 为未完成课程， finished course为完成的课程*/}
      {courses.map((item, index) => {
        const unfinished_course = [];
        const finished_course = [];
        item.unfinished_courses.map((item, index) => {
          unfinished_course.push({
            id: index,
            href: '',
            title: { item },
          });
        });
        item.finished_courses.map((item, index) => {
          finished_course.push({
            id: index,
            href: '',
            title: { item },
          });
        });
        return (
          <ProCard
            layout="center"
            bordered
            collapsible
            title={<font face="verdana">{item.topic}</font>}
            split="vertical"
            extra={
              <Progress
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={
                  (100 * parseInt(item.progress.substr(0, 1))) /
                  parseInt(item.progress.substr(2, 1))
                }
                width={50}
              />
            }
          >
            <ProCard colSpan="20%" ghost>
              <center>
                <div>last practice time: {item.last_practice_time.substr(0, 10)}</div>
                <div>last practice time: {item.last_practice_time.substr(0, 10)}</div>
                <div>
                  <Button
                    style={{ marginTop: '5%' }}
                    type="primary"
                    onClick={() => {
                      history.push(`/course/exercise/${item.topic}/${item.progress_course.id}`);
                      console.log('click');
                    }}
                  >
                    resume
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ marginTop: '5%' }}
                    type="primary"
                    onClick={async () => {
                      const msg = await removeUserProgress({ topic: item.topic });
                      console.log(msg);
                      if (msg.error_code === 200) {
                        message.success('remove progress success!');
                        courses.map((course_item, index) => {
                          if (course_item.topic === item.topic) {
                            let list = courses;
                            console.log(course_item.topic);
                            setCourses(courses.splice(index, 1));
                          }
                        });
                      }
                    }}
                  >
                    remove
                  </Button>
                </div>
              </center>
            </ProCard>
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard ghost split="horizontal">
                <ProCard>
                  <Steps progressDot current={1}>
                    <Step title="In Progress" />
                    <Step title="Finished" />
                    <Step title="Waiting" />
                  </Steps>
                </ProCard>
                <ProCard split="vertical">
                  <ProCard>
                    <center>
                      <HistoryOutlined style={{ marginRight: 10 }} />
                      <a href={`/course/exercise/${item.topic}/${item.progress_course.id}`}>
                        {item.progress_course.title}
                      </a>
                    </center>
                  </ProCard>
                  <ProCard>
                    {finished_course.length >= 1 && (
                      <List
                        itemLayout="vertical"
                        size="small"
                        pagination={{
                          onChange: (page) => {
                            console.log(page);
                          },
                          pageSize: 3,
                        }}
                        dataSource={finished_course}
                        renderItem={(item) => (
                          <List.Item>
                            <CheckCircleOutlined style={{ marginRight: 5 }} />
                            {item.title.item}
                          </List.Item>
                        )}
                      />
                    )}
                    {finished_course.length === 0 && <div>continue to work on present aims!</div>}
                  </ProCard>
                  <ProCard>
                    <List
                      itemLayout="vertical"
                      size="small"
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                      dataSource={unfinished_course}
                      renderItem={(item) => (
                        <List.Item>
                          <ClockCircleOutlined style={{ marginRight: 5 }} />
                          {item.title.item}
                        </List.Item>
                      )}
                    />
                  </ProCard>
                </ProCard>
              </ProCard>
            </RcResizeObserver>
          </ProCard>
        );
      })}
    </div>
  );
}

export default CourseProgress;
