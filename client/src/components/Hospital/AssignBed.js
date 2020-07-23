import React, {useState, useEffect} from "react";
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const AssignBed = () => {
	const { Search } = Input;
	const suffix = (
		<AudioOutlined
		  style={{
			fontSize: 16,
			color: '#1890ff',
		  }}
		/>
	  );
	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <a>{text}</a>,
		},
		{
		  title: 'Severity',
		  dataIndex: 'severity',
		  key: 'severity',
		},
		{
		  title: 'Gender',
		  dataIndex: 'gender',
		  key: 'gender',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Query',
			key: 'Query',
			// render: ()=>{
			// 	<Search
			// 		placeholder="input search text"
			// 		onSearch={value => console.log(value)}
			// 		style={{ width: 200 }}
			//     />
			// }
		},
		
	
	  ];
	  
	  const data = [];
	  
	for (let i = 0; i < 100; i++) 
	{
		data.push(
				{
					key: i,
					name: `Edward King ${i}`,
					severity: 'L2',
					gender: `Male`,
					age: '43 Years',

				}
			);
	}

	return <div>
		<h1>Assign Beds</h1>

		<Table
		size="middle"
		title={()=> "list of patients to assign beds"}
		columns={columns} dataSource={data}
		pagination={{ position: ["none", "bottomCenter"] }}
		/>
	</div>
	
	
};

export default AssignBed;
