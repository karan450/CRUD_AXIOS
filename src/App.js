import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

function App() { 
  const [apidata, setapidata] = useState([]);
  const [id, setid] = useState();
  const [username, setusername] = useState('');
  const [pass, setpass] = useState('');
  const [desc, setdesc] = useState('');
  const [editmode, seteditmode] = useState(false);

  
  async function fetchData(){
    const res = await axios.get("https://6822cc8ab342dce8004f66ba.mockapi.io/users")
    setapidata(res.data);
  }

  function formReset(){
    setusername('');
    setpass('');
    setdesc('');
  }

  useEffect(()=>{
    fetchData();
  },[])

  async function addData(e){
    e.preventDefault();
    await axios.post(`https://6822cc8ab342dce8004f66ba.mockapi.io/users/`,{
      "username":username,
      "password":pass,
      "description": desc
    })
    fetchData();
    formReset();
  }
  

  async function deleteData(id){
    await axios.delete(`https://6822cc8ab342dce8004f66ba.mockapi.io/users/${id}`)
    fetchData();
  }

  async function editData(e){
    e.preventDefault();
    await axios.put(`https://6822cc8ab342dce8004f66ba.mockapi.io/users/${id}`,{
      "username":username,
      "password":pass,
      "description": desc
    })
    seteditmode(false)
    formReset();
    fetchData();
  }

  return (
    <div className="App">
      <form>
        <div>
        <label>Enter Username : </label>
        <input type='text' value={username} onChange={(e)=>setusername(e.target.value)}/>
        </div>
         <div>
        <label>Enter Password : </label>
        <input type='text' value={pass} onChange={(e)=>setpass(e.target.value)}/>
        </div>
        <div>
        <label>Enter Description : </label>
        <input type='text' value={desc} onChange={(e)=>setdesc(e.target.value)}/>
        </div>
        <div>
        <button onClick={(e)=>{editmode ? editData(e) : addData(e) }}>
          {
            editmode ? "EditDATA" : "AddDATA"
          }
        </button>
        </div>
      </form>

      <table cellPadding={15} cellSpacing={5} borderbottom={1} bordercolor={'white'}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {apidata!=null ?
            apidata.map((item)=>{
              return <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.description}</td>
                <td><button onClick={()=>{
                  seteditmode(true)
                  setusername(item.username)
                  setpass(item.password)
                  setdesc(item.description)
                  setid(item.id)
                  }}>Edit</button></td>
                <td><button onClick={()=>{
                  deleteData(item.id)
                }}>Delete</button></td>
              </tr>
            }) 
          : null}
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
