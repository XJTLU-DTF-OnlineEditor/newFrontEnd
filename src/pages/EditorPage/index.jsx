import React, { useEffect, useState } from 'react';
import Editor from './editor.jsx';
import { BarsOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ResultSection from './result.jsx';
import ProCard from '@ant-design/pro-card';
import { Dropdown, Menu, Descriptions, Button, message, Typography, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getCourseDetail, getExerciseList } from '@/services/course.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import './custom-dark.css';
import './index.less';
import moment from 'moment';
import { useModel } from 'umi';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { changeCourseProgress } from '@/services/course/api.js';

const { Text, Paragraph, Title } = Typography;

export default function MainPage(props) {
  const [course_list, setCourse_list] = useState([]);
  const [topic_title, setTopic_title] = useState('');
  const [courseDetail, setCourseDetail] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    getCatalog();
    handleCourseProgress();
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

  const handleCourseProgress = async () => {
    let { id, related_topic } = props.match.params;
    const msg = await changeCourseProgress({
      topic: related_topic,
      course_id: id,
      last_practice_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  const getExercise = async (topic_title, id) => {
    props.history.push(`${id}`);
    const res = await getCourseDetail(topic_title, id);
    if (res.error_code == 200) {
      console.log(res.data, 9999);
      setCourseDetail(res.data);
    } else {
      message.error(res.msg);
    }
  };

  const menu = (
    <Menu onClick={({ key }) => getExercise(topic_title, +key)}>
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
    <PageContainer
      overlayClassName="editorpage"
      ghost
      minHeight="800px"
      header={{
        title: <Title>{courseDetail.title}</Title>,
        breadcrumb: {},
      }}
      // onBack={() => props.history.go(-1)}
      extra={[
        <Button
          key="3"
          onClick={() => getExercise(topic_title, courseDetail.id - 1)}
          disabled={courseDetail.id - 1 < 1}
        >
          <ArrowLeftOutlined />
          {/* last exercise */} <FormattedMessage id="pages.editor.last" />
        </Button>,
        <Button
          key="2"
          onClick={() => getExercise(topic_title, courseDetail.id + 1)}
          disabled={courseDetail.id + 1 > course_list.length}
        >
          {/* next exercise */} <FormattedMessage id="pages.editor.next" />
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
      <ProCard
        ghost
        gutter={15}
        // style={{ minHeight: 1000 }}
        split="vertical"
        //  className={`custom-dark`}
      >
        <ProCard
          colSpan={5}
          //  style={{ minHeight: 600 }}
          className={'course'}
          ghost
        >
          <Divider style={{ margin: 0 }} />
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

          <Typography>
            <Text type="secondary" /*"RELATED TOPIC"*/>
              <FormattedMessage id="pages.common.relatedTopic" />:{topic_title}
            </Text>
            <br />
            <Text type="secondary" /*"UPDATE DATE"*/>
              <FormattedMessage id="pages.common.updateDate" />:{courseDetail.update_date}
            </Text>
            <br />
            <Text type="secondary" /*"VIEWS"*/>
              <FormattedMessage id="pages.common.views" />:{courseDetail.views}
            </Text>
          </Typography>
        </ProCard>
        {/* 代码运行 */}
        <ProCard ghost colSpan={13}>
          <Editor
            currentUser={initialState.currentUser}
            courseid={props.match.params.id}
            code={courseDetail?.code}
          />
        </ProCard>
        <ProCard ghost colSpan={6}>
          <ResultSection
            hint={courseDetail?.hint}
            related_topic={props.match.params.related_topic}
            id={props.match.params.id}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}
