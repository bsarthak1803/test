import './App.css';
import { useEffect, useState } from "react";
import { Row, Col} from 'reactstrap';
import axios from 'axios';

function App() {
  const [ group, setGroup] = useState([]);
  const [ loading , setLoading] = useState(false);
  const [ users , setUsers] = useState([]);
  const [ grpname, setName] = useState('');
  const [ grpdesc, setDesc] = useState('');
  const [ checked, setChecked] = useState({});
  const [logourl, setLogo] = useState('/download.jpg');


  const toggleUsers = ( id, val ) => {
    //the border style will be changed on selection of the card
    document.getElementById(id).style.borderRadius = "25px";
    document.getElementById(id).style.borderColor = "black";
    var checked_arr = checked;
    checked_arr[id] = !checked_arr[id];
    setChecked(checked_arr);
  }

  //to add selected user to the group
  const updateGroup = (e) => {
    var group_arr = group;
    users.map( (user) => {
      if (checked[user.id] === true){
        document.getElementById(user.id).style.borderRadius = "0px";
        document.getElementById(user.id).style.borderColor = "white";
        group_arr.push(user);
      }
    })
    //alert the current group user names
    alert("Group has following users -" + group_arr.map ( (user) => {
      return user.name;
    }))

    setGroup(group_arr);
    var checked_arr = {};
    users.map( (user) => {
    return checked_arr[user.id] = false;
   })
  setChecked(checked_arr);
  }

  //to remove the selected user from the group
  const removeUser = (e) => {
    if (window.confirm("Remove User from the Group?")){
    var group_arr = group;
    group_arr = group_arr.filter ( (user) => { return !checked[user.id]});
    //alert the current group user names
    alert("Group has following users -" + group_arr.map ( (user) => {
      return user.name;
    }));
    //update group
    setGroup(group_arr);
  }
  //reset checked array
  var checked_arr = {};
    users.map( (user) => {
    return checked_arr[user.id] = false;
   })
  setChecked(checked_arr);

  users.map( (user) => {
    if (checked[user.id] === true){
      document.getElementById(user.id).style.borderRadius = "0px";
      document.getElementById(user.id).style.borderColor = "white";
    }
  })
}

  //to update name of the group
  const updateName = (e) => {
    setName(e.target.value);
  }

  //to update description of the group
  const updateDesc = (e) => {
    setDesc(e.target.value);
  }

  //to update group logo
  const updateLogo = (e) => {
    setLogo(e.target.value);
  }

  //get the data on initial mount
  useEffect( () => {
      const getContent = async () => {
          setLoading(true);
          const res =await axios.get('/he-public-data/users49b8675.json');
          var sorted_users = [];
          sorted_users = res.data;
          //sorting users on basis of name
          sorted_users = sorted_users.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          });
          setUsers(sorted_users);
          setLoading(false);
      }
  getContent();
  var checked_arr = {};
  users.map( (user) => {
    return checked_arr[user.id] = false;
  })
  setChecked(checked_arr);
  }, [])


  return (
    <div className="App">
      <Row>
        <Col style={{ marginTop : "2%"}}>
        </Col>
      </Row>
      <Row>
        <Col>
        <img src = {logourl} style={{marginTop:"8%", height:"150px", width:"150px", marginLeft:"15%"}} class="img-fluid img-thumbnail" alt="/download.jpg"/>
        <div class="input-group" style={{width:"200px", marginLeft:"39%", marginTop:"-10px"}}>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={ (e) => updateLogo(e)}/>
          <label class="custom-file-label" for="inputGroupFile01"><p style={{marginRight:"40%", fontWeight:"bold"}}>Group Icon</p></label>
        </div>
        </div>
        </Col>
        <Col style={{marginLeft : "15%", marginTop:"5%"}}>
        <div class="input-group mb-3" style={{width : "200px"}}>
            <input type="text" value = {grpname} class="form-control" placeholder="group name" aria-label="Group Name" onChange = { (e) => updateName(e)} />
        </div>
        <div class="input-group mb-3" style={{width : "200px", marginTop:"5%"}}>
            <input type="text" value = {grpdesc} class="form-control" placeholder="group description" aria-label="Group Description" onChange = { (e) => updateDesc(e)}/>
        </div>
        </Col>
        </Row>
        <Row style={{marginTop:"5%", marginLeft:"2%"}}>
          {
          users.map( (user) =>{
            return <Col md="3">
            <div key = {user.id} class="card" id={user.id} style={{width:"250px", marginTop:"3%"}} onClick = { (e) => toggleUsers( user.id, user.name ) }>
                <div className="card-body" style={{height:"125px"}}>
                <img style={{height:"85px", width:"100px"}} src = {user.Image} class="img-fluid img-thumbnail" alt="/download.jpg"/>
                </div>
                <div className="card-footer" style={{color:"black", height:"50px", fontSize:"12px"}}>
                <p style={{fontWeight:"bold"}}>{user.name}</p>
                </div>
            </div>
            </Col>
          })}
        </Row>
        <Row>
        <div style={{marginLeft:"43%", marginTop:"3%"}}>
        <button type="button" class="btn btn-primary" style={{marginBottom:"5%"}} onClick = {(e) => updateGroup(e)}>Add</button>
        <button type="button" class="btn btn-danger" style={{marginLeft:"70px", marginBottom:"5%"}} onClick = {(e) => removeUser(e)}>Remove</button>
        </div>
        </Row>
    </div>
  );
}

export default App;
