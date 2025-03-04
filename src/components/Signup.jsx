import { useState } from "react";

const Signup = () => {

    const [data,setData] = useState({
        userName:'',
        password:"",
        birthday:"",
        ville:"",
        genre:"",
        file:""
    })
    function sub(e){

        e.preventDefault();
        console.log(userName);
        console.log(data);
        
           
    }
    
    return (
        <div>
        <form onSubmit={sub}>

            <br />
            <br />
            <input type="text" placeholder="userName"/>
            <br />
            <br />
            <input type="password" placeholder="password"/>
            <br />
            <br />
            <input type="date" id="birthday" name="birthday"/>
            <br />
            <br />
            <select name="ville">
                <option value="casa">casa</option>
                <option value="rabat">rabat</option>
            </select>
            <br />
            <br />
            <label>Genre</label>
            <input type="radio" name="genre" value="home" id="home"/>
            <label htmlFor="home">home</label>
            <input type="radio" name="genre" value="femme" id="femme"/>
            <label htmlFor="femme">femme</label>
            <br />
            <br />
            <label htmlFor="myfile">Select a file:</label>
            <input type="file" id="myfile" name="myfile"></input>
            <br />
            <br />
            <input type="submit" value="click"/>
            
        </form>

        {/* <h1>{data}</h1> */}

        </div>
    );
}
 
export default Signup;