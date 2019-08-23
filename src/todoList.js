import React, { Component } from 'react';
import axios from 'axios'
import TodoListUi from './todoListUi'
import store from './store'
import { changeInputAction , addItemAction , deleteItemAction ,getListAction } from './store/actioncreators'



class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.storeChange = this.storeChange.bind(this) //转变this指向
        store.subscribe(this.storeChange)  //订阅Redux的状态
    }
    render() { 
        return ( 
            <TodoListUi     
                inputValue={this.state.inputValue}
                list={this.state.list}
                changeInputValue={this.changeInputValue}
                addItem={this.addItem}
                deleteItem={this.deleteItem}
            />
        );
    }
    componentDidMount(){
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
        .then((res)=>{
            const action = getListAction(res.data)
            store.dispatch(action)
        })
    }
    changeInputValue(e){
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
    addItem(){
        const action = addItemAction()
        store.dispatch(action)
    }
    deleteItem(index){
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    storeChange(){
        this.setState(store.getState())
    }
}
 
export default TodoList;