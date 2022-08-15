import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import './github.css';
import './index.less';
import { Anchor } from 'antd';
import { getHelper } from '@/services/helper';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

const { Link } = Anchor;

const Marked = () => {
  const [md, setMD] = useState('loading...');

  useEffect(() => {
    fetchHelper();
  }, []);

  const fetchHelper = async () => {
    const helper = await getHelper();
    setMD(helper);
  };

  useEffect(() => {
    if (md) {
      let rendererMD = new marked.Renderer();

      let anchor = 0;

      rendererMD.heading = function (text, level, raw) {
        if (anchor >= 20) {
          anchor = 0;
        }
        anchor += 1;

        console.log(`<h${level} id="toc-nav${anchor}">${text}</h${level}>`);
        return `<h${level} id="toc-nav${anchor}">${text}</h${level}>`;
      };

      // 配置highlight
      hljs.configure({
        tabReplace: '',
        classPrefix: 'hljs-',
        languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'Properties', 'Markdown'],
      });
      // 配置marked
      marked.setOptions({
        renderer: rendererMD,
        // highlight: code => hljs.highlightAuto(code).value,
        highlight: function (code, lang) {
          const hljs = require('highlight.js');
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        gfm: true, //默认为true。 允许 Git Hub标准的markdown.
        tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
        smartLists: true,
        pedantic: false,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
      });
    }
  }, [md]);

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: <h1>使用教程</h1>,
          ghost: true,
        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProCard>
          <ProCard colSpan={5} ghost>
            <Anchor>
              <Link href="#toc-nav1" title="开始使用" />
              <Link href="#toc-nav2" title="使用指南">
                <Link href="#toc-nav3" title="用户认证" />
                <Link href="#toc-nav4" title="欢迎页" />
                <Link href="#toc-nav5" title="个人中心">
                  <Link href="#toc-nav6" title="1、点击左侧目录栏中的个人中心" />
                  <Link href="#toc-nav7" title="2、选择感兴趣的标签" />
                  <Link href="#toc-nav8" title="3、查看学习进度" />
                  <Link href="#toc-nav9" title="4、查看收藏夹" />
                  <Link href="#toc-nav10" title="5、设置目标" />
                  <Link href="#toc-nav11" title="6、课程推荐" />
                </Link>
                <Link href="#toc-nav12" title="课程管理后台">
                  <Link href="#toc-nav13" title="1、点击左侧目录栏中的课程管理后台" />
                  <Link href="#toc-nav14" title="2、查看课程系列" />
                  <Link href="#toc-nav15" title="3、查看课程" />
                </Link>
                <Link href="#toc-nav16" title="在线编程学习">
                  <Link href="#toc-nav17" title="1、点击左侧目录栏中的所有课程" />
                  <Link href="#toc-nav18" title="2、查看所有课程系列" />
                  <Link href="#toc-nav19" title="3、查看具体课程" />
                  <Link href="#toc-nav20" title="4、课程学习 代码运行" />
                </Link>
              </Link>
            </Anchor>
          </ProCard>
          <ProCard ghost colSpan={18}>
            <div className="article" dangerouslySetInnerHTML={{ __html: marked.parse(md) }} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  );
};

export default Marked;
