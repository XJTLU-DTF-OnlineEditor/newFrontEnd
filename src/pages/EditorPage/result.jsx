import { Collapse, Space, Alert, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { Input, Image } from 'antd';
import { deletePic } from '@/services/editor';

const { TextArea } = Input;
const { Panel } = Collapse;

export default function ResultSection() {
  const hint = '';
  const [result, setResult] = useState('');
  const [res_status, setRes_status] = useState('info');
  const [visible, setVisible] = useState(false);
  const [pics, setPics] = useState([]);
  const [pic_visible, setPic_visible] = useState(false);

  useEffect(() => {
    PubSub.subscribe('showRes', (msg, data) => {
      let res = data.output
      if (data.error_code == 200) {
        setRes_status('success');
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
      let pic = { url: data.url, key: pics.length }
      setPics([...pics, pic])
      setPic_visible(true)
    });
  });

  const showModal = () => {
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const handlePicCancel = async () => {
    setPic_visible(false)
    await deletePic(pics[0].url)
    let initial_pics = pics
    initial_pics.shift()
    setPics([...initial_pics])
    if (pics.length !== 0) setPic_visible(true)
  };

  return (
    <Collapse bordered={false} ghost className="reshint" defaultActiveKey={['2']}>
      <Panel header="Show hints" key="1">
        <div>{hint}</div>
      </Panel>
      <Panel header="Result" key="2" className={res_status} extra={<Space>
        <Button size="small" type="ghost" onClick={showModal}>
          Detail
        </Button>
        <Modal
          visible={visible}
          title={res_status}
          onCancel={handleCancel}
          width={800}
          footer=''
        >
          <TextArea value={result ? result : 'Results will be shown here'} autoSize bordered={false} status="error" />
        </Modal>
      </Space>}>
        <Alert
          message={res_status}
          description={result ? <TextArea value={result} autoSize bordered={false} status="error" /> : 'Results will be shown here'}
          type={res_status}
          showIcon
        />
        <Modal
          visible={pic_visible}
          onCancel={handlePicCancel}
          footer={[
            <Button key="close" onClick={handlePicCancel}>
              Close
            </Button>
          ]}
        >
          <Image src={`/server/${pics.length > 0 ? pics[0].url : ''}`} />
        </Modal>
      </Panel>
    </Collapse>
  );
}
