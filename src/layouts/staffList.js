import React,{ Component }  from 'react';
import Header from '../components/header'
import Footer from "../components/footer";
import {BootstrapTable, TableHeaderColumn,InsertButton} from 'react-bootstrap-table';
import axios from "axios/index";


const selectRowProp = {
    mode: 'checkbox',
    bgColor: '#E0FFFF'
};
function customConfirm(next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (window.confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`)) {
        next();
    }
}

const options = {
    insertText: '新增',
    deleteText: '删除',
    saveText: '保存',
    closeText: '关闭',
    handleConfirmDeleteRow: customConfirm
};
const cellEditProp = {
    mode: 'dbclick'
};
export class StaffList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

    }
    async componentDidMount(){
        axios.get('/staff')
            .then(res => {
                console.log(res.data);
                this.setState({products: res.data.result});
            });
    }

    render(){

        return(

            <div>
                <Header/>
                <div className="services">
                    <div className="container">
                        <div className="services-main">
                            <h3>职员列表</h3>
                            <div className="services-top">

                                <BootstrapTable hover deleteRow={ true } selectRow={ selectRowProp } options={ options }  insertRow={ true }  search cellEdit={ cellEditProp }
                                                data={ this.state.products }
                                                pagination>
                                    <TableHeaderColumn dataField='staffId' isKey={ true }>职员编号</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffName'>职员姓名</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffSex'>性别</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffEducation'>学历</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffPhoneNumber'>电话</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffBirthday'>生日</TableHeaderColumn>
                                    <TableHeaderColumn dataField='staffHiredate'>入职日期</TableHeaderColumn>
                                </BootstrapTable>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>

        );


    }

}
