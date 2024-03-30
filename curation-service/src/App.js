import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Card, Button, Input, notification } from 'antd';
import Review from './Review';
import getRating from './getRating'
import submitFile from './submitFile'
import getBalance from './getBalance'
import mint from './mint'

function App() {
  const [minerBalance, setMinerBalance] = React.useState(0)
  const [inputValue1, setInputValue1] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [userRating, setUserRating] = React.useState(0);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message) => {
    api.open({
      message: message,
      description: '',
      duration: 0,
    });
  };

  const mintFn = async() =>{
    const mi = await mint()
    const bal = await getBalance()
    setMinerBalance(bal)
  }

  const handleSubmit = async() => {
    console.log('Input 1:', inputValue1);
    console.log('Input 2:', inputValue2);
    const sub = await submitFile(inputValue1, inputValue2)
    openNotification('cid submitted')
  }

  const ratingCall = async() =>{
    const rat = await getRating()
    console.log(rat)
  }

  const minerBalanceCall = async() =>{
    const bal = await getBalance()
    console.log(bal)
  }

  return (
    <div className="App">
      <div className='container-review'>
        <Review />
      </div>
      <br/>
      <div style={{display:'flex'}}>
        <div className='container-miner'>
          <Card title="Miner" bordered={true} style={{ width: 300 }}>
            <span>
              mint tokens:&nbsp;
              <Button type='primary' onClick={()=>{mintFn()}}>Mint</Button>
            </span><br/><br/>
            <span onClick={()=>{minerBalanceCall()}}>Balance:&nbsp;{minerBalance}</span><br/><br/>
            <span>
              Send for review:<br/>
              <span>
                CID: <Input value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} />
              </span>
              <span>
                User: <Input value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />
              </span>
              <Button type='primary' onClick={handleSubmit}>Submit</Button>
            </span>
          </Card>
        </div>
        <br/>
        <div className='container-user' style={{paddingLeft:'20px'}}>
          <Card title="User Rating" bordered={true} style={{ width: 300 }}>
            <p><strong>Wallet:</strong>&nbsp;&nbsp;0x8cE69...45C0c3526</p>
            <p onClick={()=>{ratingCall()}}><strong>Rating:</strong>&nbsp;&nbsp;</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
