import React, { useEffect, useState } from 'react';
import Editor from './editor.jsx';
import { BarsOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Input from './input.jsx';
import ResultSection from './result.jsx';
import ProCard from '@ant-design/pro-card';
import { Dropdown, Menu, Descriptions, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getCourseDetail, getExerciseList } from '@/services/course.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography } from 'antd';
import './custom-dark.css'
import './index.less';

const { Title } = Typography;

export default function MainPage(props) {
  const [course_list, setCourse_list] = useState([]);
  const [topic_title, setTopic_title] = useState('');
  const [courseDetail, setCourseDetail] = useState({});


  useEffect(() => {
    getCatalog();
  }, []);

  const getCatalog = async () => {
    // 获取目录
    let { id, related_topic } = props.match.params;
    let { course_list } = await getExerciseList(related_topic);
    course_list = course_list.map((i) => {
      let courses = i.fields;
      courses.id = i.pk;
      return courses;
    });

    setCourse_list(course_list);
    setTopic_title(related_topic);
    // 初始化课程
    getExercise(related_topic, id);
  };

  const getExercise = async (topic_title, id) => {
    props.history.push(`${id}`);
    const res = await getCourseDetail(topic_title, id);
    if (res.error_code == 200) {
      setCourseDetail(res.data);
    } else {
      message.error(res.msg);
    }
  };

  const menu = (
    <Menu
      onClick={({ key }) => getExercise(topic_title, +key)}
    >
      {typeof course_list == 'object'
        ? course_list.map((item) => (
            <Menu.Item key={item.id}>
              <a target="_blank">{item.title}</a>
            </Menu.Item>
          ))
        : []}
    </Menu>
  );

  return (
    <PageContainer overlayClassName='editorpage'
      ghost
      minHeight="800px"
      header={{
        title: <Title>{courseDetail.title}</Title>,
        breadcrumb: {},
      }}
      // onBack={() => props.history.go(-1)}
      content={
        <Descriptions size="middle" column={3}>
          <Descriptions.Item label="related topic">{topic_title}</Descriptions.Item>
          <Descriptions.Item label="update date">{courseDetail.update_date}</Descriptions.Item>
          <Descriptions.Item label="views">
            <a>{courseDetail.views}</a>
          </Descriptions.Item>
        </Descriptions>
      }
      extra={[
        <Button
          key="3"
          onClick={() => getExercise(topic_title, courseDetail.id - 1)}
          disabled={courseDetail.id - 1 < 1}
        >
          <ArrowLeftOutlined />
          last exercise
        </Button>,
        <Button
          key="2"
          onClick={() => getExercise(topic_title, courseDetail.id + 1)}
          disabled={courseDetail.id + 1 > course_list.length}
        >
          next exercise
          <ArrowRightOutlined />
        </Button>,
        <Dropdown key="1" overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Button>
              <BarsOutlined />
            </Button>
          </a>
        </Dropdown>,
      ]}
    >
      {/* 课程展示 */}
      <ProCard ghost gutter={15} style={{ minHeight: 1000 }} className={`custom-dark`}>
        <ProCard
          colSpan={8}
          style={{ minHeight: 600}}
          className={'course'}
          ghost
        >
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
              if (willEditorRestart) {
                this.editor.ui.view.toolbar.element.remove();
              }
            }}
          />
        </ProCard>
        {/* 代码运行 */}
        <ProCard ghost colSpan={11}>
          <Editor />
          <Input />
        </ProCard>
        <ProCard ghost colSpan={5}>
          <ResultSection />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}
