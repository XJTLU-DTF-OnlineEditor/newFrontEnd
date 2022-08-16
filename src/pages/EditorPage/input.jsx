import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/mode/shell/shell.js';
import React, { useState, useEffect, useRef } from 'react';
import { message, Select } from 'antd';
import ProCard from '@ant-design/pro-card';
import PubSub from 'pubsub-js';
import { setLocale, getLocale, FormattedMessage } from 'umi';

const { Option } = Select;

export default function Input() {
  const [id, setId] = useState('');
  const [input, setInput] = useState(''); // input区域的内容
  const [noeditarea, setNoeditarea] = useState(0);

  const ws = useRef(null);
  const editor = useRef(null);
  const inputValue = useRef('');
  const old_input = useRef(''); // 未输入前input区域的内容

  useEffect(() => {
    PubSub.subscribe('id', (msg, data) => {
      setId(data.id);
    });
  });

  useEffect(() => {
    if (id) {
      setInput('');
      PubSub.publish('showRes', { error_code: 0 });

      ws.current = new WebSocket(`ws://114.115.249.201:8001/V1/editor/${id}/`);
      // ws.current = new WebSocket(`ws://127.0.0.1:8000/V1/editor/${id}/`);

      ws.current.onopen = (e) => {
        PubSub.publish('ws', { ws: 1 });
      };

      ws.current.onerror = (e) => {
        ws.current = null;
        PubSub.publish('ws', { ws: null });
        PubSub.publish('id', { id: '' });
        message.error('Something wrong happens. Please try again later');
      };

      ws.current.onclose = (e) => {
        ws.current = null;
        PubSub.publish('ws', { ws: null });
        PubSub.publish('id', { id: '' });
      };

      ws.current.onmessage = (e) => {
        const res = JSON.parse(e.data);
        if (res.message == 'output') {
          const new_input = inputValue.current + res.data;
          inputValue.current = new_input;
          setInput(new_input);
          old_input.current = new_input;
        } else if (res.message == 'result') {
          PubSub.publish('showRes', { error_code: 200, output: res.data });
          PubSub.publish('editor', { id: '' });
          setId('');
        } else if (res.message == 'warning') {
          PubSub.publish('showRes', { error_code: 410, output: res.data });
          PubSub.publish('editor', { id: '' });
          setId('');
        } else if (res.message == 'error') {
          PubSub.publish('showRes', { error_code: 500, output: res.data });
          PubSub.publish('editor', { id: '' });
          setId('');
        } else if (res.message == 'pic') {
          PubSub.publish('showPic', { url: res.data });
        } else if (res.message == 'file') {
          PubSub.publish('newFile', { filename: res.filename, content: res.data });
        }
      };
    } else {
      ws.current?.close();
      PubSub.publish('ws', { ws: null });
      ws.current = null;
      inputValue.current = '';
      old_input.current = '';
      setNoeditarea(0);
    }
  }, [id]);

  const handleChange = (editor, data, value) => {
    if (data.origin === 'setValue' || typeof data.origin === 'undefined') {
      editor.focus();
      editor.execCommand('goDocEnd');
      setNoeditarea(editor.lastLine());
    }
  };

  const handleCursorActivity = (editor) => {
    if (editor.getCursor().line < noeditarea) {
      editor.execCommand('goDocEnd');
    }
  };

  const handleKey = (editor, name) => {
    if (name === 'Enter') {
      const new_input = inputValue.current.replace(old_input.current, '');
      old_input.current = inputValue.current;
      ws.current.send(new_input);
    }
  };

  // 交互模式选择
  const operations = (
    <>
      <Select className="selectMode" defaultValue="Interactive" style={{ width: 180 }}>
        {/* <Option value="Split">Split input/output</Option> */}
        <Option value="Interactive">
          {/*Interactive Terminal*/}
          {<FormattedMessage id="pages.editor.terminal" />}
        </Option>
      </Select>
    </>
  );

  const options = {
    mode: 'shell',
    readOnly: id ? false : 'nocursor',
    theme: 'darcula',
    cursorScrollMargin: 5,
    smartIndent: false,
    scrollbarStyle: 'simple',
    autofocus: input, //自动获取焦点
    lineNumbers: true, //显示行号
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], //end
  };

  return (
    <ProCard ghost title={operations}>
      <CodeMirror
        ref={editor}
        className="input"
        value={input}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setInput(value);
          inputValue.current = value;
        }}
        onCursorActivity={(editor) => {
          handleCursorActivity(editor);
        }}
        onChange={(editor, data, value) => {
          handleChange(editor, data, value);
        }}
        onFocus={(editor) => {
          editor.scrollIntoView();
        }}
        onKeyHandled={(editor, name) => {
          handleKey(editor, name);
        }}
      />
    </ProCard>
  );
}
