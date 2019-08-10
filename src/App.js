import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import './components/styleComponent.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <TodoList title="Hello World!"/>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// viết code theo ES6
// thành phần do người dùng định nghĩa sẽ được react chuyển các thuộc tính JSX cho thành phần này dưới dạng 1 đối tượng.
class App extends Component{
  constructor(){
    super();
    this.state = {
      listUser : JSON.parse(localStorage.getItem('TodoList'))
    };

    // React.createRef Tạo 1 'ref' có thể được gắn vào các phần tử React thông qua thuộc tính ref 
    this.inputRef = React.createRef();
    // khia bao cac funtion cua onclick.
    this.enterText = this.enterText.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  componentDidMount(){
    // chay ngay sau khi ham render duoc khoi tao trong React.DOM
    setTimeout(
        ()=>{
          this.inputRef.current.focus();// lấy focus của 1 element HTML form.
        }
        ,1000
      );
  }

  componentWillUnmount(){
    // chay ngay khi ham render duoc xoa khoi React.DOM
  }

  enterText = function(event){
    let text = event.target.value.trim();
    if(event.keyCode === 13 && text !== ''){
      this.setState((state,props)=>
       {
        return {listUser: [{title:text, isComplete:false}, ...state.listUser || '']};
       }
      )
      document.getElementById('add').value = '';
    }
    
    if(text === '' && event.keyCode === 13){
      document.getElementById('add').value = '';
      return;
    }
  }

  
  onClickItem = function(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { listUser } = this.state;
      const index = listUser.indexOf(item);
      this.setState({
        listUser: [
          ...listUser.slice(0,index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...listUser.slice(index + 1)
        ]
      })
    }
  }

  onClickRemove = function(item){
    return (event) => {
      const { listUser } = this.state;
      const index = listUser.indexOf(item);
      this.setState({
        listUser: [
          ...listUser.slice(0,index),
          ...listUser.slice(index + 1)
        ]
      })
    }
  }

  render(){
    console.log(this.state.listUser);
    localStorage.setItem('TodoList',JSON.stringify(this.state.listUser));
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
           <div className="todolist">
             <input id="add"
                    className="addCV" 
                    type="text" 
                    placeholder="What Need You Do?"
                    onKeyUp={this.enterText}
                    ref = {this.inputRef}>
              </input>
           {
            this.state.listUser !== null && this.state.listUser.map((item,index)=>{
             return <TodoList key={index} todo={item} onClickItem={this.onClickItem(item)} onClickRemove={this.onClickRemove(item)}/>
            })
          }
          {this.state.listUser === null && <h1>Nothing Here!</h1> }
           </div>
        </header>
      </div>
    );
  }
}

export default App;
