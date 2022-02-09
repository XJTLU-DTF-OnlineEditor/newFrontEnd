import React, { Component } from 'react';
import { PageHeader, Button, Descriptions } from 'antd';
import { BarsOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import ProCard from '@ant-design/pro-card';
import { getExerciseList, getCourseDetail } from '@/services/course';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

export default class Exercises extends Component {
  state = {
    topic_title: '',
    exercise_list: [],
    id: 1,
    update_date: '',
    views: '',
    exercise_title: '',
    exercise_content: '',
  };

  componentDidMount() {
    // 获取目录 & 初始化课程内容
    this.getCatalog();
  }

  getCatalog = async () => {
    // 获取目录
    const { url_params } = this.props;
    let { id, topic_title } = url_params;
    const { exercise_list } = await getExerciseList(topic_title);
    // console.log(exercise_list + "==============")
    this.setState({ id, exercise_list, topic_title });
    // 初始化课程
    this.getExercise(id);
  };

  getExercise = async (id) => {
    this.props.history.push(`${id}`);
    const exercise = await getCourseDetail(id);
    // console.log(exercise + "===========")

    // topic_title, exercise_title, exercise_content, update_date, views
    this.setState(exercise);
  };

  render() {
    let { topic_title, update_date, views, exercise_list, id, exercise_title, exercise_content } = this.state;
    // let exercise_content_html = exercise_content
    //   .replace(('\n', '<br />'))
    //   .replace(/#eeeeee/g, '#808080');

    // // console.log(exercise_content_html)
    // exercise_content_html = <div dangerouslySetInnerHTML={{ __html: exercise_content_html }} />;
    id = JSON.parse(id);

    const menu = (
      <Menu
        onClick={({ key }) => this.getExercise(+key)}
      // defaultSelectedKeys={[id - 1]}
      >
        {exercise_list.map((item) => (
          <Menu.Item key={item.id}>
            <a target="_blank">{item.title}</a>
          </Menu.Item>
        ))}
      </Menu>
    );

    const renderContent = (column = 3) => (
      <Descriptions size="middle" column={column}>
        <Descriptions.Item label="related topic">{topic_title}</Descriptions.Item>
        <Descriptions.Item label="update date">{update_date}</Descriptions.Item>
        <Descriptions.Item label="views">
          <a>{views}</a>
        </Descriptions.Item>
      </Descriptions>
    );

    return (
      <div>
        <PageHeader
          className="site-page-header-responsive course"
          onBack={() => this.props.history.push('/')} // 返回上级目录
          title={exercise_title}
          ghost
          extra={[
            <Button key="3" onClick={() => this.getExercise(id - 1)} disabled={id - 1 < 1}>
              <ArrowLeftOutlined />
              last exercise
            </Button>,
            <Button
              key="2"
              onClick={() => this.getExercise(id + 1)}
              disabled={id + 1 > exercise_list.length}
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
          <Content>{renderContent()}</Content>
        </PageHeader>
        <ProCard style={{ height: 600 }} className={'course'} ghost>
          <CKEditor
            editor={ClassicEditor}
            disabled={true}
            data={this.state.exercise_content}
            config={{
              toolbar: {
                items: [],
              },
            }}
            onError={({ willEditorRestart }) => {
              // If the editor is restarted, the toolbar element will be created once again.
              // The `onReady` callback will be called again and the new toolbar will be added.
              // This is why you need to remove the older toolbar.
              if (willEditorRestart) {
                this.editor.ui.view.toolbar.element.remove();
              }
            }}
          />
        </ProCard>
      </div>
    );
  }
}
