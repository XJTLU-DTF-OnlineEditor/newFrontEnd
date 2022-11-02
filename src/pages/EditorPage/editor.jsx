import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
// ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint.js';
// 代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 补全括号
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike'; // java: text/x-java
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python.js'; // python
import 'codemirror/mode/properties/properties.js';
// 全屏显示
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  SettingOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import { Button, message, Tabs } from 'antd';
import React, { Component } from 'react';
import { run_interactive, terminate } from '@/services/editor';
import PubSub from 'pubsub-js';
import { nanoid } from 'nanoid';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { currentUser } from '@/services/ant-design-pro/api';

const { TabPane } = Tabs;

export default class Editor extends Component {
  state = {
    id: '',
    isFullScreen: false,
    disable: false,
    input: '',
    activeKey: '0',
    panes: [
      {
        title: 'main.py',
        content: '',
        key: '0',
        closable: false,
        lang: 'python',
        placeholder:
          /*'code goes here'*/ getLocale() == 'zh-CN' ? '代码输入区...' : 'code goes here',
      },
      {
        title: 'requirements.txt',
        content: '',
        key: '1',
        closable: false,
        lang: 'properties',
        placeholder:
          "To add dependencies of the program as the following format:\n'''\nmatplotlib\npython-dateutil>=2.7\ncycler==0.10\nsix>=1.5\n'''",
      },
    ],
    modalVisit: false,
  };
  rootRef = React.createRef();
  ws = React.createRef(null);
  restFormRef = React.createRef();
  flag = 0;

  componentDidMount() {
    PubSub.subscribe('editor', (msg, data) => {
      this.setState(data);
    });

    PubSub.subscribe('newFile', (msg, data) => {
      console.log(data);
      this.setState({
        panes: [
          ...this.state.panes,
          {
            title: data.filename,
            content: data.content,
            key: String(this.state.panes.length - 1),
            closable: true,
            lang: 'python',
          },
        ],
      });
    });

    PubSub.subscribe('ws', (msg, data) => {
      if (data.ws != this.ws.current) {
        this.ws.current = data.ws;
        if (data.ws === 1) this.runcode();
      }
    });

    window.onresize = () => {
      if (document.fullscreenElement) {
        this.setState({ isFullScreen: true });
      } else {
        this.setState({ isFullScreen: false });
      }
    };
  }

  // fullscreen button
  fullScreen = () => {
    if (!this.state.isFullScreen) {
      this.rootRef.current.requestFullscreen();
    }
  };

  exitFullScreen = () => {
    document.exitFullscreen();
  };

  // start & stop run
  handeleRun = () => {
    if (this.state.id) {
      //运行
      this.terminate();
    } else {
      // 终止
      const id = nanoid().replace(/-/g, '');
      PubSub.publish('id', { id });
      this.setState({ id });
    }
  };

  runcode = async () => {
    let result;
    const { id, panes } = this.state;

    let filelist = panes.map((file) => {
      return { title: file.title, content: file.content, id: file.key };
    });
    result = await run_interactive(
      id,
      panes[0].lang,
      filelist,
      this.props.courseid,
      this.props.currentUser.userid,
    );

    if (result.error_code != 200) {
      message.error(result.msg);
    }
  };

  terminate = async () => {
    this.setState({ disable: true });
    const result = await terminate(this.state.id);

    if (result.error_code !== 200) {
      message.error('Something wrong happens. Please try again later');
    }

    PubSub.publish('id', { id: '' });
    this.setState({ id: '' });
    this.ws.current = 0;

    setTimeout(() => {
      this.setState({ disable: false });
    }, 1000);
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    console.log(action, targetKey);
    this[action](targetKey);
  };

