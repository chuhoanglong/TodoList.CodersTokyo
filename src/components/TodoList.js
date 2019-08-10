import React,{Component} from 'react';
import remove from './cancel-button.svg'
import './styleComponent.css';
var classNames = require('classnames');

// viết theo ES5
// function TodoList(props){
//   var classname = classNames({'demo':true,'usercomplete':props.user.isComplete});
//   var onClickItem = function(){
//     console.log('click');
//     }
//   return(
//     <div className={classname} onClick={onClickItem}>
//       <h1>Demo Component</h1>
//       <h2>Hello! {props.user.name} ,he is {props.user.age} years old </h2>
//     </div>
//   );
// }
// export default TodoList

//Viết theo ES6
export default class TodoList extends Component{
  constructor(props){
    super(props);
    // this.state = {todo: props.todo};
  }

  // onClickItem(){
  //   //Object.assign(target,source) copy obj this.state.user vào 1 obj mới để khi thay đổi giá trị ko làm ảnh hưởng tới đối tượng cũ.
  //   // const todoTemp = Object.assign({},this.state.todo);
  //   // thay đổi giá trị isComplete trên Obj todoTemp
  //   // todoTemp.isComplete = !todoTemp.isComplete;
  //   // this.setState({todo: todoTemp});


  //   //cách này sẽ làm thay đổi giá trị của obj ban đầu
  //   this.state.todo.isComplete = !this.state.todo.isComplete;
  //   this.setState({todo: this.state.todo});

  // }

  render(){
    var classname = classNames({'demo':true,'usercomplete':this.props.todo.isComplete});
    return(
      <div className={classname} >
        <p onClick={this.props.onClickItem}>{this.props.todo.title}</p>
        <img src={remove} 
              className="remove" 
              alt="remove" 
              width={32} 
              height={32}
              onClick={this.props.onClickRemove}></img>
      </div>
    );
  }
}
