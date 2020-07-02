import React from "react";
import { Layout, Button, Input } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./content.css";
const { Content } = Layout;
const { TextArea } = Input;
export default class MyContent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isShow: false,
            isShowAlter: false,
            isDel: false,
            value: '',
            id: undefined
        };
        console.log(this.state.list);
    }
    componentWillMount() {
        this.setState(() => ({
            list: JSON.parse(localStorage.getItem('list')) || []
        }))
    }
    List() {
        if (!this.state.list.length) {
            return <li className="item">暂无数据</li>
        } else {
            const listItems = this.state.list.map((item) => {
                return (
                    <li key={item.id}>
                        <div className="item">
                            <span>{item.info}</span>
                            <div className="alter">
                                <Button onClick={this.alter.bind(this, item.id)}>编辑</Button>
                                <Button onClick={this.del.bind(this, item.id)}>删除</Button>
                            </div>
                        </div>
                    </li>
                )
            }
            );
            return listItems;
        }
    }
    alter(id) {
        const buf = this.state.list;
        this.setState({
            value: buf[id - 1],
            id: id
        },()=>{
            this.setState({
                isShowAlter: true
            })
        })
        
    }
    okAlter() {
        const buf = this.state.list;
        const id = this.state.id;
        buf[id - 1] = { info: this.state.value, id: id };
        this.setState({
            list: buf
        })
        localStorage.setItem('list', JSON.stringify(this.state.list));
        this.setState({
            isShowAlter: false,
            value: '',
            id: undefined
        });
    }
    outAlter() {
        this.setState({
            isShowAlter: false,
            value: '',
            id: undefined
        });
    }
    del(id) {
        this.setState({
            isDel: true,
            id: id
        })
    }
    okDel() {
        const buf = this.state.list;
        buf.splice(this.state.id-1,1);
        for(let i = 0;i<buf.length;i++){
            buf[i].id = i+1;
        }
        this.setState({
            list:buf,
            isDel:false
        })
        localStorage.setItem('list', JSON.stringify(this.state.list));
    }
    outDel() {
        this.setState({
            isDel: false,
            id: undefined
        })
    }
    add() {
        this.setState({
            isShow: true
        });
    }
    okAdd() {
        this.state.list.push({ info: this.state.value, id: this.state.list.length + 1 });
        localStorage.setItem('list', JSON.stringify(this.state.list));
        this.setState({
            isShow: false,
            value: ''
        });
    }
    outAdd() {
        this.setState({
            isShow: false
        });
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <Content className="contentBox">
                <div className="tableBox">
                    <ul>
                        <div className="infoTitle item">
                            <span>信息</span>
                            <Button className="add" onClick={this.add.bind(this)}>添加</Button>
                        </div>
                        {this.List()}
                    </ul>
                </div>
                {this.state.isShow ? (<div className="Mark" ></div>) : null}
                {this.state.isShowAlter ? (<div className="Mark" ></div>) : null}
                {this.state.isDel ? (<div className="Mark" ></div>) : null}
                <div hidden={!this.state.isShow} className="addInfo">
                    <div className="outIconBox">
                        <CloseCircleOutlined className="outIcon" onClick={this.outAdd.bind(this)} />
                    </div>
                    <TextArea rows={4} className="addText" placeholder='请输入新信息' value={this.state.value} onChange={(e) => this.onChange(e)} />
                    <Button onClick={this.okAdd.bind(this)}>确认</Button>
                </div>
                <div hidden={!this.state.isShowAlter} className="alterInfo">
                    <div className="outIconBox">
                        <CloseCircleOutlined className="outIcon" onClick={this.outAlter.bind(this)} />
                    </div>
                    <TextArea rows={4} className="alterText" onChange={(e) => this.onChange(e)} />
                    <Button onClick={this.okAlter.bind(this)}>确认</Button>
                </div>
                {this.state.isDel ? (
                    <div className="delBox">
                        <div className="outIconBox">
                            <CloseCircleOutlined className="outIcon" onClick={this.outDel.bind(this)} />
                        </div>
                        <p>是否删除？</p>
                        <Button onClick={this.okDel.bind(this)}>确认</Button>
                    </div>
                ) : null}
            </Content>
        );
    }
}