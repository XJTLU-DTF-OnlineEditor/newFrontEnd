import { Collapse, Space, Alert, Button, Modal, Input, Image, Drawer, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { deletePic } from '@/services/editor';
import './result.less';
import { setLocale, getLocale, FormattedMessage } from 'umi';
import moment from 'moment';
import { addCourseProgress, changeCourseProgress } from '@/services/course/api';
import InputComponent from './input.jsx';

const { TextArea } = Input;
const { Panel } = Collapse;

export default function ResultSection(props) {
  const [id, setId] = useState('');
  const [result, setResult] = useState('');
  const [res_status, setRes_status] = useState('info');
  const [visible, setVisible] = useState(false);
  const [pics, setPics] = useState([]);
  const [pic_visible, setPic_visible] = useState(false);
  const [openPanel, setOpenPanel] = useState(['2']);

  useEffect(() => {
    console.log(props, 8888);
    PubSub.subscribe('showRes', (msg, data) => {
      let res = data.output;
      if (data.error_code == 200) {
        setRes_status('success');
        handleCourseProgress();
      } else if (data.error_code == 410 || data.error_code == 408) {
        setRes_status('warning');
      } else if (data.error_code == 500) {
        setRes_status('error');
      } else {
        setRes_status('info');
      }
      setResult(res);
    });

    PubSub.subscribe('showPic', (msg, data) => {
      let pic = { url: data.url, key: pics.length };
      setPics([...pics, pic]);
      setPic_visible(true);
    });

    PubSub.subscribe('id', (msg, data) => {
      if (data.id != id) {
        setId(data.id);
      }
    });
  });

  useEffect(() => {
    if (id && pics.length > 0) {
      handlePicCancel(pics);
    }
  }, [id]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePicCancel = async (pics) => {
    console.log(pics);
    setPic_visible(false);
    await deletePic(pics[0].url.substring(0, pics[0].url.lastIndexOf('\\')));
    setPics([]);
  };

  const handleCourseProgress = async () => {
    let { id, related_topic } = props;
    const msg = await addCourseProgress({
      topic: related_topic,
      course_id: id,
      last_practice_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    console.log(msg, 4444);
  };

  return (
    <>
      <Collapse bordered={false} ghost className="reshint" defaultActiveKey={['2']}>
        <Divider />
        <InputComponent />
        <Panel header=/*"Show hints"*/ {<FormattedMessage id="pages.editor.showHints" />} key="1">
          <div>{props.hint}</div>
        </Panel>
        <Panel
          header=/*"Result"*/ {<FormattedMessage id="pages.editor.result" />}
          key="2"
          className={res_status}
          extra={
            <Space>
              <Button size="small" type="ghost" onClick={showModal}>
                {/*Detail*/} <FormattedMessage id="pages.editor.detail" />
              </Button>
              <Modal
                visible={visible}
                title={res_status}
                onCancel={handleCancel}
                width={800}
                footer=""
              >
                <TextArea
                  value={
                    res_status == 'info'
                      ? getLocale() == 'zh-CN'
                        ? '--- 结果将会显示在这里 ---'
                        : '--- Results will be shown here ---'
                      : result
                      ? result
                      : ''
                  }
                  autoSize
                  bordered={false}
                  status={res_status}
                />
              </Modal>
            </Space>
          }
        >
          <Alert
            message={res_status}
            description={
              res_status == 'info' ? (
                getLocale() == 'zh-CN' ? (
                  '--- 结果将会显示在这里 ---'
                ) : (
                  '--- Results will be shown here ---'
                )
              ) : result ? (
                <TextArea value={result} autoSize bordered={false} status="error" />
              ) : (
                ''
              )
            }
            type={res_status}
            showIcon
          />
        </Panel>
      </Collapse>
      {/* 启用会有文档下方空白问题 */}
      {/* <div className="site-drawer-render-in-current-wrapper">
        <Drawer
          placement="right"
          onClose={() => handlePicCancel(pics)}
          onCancel={() => handlePicCancel(pics)}
          display={pic_visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {pics.map((value, index, array) => (
              <Image src={`/server/${pics.length > 0 ? value.url : ''}`} width='290px' />
            ))}
          </Space>
        </Drawer>
      </div> */}
    </>
  );
}
