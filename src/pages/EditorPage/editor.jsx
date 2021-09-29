import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
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
import 'codemirror/addon/edit/matchBrackets';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/python/python.js';
// 全屏显示
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/placeholder.js'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars.js'
import { FullscreenExitOutlined, FullscreenOutlined, SettingOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { Component } from 'react';
import { run } from '@/services/editor'
import PubSub from 'pubsub-js'
import ProCard from '@ant-design/pro-card';
import { nanoid } from 'nanoid'


export default class Editor extends Component {

    state = {
        isFullScreen: false,
        isCodeFull: false,
        source: '',
        isRuntime: false,
        loading: false,
        disable: false,
        input: '',
        inputType: 'interactive',
        lang: 'python',
    }
    rootRef = React.createRef();

    componentDidMount() {

        PubSub.subscribe('editor', (msg, data) => {
            this.setState(data)
        })

        window.onresize = () => {
            if (document.fullscreenElement) {
                this.setState({ isFullScreen: true })
            }
            else {
                this.setState({ isFullScreen: false })
            }
        }

    }


    // fullscreen button
    fullScreen = () => {
        if (!this.state.isFullScreen) {
            this.rootRef.current.requestFullscreen();
        }
    }

    exitFullScreen = () => {
        document.exitFullscreen();
    }


    // start & stop run
    handeleRun = () => {
        const { isRuntime } = this.state
        let terminate
        if (!isRuntime) {
            terminate = false
            this.setState({ isRuntime: true })
        } else {
            terminate = true
            this.setState({ isRuntime: false })
            PubSub.publish('input', { need_input: false })
            this.setState({ disable: true })
            setTimeout(() => { this.setState({ disable: false }) }, 1500)
        }
        this.runcode(terminate)
    }

    // run code
    runcode = async (terminate) => {
        this.setState({ loading: true })
        const { inputType, source, input, lang } = this.state
        const id = nanoid()
        const result = await run(inputType, source, input, lang, id, terminate)
        console.log(result);
        const { error_code, data } = result
        const { id: resid, errors, output, need_input } = data

        if (!terminate) {
            if (resid === id) {
                if (error_code === 200) {
                    if (need_input) {
                        PubSub.publish('input', { need_input, input: output })
                    } else {
                        this.setState({ isRuntime: false })
                        PubSub.publish('showRes', { error_code, output })
                    }
                } else {
                    this.setState({ isRuntime: false })
                    if (error_code === 410 || error_code === 408) {
                        PubSub.publish('showRes', { error_code, output: '[' + errors + ']' })
                    } else {
                        PubSub.publish('showRes', { error_code, output: '[something went wrong, please try again]' })
                    }
                }
            }
        }
        this.setState({ loading: false })
    }


    render() {
        // 功能按钮
        const { isRuntime, loading, disable, isFullScreen, source } = this.state
        const operations = <>
            <Button ghost type='primary' loading={loading} disabled={disable}
                onClick={this.handeleRun}
                icon={isRuntime ? <PauseOutlined /> : <CaretRightOutlined />}
            >
                {isRuntime ? 'Edit' : 'Run'}
            </Button>
            <Button icon={<SettingOutlined />} />
            {
                isFullScreen
                    ?
                    <Button icon={<FullscreenExitOutlined />} onClick={this.exitFullScreen} />
                    :
                    <Button icon={<FullscreenOutlined />} onClick={this.fullScreen} />

            }
        </>

        // 编辑器样式
        const options = {
            mode: 'python',
            theme: 'darcula',
            autofocus: true, // 自动获取焦点
            styleActiveLine: true,// 光标代码高亮
            lineNumbers: true, // 显示行号
            smartIndent: true,  // 自动缩进
            // start-设置支持代码折叠
            lineWrapping: true,
            foldGutter: true,
            placeholder: 'code goes here',
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],//end
            matchBrackets: true,  // 括号匹配，光标旁边的括号都高亮显示
            autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
            fullScreen: isFullScreen,   // 全屏显示
            scrollbarStyle: 'simple',
            cursorScrollMargin: 5,
            extraKeys: {
                "Ctrl": "autocomplete",
                "Ctrl-S": function (editor) {
                    editor.codeSave(editor)
                },
                "Ctrl-Z": function (editor) {
                    editor.undo();
                },
                "F8": function (editor) {
                    editor.redo();
                },
            },
        }

        return (
            <ProCard title="Source" ghost extra={operations} >
                <div ref={this.rootRef}>
                    <CodeMirror
                        className='editor'
                        value={source}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ source: value })
                        }}
                    />
                </div>
            </ProCard>

        )
    }

}
