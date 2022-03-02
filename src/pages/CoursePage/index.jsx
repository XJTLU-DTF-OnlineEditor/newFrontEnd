import React, {Component} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Footer} from "antd/es/layout/layout";
import ProCard from "@ant-design/pro-card";
import {Card, Select, Switch} from "antd";
import {getTopic, search} from "@/services/course/api";

let timeout;
let currentValue;
const {Meta} = Card;

function fetcha(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const topic_data = await search(value);
    if (currentValue === value) {
      let topic_list = topic_data.topic_list;
      let data = [];
      if (topic_list === null) {
        data = [];
      } else {
        topic_list.forEach((r) => {
          data.push({
            value: r.topic_title,
            text: r.topic_title,
          });
        });
      }
      callback(data);
    }
  }

  timeout = setTimeout(fake, 300);
}

export default class CoursePage extends Component {
  state = {
    data: [], // data of search
    value: undefined,
    hot_topic_list: [],
  }

  componentDidMount() {
    // Get all topic data
    this.getData();
  }

  getData = async () => {
    const hot_topic_list = await getTopic();
    // console.log(topics)
    this.setState({ hot_topic_list, loading: false });
    console.log(this.state)

  }


  handleSearch = (value) => {
    console.log(value); // value: Input text
    if (value) {
      fetcha(value, (data) => this.setState({data}));
    } else {
      this.setState({data: []});
    }
  };

  handleChange = (value) => {
    console.log(value); // value: place holder text
    this.setState({value});
  };

  render() {
    let { hot_topic_list } = this.state;

    console.log(hot_topic_list)

    return (
      <PageContainer header={{
        title: '所有课程',
        breadcrumb: {},
      }} content={
        <Select
          showSearch
          showArrow={false}
          value={this.state.value}
          style={{width: 150}}
          placeholder="input search text"
          defaultActiveFirstOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          filterOption={false}
          notFoundContent="No such course"
        />
      }>
        <ProCard style={{ marginTop: 8 }} gutter={[8, 16]} wrap title="最热">
          {hot_topic_list.map((item, index) => {
            return (
                <ProCard colSpan="33%" layout="default" bordered hoverable>
                  <Card
                    bordered={false}
                    style={{width: 240}}
                    cover={<img alt={item.topic_title} src={item.topic_img}/>}
                  >
                    <Meta title={item.topic_title} description={item.topic_content}/>
                  </Card>
                </ProCard>
            )
          })}
        </ProCard>

        <ProCard>
          <h3>
            最新
          </h3>
          <Card
            hoverable
            style={{width: 240}}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
          >
            <Meta title="Europe Street beat" description="www.instagram.com"/>
          </Card>
        </ProCard>
        <Footer style={{textAlign: 'center'}}>XJTLU ©2022 Online Editor</Footer>
      </PageContainer>
    )

  }

}
