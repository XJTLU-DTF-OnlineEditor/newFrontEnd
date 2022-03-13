import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
import React, { Component } from 'react';
import { Select } from 'antd';
import { run } from '@/services/editor';
import ProCard from '@ant-design/pro-card';
import PubSub from 'pubsub-js';
import { nanoid } from 'nanoid';

const { Option } = Select;

export default class Input extends Component {
  state = {
    id: '',
    prev_input: '',  // 上一次docker input文件内容
    old_input: '',  // 未输入前input区域的内容
    input: '',  // input区域的内容
    inputType: 'Interactive',
    need_input: false,
    showInputarea: 'none',
    noeditarea: 0,
    lang: 'python',
  };

  componentDidMount() {
    PubSub.subscribe('input', (msg, data) => {
      const { need_input, input, id } = data
      this.setState({ input, prev_input: input, need_input, old_input: input, id })
    });
  }

  handleChange = (editor, data, value) => {
    if (this.state.inputType === 'split') {
      PubSub.publish('editor', { input: value });
    }
    if (data.origin === 'setValue' || typeof data.origin === 'undefined') {
      editor.focus();
      editor.execCommand('goDocEnd');
      this.setState({ noeditarea: editor.lastLine() });
    }
  };

  handleCursorActivity = (editor) => {
    if (editor.getCursor().line <= this.state.noeditarea) {
      editor.execCommand('goDocEnd');
    }
  };

  handleKey = (editor, name) => {
    if (name === 'Enter') {
      // console.log(editor,888, value);
      // const input = editor.getLine(editor.lastLine() - 1);
      const input = this.state.input.replace(this.state.old_input, "")
      console.log(input, 999);
      this.sendInput(input);
      // this.setState({ noeditarea: editor.lastLine() });
    }
  };

  handleSelect = (value) => {
    this.setState({ inputType: value });
    PubSub.publish('editor', { inputType: value });
  };

  sendInput = async (input) => {
    const { inputType, lang, need_input, id } = this.state;
    let terminate = false;
    if (inputType === 'Interactive' && need_input) {

      const result = await run(inputType, '', input, lang, id, terminate);
      console.log(result);
      const { error_code, run_data_backend } = result;
      const { id: resid, errors, Output, need_input } = run_data_backend;
      if (error_code === 200) {
        // editor.setValue(editor.getValue() + Output.replace(this.state.input,""));
        const new_input = this.state.input + Output.replace(this.state.old_input, "")
        this.setState({ need_input, input: new_input, prev_input: Output, old_input: new_input });
        if (!need_input) {
          PubSub.publish('showRes', { error_code, Output });
          PubSub.publish('editor', { isRuntime: false });
        }
      } else {
        PubSub.publish('editor', { isRuntime: false });
        if (error_code === 410 || error_code === 408) {
          PubSub.publish('showRes', { error_code, Output: '[' + errors + ']' });
        } else {
          PubSub.publish('showRes', {
            error_code,
            Output: '[something went wrong, please try again]',
          });
        }
      }
    }
  };

  render() {
    const { need_input, inputType, input } = this.state;
    // 交互模式选择
    const operations = (
      <>
        <Select
          className="selectMode"
          defaultValue="interactive"
          style={{ width: 180 }}
          onSelect={this.handleSelect}
          disabled={need_input}
        >
          <Option value="split">Split input/output</Option>
          <Option value="interactive">Interactive Terminal</Option>
        </Select>
      </>
    );

    // 编辑器样式
    const options = {
      readOnly: inputType === 'split' ? false : need_input ? false : 'nocursor',
      theme: 'darcula',
      cursorScrollMargin: 5,
      smartIndent: false,
      scrollbarStyle: 'simple',
      placeholder: 'input goes here',
      autofocus: input, //自动获取焦点
      lineNumbers: true, //显示行号
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], //end
    };

    // 交互模式
    const interactiveInput = (
      <CodeMirror
        className="input"
        value={input}
        options={options}
        onBeforeChange={(editor, data, value) => {
          this.setState({ input: value });
        }}
        onCursorActivity={(editor) => {
          this.handleCursorActivity(editor);
        }}
        onChange={(editor, data, value) => {
          this.handleChange(editor, data, value);
        }}
        onFocus={(editor) => {
          editor.scrollIntoView();
        }}
        onKeyHandled={(editor, name) => {
          this.handleKey(editor, name);
        }}
      />
    );

    // 分开模式
    const splitInput = (
      <CodeMirror
        className="input"
        value={input}
        options={options}
        onBeforeChange={(editor, data, value) => {
          this.setState({ input: value });
        }}
        onChange={(editor, data, value) => {
          this.handleChange(editor, data, value);
        }}
      />
    );

    return (
      <ProCard title="Input / Output / Terminal" ghost extra={operations}>
        {this.state.inputType === 'split'
          ? splitInput
          : this.state.need_input || this.state.input
            ? interactiveInput
            : null}
      </ProCard>
    );
  }
}
