import { Descriptions } from 'antd';
import React from 'react';

const Collected = () => {
  return(
    <div>
      <Descriptions column={3} title="收藏课程" bordered>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Collected;
