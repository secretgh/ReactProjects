import React, {useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { SwipeableButton } from "react-swipeable-button";
import FormSubmission from './components/FormSubmission.js';

function TODO({item, updateItem}){
  const swipeableButtonRef = useRef(null); // Create a ref for the component

  if(swipeableButtonRef && true){
    swipeableButtonRef.current?.buttonComplete();
  }

  return(
    <tr>
      <td style={{margin:"auto", width:"500px", textAlign:"center", color:"black"}}>
        <label style={{marginBottom:"5px"}}>
          {item.description}
        </label>
        <br />
        <div style={{margin:"auto", width:"300px"}}>
          <SwipeableButton 
            onSuccess={()=>{
              console.log(`Unlocked`);
            }}
            text='Not Done'
            noAnimate="true"
            text_unlocked='Done'
            sliderColor='#008000'
            circle
            ref={swipeableButtonRef}
          />
        </div>
      </td>
    </tr>
  );
}

function TodoTable({items, updateItem}){

  return (
    <Table bordered hover variant='success'>
      <tbody>
        {items.map(item =>{
          return(<TODO key={item.id} item={item} updateItem={updateItem}/>)
        })}
      </tbody>
    </Table>
  );
}

function TodoApp(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        setTimeout(async () =>{
          const response = await fetch("http://localhost:5250/todos");
          const result = await response.json();
          setData(result);
          setLoading(false)
        }, 1000);
      }
      catch(e){
        console.error(e);
      }
    }

    fetchData();
  }, []);


  return (<>
    <div style={{margin:"auto",width:"700px"}}>
      <h1 style={{margin:"auto", width:"500px", textAlign:"center", marginBottom:"15px"}}
      >
        API Test Example
      </h1>
      {loading ? (
        <div style={{margin:"auto", width:"200px", textAlign:"center"}}>
          <p>Loading...</p>
        </div>
      ) : 
      (
        <div style={{margin: "auto", width:"500px", height: "auto"}}>
          {data.map((d, key) => {
            return(
            <div key={key}>
              <FormSubmission data={d} newID={data.length}></FormSubmission>
            </div>
            );
          })
          }
          <FormSubmission newID={data.length}/>
        </div>
      )}
    
    </div>
  </>);
}

export default TodoApp;