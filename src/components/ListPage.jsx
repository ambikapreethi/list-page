import React, { useCallback, useMemo, useState } from "react";
import "../styles/list.css";

function ListPage()
{

    const[items,setItems]=useState(["car","bike","van"]);
    const[searchValue,setSearchValue]=useState("");
    const[count,setCount]=useState(3);

    const addItems=useCallback((item)=>{
        console.log("items added");
            setItems((prevItems)=>[...prevItems,item]);
            setCount(count+1);
            
    },[items])

    const removeItems=useCallback((index)=>
    {
        console.log("items removed");
        setItems((prevItems)=>prevItems.filter(item=>items.indexOf(item) !==index));
    },[items])

    
    const filteredItems=useMemo(()=>
    {
        console.log("filter action is performed");
        return items.filter(item=>item.includes(searchValue));
    },[searchValue])

    const handleKeyDown=(e)=>
        {
         if(e.key==="Enter")
            {           
                
                    addItems(e.target.value);
                    e.target.value="";
            }
                
        }
    return(
        <div className="list_main">
                <h2 className="list_heading">List Page</h2>
            <div className="add">
               <p>Add new Product:  <input type="text" placeholder="Add new product"  onKeyDown={(e)=>handleKeyDown(e)}/></p><br/>
                <p className="count">Items Count:<span>{count}</span></p>
               
                    <h2 className="prod_heading1">Products:</h2>
                    <table className="add_table">    
                        <thead>
                            <tr><th>Name</th><th>button</th></tr>
                        </thead>    
                        <tbody>   
                            {items.map((product,index)=>(
                            <tr className="row_table" key={index}>
                                <td>{product}</td>
                                <td>
                                     <button onClick={() => removeItems(index)}>Remove</button>
                                </td>
                            </tr>
                            )
                            )}
                        </tbody>
               </table>
            </div>
            <div className="search">
            <p> Search Products: <input type="text" name="filter" value={searchValue} placeholder="search" onChange={(e)=>setSearchValue(e.target.value)}/></p><br/>
            <h2 className="prod_heading2">Products:</h2>
                    <table className="search_table">    
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>button</th>
                            </tr>
                        </thead>    
                        <tbody>   
                            {searchValue?(
                            filteredItems.map((product,index)=>(
                            <tr className="row_table" key={index}>
                                <td>{product}</td>
                                <td>
                                     <button onClick={() => removeItems(index)}>Remove</button>
                                </td>
                            </tr>
                            )
                            )):<tr><td></td></tr>}
                        </tbody>
               </table>
            </div>
        </div>
    )
}


export default ListPage;