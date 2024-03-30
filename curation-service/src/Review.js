import React from 'react';
import { Card, Input, Button } from 'antd';

function Review() {
  const [inputValue1, setInputValue1] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('');
  const [inputValue4, setInputValue4] = React.useState('');
  const [inputValue5, setInputValue5] = React.useState('');
  const [inputValue6, setInputValue6] = React.useState('');

  const handleSubmit1 = async() => {
    console.log('Input 1:', inputValue1);
    console.log('Input 2:', inputValue2);
    // const sub = await submitFile(inputValue1, inputValue2)
  }
  const handleSubmit2 = async() => {
    console.log('Input 1:', inputValue3);
    console.log('Input 2:', inputValue4);
    // const sub = await submitFile(inputValue3, inputValue4)
  }
  const handleSubmit3 = async() => {
    console.log('Input 1:', inputValue5);
    console.log('Input 2:', inputValue6);
    // const sub = await submitFile(inputValue5, inputValue6)
  }

  return (
    <div className="reviewers" style={{display:'flex'}}>
      <Card title="Reviewer1" bordered={true} style={{ width: 300 }}>
        <span>Balance:</span><br/>
        <span>Stake:</span><br/>
        <span>Unstake:</span><br/>
        <span>
          Rate:<br/>
          <span>
            CID: <Input value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} />
          </span>
          <span>
            User: <Input value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />
          </span>
          <Button type='primary' onClick={handleSubmit1}>Submit</Button>
        </span>
      </Card>

      <Card title="Reviewer2" bordered={true} style={{ width: 300 }}>
        <span>Balance:</span><br/>
        <span>Stake:</span><br/>
        <span>Unstake:</span><br/>
        <span>
          Rate:<br/>
          <span>
            CID: <Input value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} />
          </span>
          <span>
            User: <Input value={inputValue4} onChange={(e) => setInputValue4(e.target.value)} />
          </span>
          <Button type='primary' onClick={handleSubmit2}>Submit</Button>
        </span>
      </Card>

      <Card title="Reviewer3" bordered={true} style={{ width: 300 }}>
        <span>Balance:</span><br/>
        <span>Stake:</span><br/>
        <span>Unstake:</span><br/>
        <span>
          Rate:<br/>
          <span>
            CID: <Input value={inputValue5} onChange={(e) => setInputValue5(e.target.value)} />
          </span>
          <span>
            User: <Input value={inputValue6} onChange={(e) => setInputValue6(e.target.value)} />
          </span>
          <Button type='primary' onClick={handleSubmit3}>Submit</Button>
        </span>
      </Card>
    </div>
  );
}

export default Review;