  add = () => {
    this.setState({ modalVisit: true });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    // 功能按钮
    const { id, disable, isFullScreen, modalVisit } = this.state;
    const operations = (
      <>
        <Button
          ghost
          type="primary"
          disabled={disable}
          onClick={this.handeleRun}
          icon={id ? <PauseOutlined /> : <CaretRightOutlined />}
        >
          {id ? 'Edit' : 'Run'}
        </Button>
        {/* <Button icon={<SettingOutlined />} /> */}
        {isFullScreen ? (
          <Button icon={<FullscreenExitOutlined />} onClick={this.exitFullScreen} />
        ) : (
          <Button icon={<FullscreenOutlined />} onClick={this.fullScreen} />
        )}
      </>
    );

    const { panes, activeKey } = this.state;

    if (this.props.code && this.flag == 0) {
      let iniPanes = this.state.panes;
      iniPanes[0].content = this.props.code;
      console.log(iniPanes, this.props.code, 99999);
      this.setState({ panes: iniPanes });
      this.flag = 1;
    }

    return (
      <>
        <ModalForm
          title=/*"new file"*/ {<FormattedMessage id="pages.editor.newFile" />}
          visible={modalVisit}
          formRef={this.restFormRef}
          width="500px"
          onVisibleChange={(value) => this.setState({ modalVisit: value })}
          submitter={{
            searchConfig: {
              submitText: /*'confirm'*/ <FormattedMessage id="pages.common.confirm" />,
              resetText: /*'cancel'*/ <FormattedMessage id="pages.common.cancel" />,
            },
            resetButtonProps: {
              onClick: () => {
                this.restFormRef.current?.resetFields();
                this.setState({ modalVisit: false });
              },
            },
          }}
          onFinish={async (values) => {
            const activeKey = `${panes.length}`;
            const newPanes = [...panes];
            newPanes.push({
              title: values.filename,
              content: '',
              key: activeKey,
              lang: values.lang,
              closable: true,
              placeholder:
                /*'code goes here'*/ getLocale() == 'zh-CN' ? '代码输入区' : 'code goes here',
            });
            this.setState({
              panes: newPanes,
              activeKey,
              modalVisit: false,
            });
            this.restFormRef.current?.resetFields();
          }}
        >
          <ProFormText
            width="md"
            name="filename"
            label=/*"filename"*/ {<FormattedMessage id="pages.editor.filename" />}
            placeholder=/*"please input the filename"*/ {
              getLocale() == 'zh-CN' ? '请输入新建的文件名' : 'please input the filename'
            }
          />
          <ProFormSelect
            name="lang"
            label=/*"lang"*/ {<FormattedMessage id="pages.editor.lang" />}
            valueEnum={{
              python: 'python',
              java: 'java',
              c: 'c',
              'c++': 'c++',
              shell: 'shell',
              properties: 'properties',
              css: 'css',
            }}
            initialValue={this.state.panes[0].lang}
            width="sm"
            placeholder="Please select a programme language"
            rules={[{ required: true, message: 'Please select a programme language!' }]}
          />
        </ModalForm>
        <Tabs
          type="editable-card"
          onChange={this.onChange}
          activeKey={activeKey}
          onEdit={this.onEdit}
          tabBarExtraContent={operations}
          id="codeeditor"
        >
          {panes.map((pane) => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              <div ref={this.rootRef}>
                <CodeMirror
                  className="editor"
                  value={pane.content}
                  options={{
                    mode: pane.lang,
                    theme: 'darcula',
                    autofocus: true, // 自动获取焦点
                    styleActiveLine: true, // 光标代码高亮
                    lineNumbers: true, // 显示行号
                    smartIndent: true, // 自动缩进
                    // start-设置支持代码折叠
                    lineWrapping: true,
                    foldGutter: true,
                    placeholder: pane.placeholder,
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
                    matchBrackets: true, // 括号匹配，光标旁边的括号都高亮显示
                    autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
                    fullScreen: isFullScreen, // 全屏显示
                    scrollbarStyle: 'simple',
                    cursorScrollMargin: 5,
                    extraKeys: {
                      Ctrl: 'autocomplete',
                      'Ctrl-S': function (editor) {
                        editor.codeSave(editor);
                      },
                      'Ctrl-Z': function (editor) {
                        editor.undo();
                      },
                      F8: function (editor) {
                        editor.redo();
                      },
                    },
                  }}
                  onBeforeChange={(editor, data, value) => {
                    let prevPanes = panes;
                    prevPanes[parseInt(pane.key)].content = value;
                    this.setState({ panes: [...prevPanes] });
                  }}
                />
              </div>
            </TabPane>
          ))}
        </Tabs>
      </>
    );
  }
}
