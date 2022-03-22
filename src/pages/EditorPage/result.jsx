import { Collapse, Space, Alert, Button, Modal } from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ResultSection() {
  const { Panel } = Collapse;

  const hint = '';
  const [result, setResult] = useState('');
  const [res_status, setRes_status] = useState('info');
  const [icon, setIcon] = useState(<SmileOutlined style={{ fontSize: '30px' }} />);
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    PubSub.subscribe('showRes', (msg, data) => {
      let res = data.output
      if (data.error_code == 200) {
        setIcon(<CheckCircleOutlined style={{ fontSize: '50px', color: '#52c41a94' }} />);
        setRes_status('success');
        // setResultStyle()
      } else if (data.error_code == 410 || data.error_code == 408) {
        setIcon(<WarningOutlined style={{ fontSize: '50px', color: '#faad1494' }} />);
        setRes_status('warning');
      } else if (data.error_code == 500) {
        setIcon(<CloseCircleOutlined twoToneColor="#ff4d4f94" style={{ fontSize: '50px' }} />);
        setRes_status('error');
      } else {
        setIcon(<SmileOutlined style={{ fontSize: '30px' }} />);
        setRes_status('info');
      }
      setResult(res);
      if (res) setVisible(true)
      // PubSub.publish('resCollapsed', false);
    });
  });

  function showDetail() {
    const data = {
      title: res_status,
      content: result ? <TextArea value={result} autoSize bordered={false} status="error" /> : 'Results will be shown here',
    }
    if (res_status == "success") {
      Modal.success(data);
    } else if (res_status == "info") {
      Modal.info(data);
    } else if (res_status == "error") {
      Modal.error(data);
    } else if (res_status == "warning") {
      Modal.warning(data);
    }
  }

  const showModal = () => {
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  return (
    <Collapse bordered={false} ghost className="reshint" defaultActiveKey={['2']}>
      <Panel header="Show hints" key="1">
        <div>{hint}</div>
      </Panel>
      <Panel header="Result" key="2" className={res_status}>
        <Alert
          message={res_status}
          description={result ? <TextArea value={result} autoSize bordered={false} status="error" /> : 'Results will be shown here'}
          type={res_status}
          action={
            <Space>
              <Button size="small" type="ghost" onClick={showModal}>
                Detail
              </Button>
              <Modal
                visible={visible}
                title={res_status}
                onCancel={handleCancel}
                width={800}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Close
                  </Button>
                ]}
              >
                <TextArea value={result ? result : 'Results will be shown here'} autoSize bordered={false} status="error" />
              </Modal>

            </Space>
          }
          showIcon
        // banner
        />
      </Panel>
    </Collapse>
  );
}
