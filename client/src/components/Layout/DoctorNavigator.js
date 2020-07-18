import React from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const DoctorNavigator = () => {
  return (
    <Layout>
      <Sider>Hello</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DoctorNavigator;
